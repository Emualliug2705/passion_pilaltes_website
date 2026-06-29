from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Optional
import uuid
from datetime import datetime
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url: str = os.environ['MONGO_URL']
client: AsyncIOMotorClient = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration (free tier: 3000 emails/month)
RESEND_API_KEY: Optional[str] = os.environ.get('RESEND_API_KEY')
CONTACT_TO_EMAIL: str = os.environ.get('CONTACT_TO_EMAIL', 'passionpilates44@gmail.com')
CONTACT_FROM_EMAIL: str = os.environ.get(
    'CONTACT_FROM_EMAIL', 'Passion Pilates <onboarding@resend.dev>'
)
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Create the main app without a prefix
app: FastAPI = FastAPI()

# Create a router with the /api prefix
api_router: APIRouter = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = None
    studio: Optional[str] = None
    courseType: Optional[str] = None
    requestType: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1, max_length=5000)


class ContactResponse(BaseModel):
    ok: bool
    id: Optional[str] = None
    error: Optional[str] = None


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@api_router.get("/")
async def root() -> Dict[str, str]:
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate) -> StatusCheck:
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks() -> List[StatusCheck]:
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


def _build_email_subject(payload: ContactRequest) -> str:
    label_map = {
        "decouverte": "Cours découverte",
        "inscription": "Inscription",
        "info": "Information"
    }
    label = label_map.get(payload.requestType, "Demande")
    studio_part = f" - Studio {payload.studio}" if payload.studio else ""
    # Include sender email in subject so it's visible even in mail previews
    return f"[Passion Pilates] {label}{studio_part} — {payload.name} <{payload.email}>"


def _build_from_address(payload: ContactRequest) -> str:
    """Build a display-name From that shows the visitor in the inbox list.

    Resend forces the email part to belong to a verified domain (default
    onboarding@resend.dev), but we can freely customise the display name.
    Result example: 'Sophie Dubois (sophie@x.fr) via Passion Pilates <onboarding@resend.dev>'
    """
    # Strip characters that would break the RFC 5322 display-name syntax
    safe_name = re.sub(r'[<>"\\]', "", payload.name or "").strip() or "Visiteur"
    safe_email = re.sub(r'[<>"\\\s]', "", payload.email or "").strip()
    # Extract the email part from CONTACT_FROM_EMAIL (between < and >) — fallback to whole string
    from_match = re.search(r"<([^>]+)>", CONTACT_FROM_EMAIL)
    from_email_only = from_match.group(1) if from_match else CONTACT_FROM_EMAIL
    label = f"{safe_name} ({safe_email}) via Passion Pilates" if safe_email else f"{safe_name} via Passion Pilates"
    return f"{label} <{from_email_only}>"


def _build_email_html(payload: ContactRequest) -> str:
    safe_message = (payload.message or "").replace("<", "&lt;").replace(">", "&gt;").replace("\n", "<br>")
    rows = [
        ("Type de demande", payload.requestType),
        ("Nom", payload.name),
        ("Email", payload.email),
        ("Téléphone", payload.phone or "—"),
        ("Studio", payload.studio or "—"),
        ("Type de cours", payload.courseType or "—"),
    ]
    rows_html = "".join(
        f"<tr><td style='padding:8px 12px;background:#f2ebdf;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#7a6a4e;width:160px'>{k}</td>"
        f"<td style='padding:8px 12px;color:#2c2520;font-size:14px'>{v}</td></tr>"
        for k, v in rows
    )
    return f"""
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#faf7f2;padding:24px;color:#2c2520">
      <div style="max-width:640px;margin:0 auto;background:white;border:1px solid #e8e0d0">
        <div style="background:#2c2520;color:#faf7f2;padding:24px 28px">
          <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#a89878">Nouveau message</p>
          <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:24px;font-weight:400">Passion Pilates</h1>
        </div>
        <table style="width:100%;border-collapse:collapse">{rows_html}</table>
        <div style="padding:20px 28px;border-top:1px solid #e8e0d0">
          <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:#7a6a4e">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:#2c2520">{safe_message}</p>
        </div>
        <div style="padding:16px 28px;background:#faf7f2;font-size:11px;color:#8a7a5e">
          Envoyé depuis passionpilates.info — Répondez directement à cet e-mail pour recontacter {payload.name}.
        </div>
      </div>
    </div>
    """


def _build_confirmation_html(payload: ContactRequest) -> str:
    safe_message = (payload.message or "").replace("<", "&lt;").replace(">", "&gt;").replace("\n", "<br>")
    return f"""
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#faf7f2;padding:24px;color:#2c2520">
      <div style="max-width:640px;margin:0 auto;background:white;border:1px solid #e8e0d0">
        <div style="background:#2c2520;color:#faf7f2;padding:28px">
          <p style="margin:0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#a89878">Accusé de réception</p>
          <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:26px;font-weight:400">Passion Pilates</h1>
        </div>
        <div style="padding:28px">
          <p style="font-size:15px;line-height:1.7;margin:0 0 16px">Bonjour {payload.name},</p>
          <p style="font-size:15px;line-height:1.7;margin:0 0 16px">
            Merci d'avoir contacté Passion Pilates. Nous avons bien reçu votre message ci-dessous et vous recontacterons personnellement sous 48h.
          </p>
          <div style="background:#faf7f2;border-left:3px solid #7a6a4e;padding:16px 20px;font-size:14px;line-height:1.7;color:#3a2f24;margin:20px 0">
            {safe_message}
          </div>
          <p style="font-size:14px;line-height:1.7;margin:0 0 8px">À très bientôt,</p>
          <p style="font-size:14px;line-height:1.7;margin:0;font-style:italic">Betty &amp; Mathilde ADRIEN</p>
        </div>
        <div style="padding:18px 28px;background:#faf7f2;font-size:11px;color:#8a7a5e;text-align:center">
          Passion Pilates — Studios Nantes &amp; La Baule
        </div>
      </div>
    </div>
    """


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest) -> ContactResponse:
    """Handle contact form submissions: persists in DB and sends emails via Resend."""
    if not RESEND_API_KEY:
        raise HTTPException(status_code=503, detail="Email service not configured")

    record = {
        "id": str(uuid.uuid4()),
        "timestamp": datetime.utcnow(),
        **payload.dict(),
    }
    try:
        await db.contact_messages.insert_one(record)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Failed to persist contact message: %s", exc)

    subject = _build_email_subject(payload)

    # 1) Main email to the studio owner — sender shows visitor name + email,
    #    Reply-To is the visitor so a click on "Répondre" works.
    main_params = {
        "from": _build_from_address(payload),
        "to": [CONTACT_TO_EMAIL],
        "reply_to": [payload.email],
        "subject": subject,
        "html": _build_email_html(payload),
    }

    # 2) Auto confirmation copy to the original sender (keeps neutral "From")
    confirmation_params = {
        "from": CONTACT_FROM_EMAIL,
        "to": [payload.email],
        "subject": "Confirmation — votre message à Passion Pilates",
        "html": _build_confirmation_html(payload),
    }

    try:
        result = resend.Emails.send(main_params)
        try:
            resend.Emails.send(confirmation_params)
        except Exception as exc:  # noqa: BLE001
            logger.warning("Confirmation email failed: %s", exc)
        return ContactResponse(ok=True, id=record["id"])
    except Exception as exc:  # noqa: BLE001
        logger.error("Resend API error: %s", exc)
        raise HTTPException(status_code=502, detail=f"Email delivery failed: {exc}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger: logging.Logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client() -> None:
    client.close()
