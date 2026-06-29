import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Clock } from "lucide-react";
import { galleryImages, instructorPhotos, siteInfo } from "../../mock";
import StudioPhotoCarousel from "../StudioPhotoCarousel";

export const IntroSection = () => {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-5xl mx-auto text-center reveal">
        <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Bienvenue</p>
        <h2 className="font-serif text-4xl md:text-6xl text-[#2c2520] leading-tight">
          Renforcer le corps,<br />
          <em className="italic font-light">apaiser l&rsquo;esprit.</em>
        </h2>
        <div className="w-16 h-px bg-[#8a7a5e] mx-auto my-10" />
        <p className="text-[#5c5147] text-lg leading-[1.9] max-w-3xl mx-auto">
          Passion Pilates est né d&rsquo;une certitude&nbsp;: le mouvement, lorsqu&rsquo;il est juste, transforme. Sous la conduite de {siteInfo.instructors.join(" et ")}, nos studios proposent une pratique exigeante et bienveillante, fidèle à l&rsquo;esprit de Joseph Pilates.
        </p>
      </div>
    </section>
  );
};

export const AboutBettySection = () => {
  return (
    <section className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-14">
          <div className="reveal">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Vos professeures</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] leading-tight">
              Betty &amp; Mathilde <em className="italic font-light">Adrien</em>
            </h2>
            <div className="w-16 h-px bg-[#8a7a5e] my-8" />
            <p className="text-[#5c5147] leading-[1.9] mb-6">
              Formées à la méthode Pilates dans la plus pure tradition, Betty et Mathilde accompagnent leurs élèves avec une rigueur attentive. Leur pédagogie privilégie l&rsquo;écoute du corps, la précision technique et le plaisir de pratiquer.
            </p>
            <p className="text-[#5c5147] leading-[1.9] mb-8">
              «&nbsp;Le Pilates n&rsquo;est pas un sport, c&rsquo;est une discipline qui se vit. Notre rôle est de guider chacun vers une meilleure conscience de soi.&nbsp;»
            </p>
          </div>

          <div className="reveal">
            <div className="border border-[#c9bda4]/60 bg-[#f2ebdf]/40 p-6 mb-6">
              <div className="flex items-start gap-3">
                <Award size={22} className="text-[#7a6a4e] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#7a6a4e] mb-2">Certification &amp; Agrément</p>
                  <p className="text-sm text-[#3a2f24] leading-relaxed">
                    Diplômées de l&rsquo;<strong className="font-medium">{siteInfo.certification.school}</strong> &middot; Studio agréé{" "}
                    <a
                      href={siteInfo.certification.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 hover:text-[#7a6a4e]"
                    >
                      FPMP
                    </a>{" "}
                    (Fédération des Professionnels du Pilates).
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/le-studio"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#3a2f24] border-b border-[#3a2f24] pb-2 hover:gap-5 transition-all"
            >
              En savoir plus <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Horizontal scrollable photo carousel for the instructors */}
        <div className="reveal">
          <StudioPhotoCarousel photos={instructorPhotos} studioName="Betty & Mathilde Adrien" />
        </div>
      </div>
    </section>
  );
};

export const DiscoverySection = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-[#f2ebdf]">
      <div className="max-w-6xl mx-auto reveal">
        <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
          <div className="md:col-span-3">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-5">Première visite</p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2c2520] leading-tight">
              Offrez-vous un <em className="italic font-light">cours découverte.</em>
            </h2>
            <div className="w-16 h-px bg-[#8a7a5e] my-6" />
            <p className="text-[#5c5147] leading-[1.9] mb-4">
              Vous souhaitez découvrir le Pilates&nbsp;? Réservez votre premier cours en nous contactant via le formulaire dédié, au moins <strong className="font-medium text-[#3a2f24]">7 jours à l&rsquo;avance</strong>. Betty ou Mathilde vous recontactera personnellement pour échanger sur vos attentes, vos éventuels antécédents et vous proposer le créneau le plus adapté.
            </p>
          </div>
          <div className="md:col-span-2 space-y-5">
            <div className="bg-white p-6 border border-[#e8dfca]">
              <div className="flex items-center gap-3 mb-3">
                <Clock size={18} className="text-[#7a6a4e]" />
                <p className="text-xs uppercase tracking-[0.3em] text-[#7a6a4e]">7 jours à l&rsquo;avance</p>
              </div>
              <p className="text-sm text-[#3a2f24] leading-relaxed">
                Une anticipation qui nous permet d&rsquo;adapter au mieux votre première séance.
              </p>
            </div>
            <Link
              to="/contact"
              className="group block bg-[#3a2f24] text-[#faf7f2] p-6 hover:bg-[#7a6a4e] transition-colors"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#a89878] mb-2">Étape 1</p>
              <p className="font-serif text-2xl mb-3">Remplir le formulaire</p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] border-b border-[#faf7f2] pb-1 group-hover:gap-4 transition-all">
                Cours découverte <ArrowRight size={14} />
              </span>
            </Link>
          </div>
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
        <p className="text-xs tracking-[0.4em] uppercase text-[#a89878] mb-6">Commencez aujourd&rsquo;hui</p>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
          Offrez-vous votre <em className="italic font-light">premier cours.</em>
        </h2>
        <p className="mt-8 text-[#e8e0d0] text-lg leading-relaxed">
          Demandez votre cours découverte au moins 7 jours à l&rsquo;avance. Nous vous recontactons pour fixer ensemble votre première séance.
        </p>
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#faf7f2] text-[#2c2520] text-xs uppercase tracking-[0.3em] hover:bg-[#e8e0d0] transition-colors"
          >
            Demander un cours découverte <ArrowRight size={14} />
          </Link>
          <a
            href={siteInfo.planningUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-[#faf7f2] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#faf7f2] hover:text-[#2c2520] transition-colors"
          >
            Espace élève (Deciplus)
          </a>
        </div>
      </div>
    </section>
  );
};
