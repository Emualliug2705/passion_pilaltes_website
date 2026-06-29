// Mock data for Passion Pilates website

export const siteInfo = {
  brand: "Passion Pilates",
  owner: "Betty ADRIEN",
  instructors: ["Betty ADRIEN", "Mathilde ADRIEN"],
  tagline: "L'art du mouvement, la passion du bien-être",
  description: "Studios de Pilates haut de gamme à Nantes et La Baule. Cours individuels, duo et semi-collectifs sur appareils authentiques.",
  phone: "06 76 90 26 34",
  email: "passionpilates44@gmail.com",
  instagram: "#",
  facebook: "#",
  planningUrl: "https://www.deciplus.pro/",
  certification: {
    school: "École de Formation Pilates de Nantes",
    accreditation: "FPMP — Fédération des Professionnels du Pilates",
    url: "https://www.fpmp.fr/dsdsheet/ecole-de-formation-pilates-de-nantes/"
  },
  discoveryNotice: "Réservez votre cours découverte au moins 7 jours à l'avance via notre formulaire de contact. Betty ou Mathilde vous recontactera personnellement."
};

export const studios = [
  {
    id: "nantes",
    name: "Nantes",
    address: "49 rue de la Gourmette",
    postal: "44300 Nantes",
    nearby: "Proche Bd Lelasseur / Bd des Américains",
    phone: "06 76 90 26 34",
    email: "passionpilates44@gmail.com",
    image: "https://images.pexels.com/photos/36833354/pexels-photo-36833354.jpeg",
    hours: [
      { day: "Lundi - Vendredi", time: "07h00 - 20h00" },
      { day: "Samedi", time: "08h00 - 14h00" },
      { day: "Dimanche", time: "Fermé" }
    ]
  },
  {
    id: "la-baule",
    name: "La Baule",
    address: "Résidence l'Étoile, 18 avenue Sarah Bernhardt",
    postal: "44500 La Baule",
    nearby: "Proche Avenue Lajarrige / Place des Palmiers",
    phone: "06 76 90 26 34",
    email: "passionpilates44@gmail.com",
    image: "https://images.pexels.com/photos/25599832/pexels-photo-25599832.jpeg",
    hours: [
      { day: "Lundi - Vendredi", time: "08h00 - 19h00" },
      { day: "Samedi", time: "09h00 - 13h00" },
      { day: "Dimanche", time: "Fermé" }
    ]
  }
];

export const services = [
  {
    title: "Cours Individuels",
    description: "Un accompagnement personnalisé, adapté à vos objectifs et à votre rythme. Le format idéal pour progresser rapidement et en toute sécurité.",
    duration: "1 heure",
    capacity: "1 personne"
  },
  {
    title: "Cours Duo",
    description: "Partagez l'expérience à deux. Un cours convivial où vous bénéficiez d'un suivi attentif tout en partageant un moment privilégié.",
    duration: "1 heure",
    capacity: "2 personnes"
  },
  {
    title: "Cours Semi-Collectifs",
    description: "Une formule en petit groupe pour conjuguer émulation et précision. Idéal pour pratiquer régulièrement avec un encadrement de qualité.",
    duration: "1 heure",
    capacity: "3 à 8 personnes"
  }
];

export const equipment = [
  { name: "Reformer", description: "L'appareil emblématique du Pilates, pour un travail complet du corps en résistance." },
  { name: "Cadillac / Wall Unit", description: "Un outil polyvalent pour explorer mobilité, force et étirements profonds." },
  { name: "Chair", description: "Compact et exigeant, parfait pour le travail d'équilibre et de stabilité." },
  { name: "Springboard", description: "Travail mural avec ressorts pour renforcer en douceur la posture." },
  { name: "Mat / Tapis", description: "L'essence du Pilates au sol : conscience corporelle et précision du geste." }
];

export const galleryImages = [
  "https://images.pexels.com/photos/25596680/pexels-photo-25596680.jpeg",
  "https://images.pexels.com/photos/18499500/pexels-photo-18499500.png",
  "https://images.pexels.com/photos/8769163/pexels-photo-8769163.jpeg",
  "https://images.unsplash.com/photo-1747238415033-b74eec07eb59?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBpbGF0ZXMlMjByZWZvcm1lcnxlbnwwfHx8fDE3ODIzOTc0MzR8MA&ixlib=rb-4.1.0&q=85",
  "https://images.pexels.com/photos/36833354/pexels-photo-36833354.jpeg",
  "https://images.pexels.com/photos/25599832/pexels-photo-25599832.jpeg",
  "https://images.pexels.com/photos/6111610/pexels-photo-6111610.jpeg",
  "https://images.unsplash.com/photo-1747240549807-fc3962949818?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHx3b21hbiUyMHBpbGF0ZXMlMjByZWZvcm1lcnxlbnwwfHx8fDE3ODIzOTc0MzR8MA&ixlib=rb-4.1.0&q=85"
];

export const heroImage = "https://images.pexels.com/photos/25596680/pexels-photo-25596680.jpeg";
export const aboutImage = "https://images.pexels.com/photos/6111610/pexels-photo-6111610.jpeg";

export const testimonials = [
  {
    name: "Camille L.",
    location: "Nantes",
    text: "Betty est une professeure exceptionnelle. Son écoute et sa précision m'ont permis de retrouver une posture saine et de soulager mon dos.",
    rating: 5
  },
  {
    name: "Sophie M.",
    location: "La Baule",
    text: "Un studio magnifique, du matériel de qualité et un accompagnement sur-mesure. Chaque séance est un moment précieux.",
    rating: 5
  },
  {
    name: "Hélène R.",
    location: "Nantes",
    text: "Je pratique depuis 2 ans et les bienfaits sont incroyables. Tonicité, souplesse et bien-être au rendez-vous !",
    rating: 5
  }
];

export const principles = [
  { title: "Respiration", text: "Le souffle anime chaque mouvement et nourrit la concentration." },
  { title: "Concentration", text: "Une attention pleine pour engager le corps avec justesse." },
  { title: "Centrage", text: "Le powerhouse, point d'ancrage de toute stabilité." },
  { title: "Contrôle", text: "Une maîtrise précise de chaque geste, sans effort superflu." },
  { title: "Précision", text: "La qualité prime sur la quantité, toujours." },
  { title: "Fluidité", text: "Un enchaînement gracieux qui devient méditation en mouvement." }
];
