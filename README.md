# Passion Pilates — Site web

Site officiel des studios **Passion Pilates** à Nantes et La Baule, dirigés par **Betty & Mathilde ADRIEN**, diplômées de l'École de Formation Pilates de Nantes (agrément FPMP).

- **Frontend** : React 19 + Tailwind CSS + Embla Carousel
- **Backend** : FastAPI + MongoDB
- **E-mails** : [Resend](https://resend.com) (gratuit jusqu'à 3 000 envois / mois)

---

## Sommaire

1. [Mettre à jour les photos des studios](#1-mettre-à-jour-les-photos-des-studios)
2. [Mettre à jour les photos de Betty & Mathilde](#2-mettre-à-jour-les-photos-de-betty--mathilde)
3. [Changer l'adresse e-mail destinataire](#3-changer-ladresse-e-mail-destinataire)
4. [Configurer Resend (envoi des e-mails)](#4-configurer-resend-envoi-des-e-mails)
5. [Mettre en place un nom de domaine personnalisé](#5-mettre-en-place-un-nom-de-domaine-personnalisé)
6. [Architecture et structure du projet](#6-architecture-et-structure-du-projet)

---

## 1. Mettre à jour les photos des studios

Toutes les photos sont définies dans **un seul fichier** :
`frontend/src/mock.js`

### Option A — Photos hébergées en ligne (recommandé)

1. Uploadez vos photos sur un service d'hébergement (Cloudinary, Imgur, Google Drive partagé, etc.) pour obtenir une URL directe se terminant par `.jpg`, `.png` ou `.webp`.
2. Ouvrez `frontend/src/mock.js`, trouvez le bloc `studios = [...]`.
3. Pour chaque studio, modifiez le tableau `photos: [...]` :

```js
export const studios = [
  {
    id: "nantes",
    name: "Nantes",
    // ...
    photos: [
      "https://votre-hebergeur.com/nantes-photo-1.jpg",
      "https://votre-hebergeur.com/nantes-photo-2.jpg",
      "https://votre-hebergeur.com/nantes-photo-3.jpg"
      // ajoutez autant de photos que vous voulez
    ]
  },
  {
    id: "la-baule",
    // ...
    photos: [ /* idem pour La Baule */ ]
  }
];
```

4. Commit + push → le carrousel se met à jour automatiquement après déploiement.

### Option B — Photos hébergées dans le repo

1. Créez le dossier `frontend/public/studios/`
2. Déposez vos images dedans (ex : `nantes-1.jpg`, `labaule-2.jpg`)
3. Dans `mock.js`, référencez-les en chemin relatif :

```js
photos: ["/studios/nantes-1.jpg", "/studios/nantes-2.jpg"]
```

### Photo principale (hero) de la page studio

C'est le champ `image` de chaque studio, juste au-dessus de `photos`. Modifiez-le de la même façon.

### Recommandations

- **Format** : JPG (qualité 80%) ou WebP
- **Dimensions** : 1600 × 1000 px environ
- **Poids** : moins de 500 Ko par image (compression sur [tinypng.com](https://tinypng.com))

---

## 2. Mettre à jour les photos de Betty & Mathilde

Les photos des professeures s'affichent dans la section "Vos professeures" de la page d'accueil, sous forme d'un **carrousel horizontal scrollable** (flèches + dots + swipe mobile).

1. Ouvrez `frontend/src/mock.js`
2. Trouvez la constante `instructorPhotos`
3. Ajoutez ou remplacez les URLs :

```js
export const instructorPhotos = [
  "https://votre-hebergeur.com/betty-1.jpg",
  "https://votre-hebergeur.com/mathilde-1.jpg",
  "https://votre-hebergeur.com/duo-1.jpg"
  // autant que vous voulez
];
```

Pas de limite — le carrousel s'adapte automatiquement au nombre de photos.

---

## 3. Changer l'adresse e-mail destinataire

L'adresse qui reçoit les messages du formulaire de contact est stockée dans `backend/.env` :

```env
CONTACT_TO_EMAIL="gpelluet@gmail.com"
```

Pour la modifier :

1. Éditez `backend/.env`
2. Remplacez la valeur par votre nouvelle adresse :
   ```env
   CONTACT_TO_EMAIL="votre-nouvelle-adresse@exemple.com"
   ```
3. Redémarrez le backend (ou redéployez l'application)

L'expéditeur peut également être personnalisé via `CONTACT_FROM_EMAIL` une fois votre domaine vérifié (voir section 5).

---

## 4. Configurer Resend (envoi des e-mails)

Le formulaire utilise **Resend** pour envoyer les e-mails. Gratuit jusqu'à **3 000 e-mails / mois** (largement suffisant).

### Création du compte

1. Aller sur [resend.com/signup](https://resend.com/signup)
2. Créer un compte (gratuit, pas de CB demandée)
3. Confirmer l'e-mail

### Obtenir la clé API

1. Une fois connecté → menu **API Keys** → **Create API Key**
2. Donner un nom (ex : `passion-pilates-prod`), permission `Sending access`
3. Copier la clé (elle commence par `re_…`)
4. La coller dans `backend/.env` :
   ```env
   RESEND_API_KEY="re_VotreCleIci"
   ```
5. Redémarrer le backend

### Fonctionnement actuel

Quand un visiteur soumet le formulaire :
1. Le message est **enregistré en base** (MongoDB, collection `contact_messages`)
2. Un e-mail formaté est envoyé à `CONTACT_TO_EMAIL`
3. Le champ **Reply-To** est celui de l'expéditeur → vous pouvez répondre directement
4. Une **copie automatique de confirmation** est envoyée à l'expéditeur ("Accusé de réception")

### Limites du plan gratuit

- 100 e-mails / jour
- 3 000 e-mails / mois
- Sans domaine vérifié : envoi possible **uniquement depuis** `onboarding@resend.dev`
- Avec domaine vérifié (voir section 5) : envoi depuis `contact@votredomaine.fr`

---

## 5. Mettre en place un nom de domaine personnalisé

Pour que les e-mails partent depuis `contact@passionpilates.info` (ou `.fr`) au lieu de `onboarding@resend.dev`, il faut **vérifier le domaine** dans Resend.

### Étape 1 — Acheter un nom de domaine (si pas encore fait)

Bureaux d'enregistrement recommandés (10-15 € / an) :
- [OVH](https://www.ovhcloud.com/fr/domains/) — français, support FR
- [Gandi](https://www.gandi.net) — français
- [Namecheap](https://www.namecheap.com) — anglais, moins cher
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) — prix coûtant

Suggestions : `passionpilates.info` (l'actuel), `passion-pilates.fr`, `passionpilates-studio.fr`…

### Étape 2 — Ajouter le domaine dans Resend

1. Aller sur [resend.com/domains](https://resend.com/domains) → **Add Domain**
2. Saisir votre domaine (ex : `passionpilates.info`)
3. Resend affiche **3-4 enregistrements DNS** à ajouter :
   - 1 enregistrement MX
   - 2 enregistrements TXT (SPF + DKIM)
   - 1 enregistrement TXT optionnel (DMARC)

### Étape 3 — Ajouter les DNS chez votre registrar

Connectez-vous à votre interface DNS (OVH, Gandi…) et créez les enregistrements **exactement comme indiqué par Resend** (copier-coller).

Vérification : Resend détecte les DNS sous 5 min à quelques heures.

### Étape 4 — Mettre à jour le `.env`

Une fois le domaine validé (badge vert dans Resend) :

```env
CONTACT_FROM_EMAIL="Passion Pilates <contact@passionpilates.info>"
```

Redémarrer le backend → les e-mails partent désormais depuis votre domaine, avec une délivrabilité bien meilleure.

### Étape 5 — Pointer votre domaine vers l'application

Cette étape dépend de votre plateforme de déploiement (Emergent, Vercel, Railway…) :
- Récupérez l'URL ou l'IP fournie par votre hébergeur
- Dans votre DNS, créez un enregistrement `A` ou `CNAME` pointant `www` (ou `@`) vers cette destination

Pour Emergent : voir le menu **Deploy → Custom Domain** depuis votre dashboard.

---

## 6. Architecture et structure du projet

```
/app
├── backend/
│   ├── server.py              ← endpoints API + envoi e-mails
│   ├── .env                   ← variables d'environnement (NE PAS COMMITTER)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── mock.js            ← TOUTES les données éditables (photos, infos, avis)
    │   ├── App.js
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── ContactForm.jsx
    │   │   ├── StudioPhotoCarousel.jsx
    │   │   └── sections/
    │   │       ├── HeroSection.jsx
    │   │       ├── IntroAbout.jsx           ← section Betty & Mathilde
    │   │       ├── ServicesSection.jsx
    │   │       ├── GoogleReviewsSection.jsx
    │   │       └── …
    │   └── pages/
    │       ├── Home.jsx
    │       ├── StudioPage.jsx               ← /nantes et /la-baule
    │       ├── LeStudio.jsx
    │       └── Contact.jsx
    └── public/
```

### Fichiers à connaître pour éditer le contenu

| Pour modifier… | Fichier | Variable |
|---|---|---|
| Photos studios (Nantes / La Baule) | `frontend/src/mock.js` | `studios[].photos` |
| Photo principale du studio | `frontend/src/mock.js` | `studios[].image` |
| Photos Betty & Mathilde | `frontend/src/mock.js` | `instructorPhotos` |
| Galerie page d'accueil | `frontend/src/mock.js` | `galleryImages` |
| Coordonnées / adresses | `frontend/src/mock.js` | `siteInfo`, `studios` |
| Témoignages / avis Google | `frontend/src/mock.js` | `googleReviews`, `testimonials` |
| Horaires d'ouverture | `frontend/src/mock.js` | `studios[].hours` |
| Tarifs et formules | `frontend/src/mock.js` | `services` |
| Lien Deciplus (Espace élève) | `frontend/src/mock.js` | `siteInfo.planningUrl` |
| Adresse destinataire e-mails | `backend/.env` | `CONTACT_TO_EMAIL` |
| Expéditeur des e-mails | `backend/.env` | `CONTACT_FROM_EMAIL` |

---

## Démarrage local (pour développeurs)

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Frontend (dans un autre terminal)
cd frontend
yarn install
yarn start
```

L'application est ensuite accessible sur [http://localhost:3000](http://localhost:3000).

---

## Crédits

Conçu et développé pour Passion Pilates — Betty & Mathilde ADRIEN.
