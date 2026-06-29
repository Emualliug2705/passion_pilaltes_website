import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { aboutImage, galleryImages, siteInfo } from "../../mock";

export const IntroSection = () => {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-5xl mx-auto text-center reveal">
        <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Bienvenue</p>
        <h2 className="font-serif text-4xl md:text-6xl text-[#2c2520] leading-tight">
          Renforcer le corps,<br />
          <em className="italic font-light">apaiser l'esprit.</em>
        </h2>
        <div className="w-16 h-px bg-[#8a7a5e] mx-auto my-10" />
        <p className="text-[#5c5147] text-lg leading-[1.9] max-w-3xl mx-auto">
          Passion Pilates est né d'une certitude&nbsp;: le mouvement, lorsqu'il est juste, transforme. Sous la conduite de {siteInfo.owner}, nos studios proposent une pratique exigeante et bienveillante, fidèle à l'esprit de Joseph Pilates. Chaque séance devient un dialogue entre le corps et le souffle.
        </p>
      </div>
    </section>
  );
};

export const AboutBettySection = () => {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="reveal relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={aboutImage} alt="Betty Adrien" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-[#3a2f24] text-[#faf7f2] py-6 px-8">
            <p className="font-serif text-3xl italic">15+ ans</p>
            <p className="text-xs uppercase tracking-[0.25em] text-[#c9bda4]">d'expérience</p>
          </div>
        </div>
        <div className="reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Votre professeure</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] leading-tight">
            Betty <em className="italic font-light">Adrien</em>
          </h2>
          <div className="w-16 h-px bg-[#8a7a5e] my-8" />
          <p className="text-[#5c5147] leading-[1.9] mb-6">
            Formée à la méthode Pilates dans la plus pure tradition, Betty accompagne ses élèves avec une rigueur attentive. Sa pédagogie privilégie l'écoute du corps, la précision technique et le plaisir de pratiquer.
          </p>
          <p className="text-[#5c5147] leading-[1.9] mb-10">
            «&nbsp;Le Pilates n'est pas un sport, c'est une discipline qui se vit. Mon rôle est de guider chacun vers une meilleure conscience de soi.&nbsp;»
          </p>
          <Link
            to="/le-studio"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#3a2f24] border-b border-[#3a2f24] pb-2 hover:gap-5 transition-all"
          >
            En savoir plus <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export const FinalCTASection = () => {
  return (
    <section className="relative py-32 md:py-40 px-6 md:px-10 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${galleryImages[2]})` }}
      />
      <div className="absolute inset-0 bg-[#2c2520]/75" />
      <div className="relative max-w-3xl mx-auto text-center text-[#faf7f2] reveal">
        <p className="text-xs tracking-[0.4em] uppercase text-[#a89878] mb-6">Commencez aujourd'hui</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Offrez-vous votre <em className="italic font-light">premier cours.</em>
        </h2>
        <p className="mt-8 text-[#e8e0d0] text-lg leading-relaxed">
          Réservez dès maintenant un cours découverte dans l'un de nos studios.
        </p>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a
            href={siteInfo.planningUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#faf7f2] text-[#2c2520] text-xs uppercase tracking-[0.3em] hover:bg-[#e8e0d0] transition-colors"
          >
            Réserver <ArrowRight size={14} />
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 border border-[#faf7f2] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#faf7f2] hover:text-[#2c2520] transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
};
