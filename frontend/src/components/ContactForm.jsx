import React, { useState, useEffect, useRef, useMemo } from "react";
import { Clock, Info } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { services } from "../mock";

const COURSE_TYPES = services.map((s) => s.title); // ["Cours Individuels", "Cours Duo", "Cours Semi-Collectifs"]

const studioFragment = (studio) => {
  if (studio && studio !== "Indifférent") return `au studio de ${studio}`;
  return "dans l'un de vos studios";
};

const signature = (name) => {
  const cleanName = (name || "").trim();
  return cleanName ? `Madame ${cleanName}` : "Madame";
};

const buildDiscoveryMessage = (name, studio) => {
  return [
    "Bonjour Madame ADRIEN,",
    "",
    `j'aurais aimé m'inscrire pour un cours de découverte collectifs ou privé ${studioFragment(studio)}. Quelles sont les disponibilités ?`,
    "",
    "Bien à vous,",
    "",
    signature(name)
  ].join("\n");
};

const buildInscriptionMessage = (name, studio, courseType) => {
  const courseStr = courseType ? `à un ${courseType}` : "à vos cours";
  return [
    "Bonjour Madame ADRIEN,",
    "",
    `je souhaiterais m'inscrire ${courseStr} ${studioFragment(studio)}. Pourriez-vous m'indiquer les modalités d'inscription ainsi que les créneaux disponibles ?`,
    "",
    "Bien à vous,",
    "",
    signature(name)
  ].join("\n");
};

const buildTemplate = (requestType, { name, studio, courseType }) => {
  if (requestType === "decouverte") return buildDiscoveryMessage(name, studio);
  if (requestType === "inscription") return buildInscriptionMessage(name, studio, courseType);
  return "";
};

const ContactForm = ({ defaultStudio = "", defaultRequest = "decouverte" }) => {
  const { toast } = useToast();

  const [messageAutoFilled, setMessageAutoFilled] = useState(
    defaultRequest === "decouverte" || defaultRequest === "inscription"
  );

  const initialMessage = useMemo(
    () => buildTemplate(defaultRequest, { name: "", studio: defaultStudio, courseType: "" }),
    [defaultRequest, defaultStudio]
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studio: defaultStudio,
    courseType: "",
    requestType: defaultRequest,
    message: initialMessage
  });
  const [submitting, setSubmitting] = useState(false);
  const lastAutoMessageRef = useRef(initialMessage);

  // Sync defaultStudio (e.g. URL param hydration)
  useEffect(() => {
    if (defaultStudio) {
      setForm((prev) => ({ ...prev, studio: defaultStudio }));
    }
  }, [defaultStudio]);

  // Auto-regenerate the message whenever inputs change AND user hasn't taken over
  useEffect(() => {
    if (!messageAutoFilled) return;
    if (form.requestType !== "decouverte" && form.requestType !== "inscription") return;
    const next = buildTemplate(form.requestType, {
      name: form.name,
      studio: form.studio,
      courseType: form.courseType
    });
    lastAutoMessageRef.current = next;
    setForm((prev) => (prev.message === next ? prev : { ...prev, message: next }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name, form.studio, form.courseType, form.requestType, messageAutoFilled]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onMessageChange = (e) => {
    const value = e.target.value;
    if (value !== lastAutoMessageRef.current) {
      setMessageAutoFilled(false);
    }
    setForm((prev) => ({ ...prev, message: value }));
  };

  const onRequestTypeChange = (newType) => {
    setForm((prev) => {
      const next = { ...prev, requestType: newType };
      const isTemplated = newType === "decouverte" || newType === "inscription";
      const isEmpty = prev.message.trim() === "";
      const stillAuto = prev.message === lastAutoMessageRef.current;
      if (isTemplated && (isEmpty || stillAuto)) {
        const tpl = buildTemplate(newType, {
          name: prev.name,
          studio: prev.studio,
          courseType: prev.courseType
        });
        lastAutoMessageRef.current = tpl;
        setMessageAutoFilled(true);
        next.message = tpl;
      } else if (!isTemplated && stillAuto) {
        next.message = "";
        setMessageAutoFilled(false);
      }
      return next;
    });
  };

  const onCourseTypeChange = (ct) => {
    setForm((prev) => ({ ...prev, courseType: ct === prev.courseType ? "" : ct }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Champs manquants", description: "Merci de remplir les champs obligatoires." });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Message envoyé",
        description: "Merci, Passion Pilates vous recontactera personnellement dès réception de votre message."
      });
      const blankMsg = buildTemplate(defaultRequest, { name: "", studio: defaultStudio, courseType: "" });
      lastAutoMessageRef.current = blankMsg;
      setMessageAutoFilled(defaultRequest === "decouverte" || defaultRequest === "inscription");
      setForm({
        name: "",
        email: "",
        phone: "",
        studio: defaultStudio,
        courseType: "",
        requestType: defaultRequest,
        message: blankMsg
      });
    }, 900);
  };

  const isDecouverte = form.requestType === "decouverte";
  const isInscription = form.requestType === "inscription";
  const showHelper = (isDecouverte || isInscription) && messageAutoFilled;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Request type selector */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-3">Objet de votre demande</label>
        <div className="grid sm:grid-cols-3 gap-2">
          {[
            { value: "decouverte", label: "Cours découverte" },
            { value: "inscription", label: "Inscription" },
            { value: "info", label: "Information" }
          ].map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => onRequestTypeChange(opt.value)}
              className={`px-4 py-3 text-xs uppercase tracking-[0.2em] border transition-colors ${
                form.requestType === opt.value
                  ? "bg-[#3a2f24] text-[#faf7f2] border-[#3a2f24]"
                  : "bg-transparent text-[#3a2f24] border-[#c9bda4] hover:border-[#3a2f24]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {isDecouverte && (
          <div className="mt-4 flex items-start gap-3 bg-[#f2ebdf] border border-[#e8dfca] p-4 text-sm text-[#3a2f24]">
            <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#7a6a4e]" />
            <p>
              Merci de réserver votre cours découverte au moins <strong className="font-medium">7 jours à l&rsquo;avance</strong>. Betty ou Mathilde vous recontactera personnellement pour fixer ensemble votre première séance.
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Nom *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Studio</label>
          <select
            name="studio"
            value={form.studio}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          >
            <option value="">Sélectionner</option>
            <option value="Nantes">Nantes</option>
            <option value="La Baule">La Baule</option>
            <option value="Indifférent">Indifférent</option>
          </select>
        </div>
      </div>

      {/* Course type — only visible for Inscription */}
      {isInscription && (
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-3">
            Type de cours souhaité
          </label>
          <div className="grid sm:grid-cols-3 gap-2">
            {COURSE_TYPES.map((ct) => (
              <button
                type="button"
                key={ct}
                onClick={() => onCourseTypeChange(ct)}
                className={`px-3 py-3 text-xs uppercase tracking-[0.2em] border transition-colors ${
                  form.courseType === ct
                    ? "bg-[#7a6a4e] text-[#faf7f2] border-[#7a6a4e]"
                    : "bg-transparent text-[#3a2f24] border-[#c9bda4] hover:border-[#3a2f24]"
                }`}
              >
                {ct}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[#8a7a5e] italic mt-2">
            Optionnel &mdash; précisera automatiquement votre message.
          </p>
        </div>
      )}

      <div>
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">
          Message *{" "}
          {showHelper && (
            <span className="text-[10px] normal-case tracking-normal text-[#8a7a5e] italic ml-2">
              (modèle pré-rempli &mdash; votre nom, studio{isInscription ? " et type de cours" : ""} s&rsquo;ajoutent automatiquement)
            </span>
          )}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={onMessageChange}
          rows={9}
          className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors resize-none whitespace-pre-wrap"
        />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={submitting}
          className="px-10 py-4 bg-[#3a2f24] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#7a6a4e] transition-colors disabled:opacity-60"
        >
          {submitting ? "Envoi..." : "Envoyer ma demande"}
        </button>
        <p className="text-xs text-[#8a7a5e] flex items-center gap-2">
          <Info size={12} /> Réponse personnalisée sous 48h
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
