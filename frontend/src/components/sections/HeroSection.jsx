import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { heroImage, siteInfo } from "../../mock";

const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2c2520]/40 via-[#2c2520]/30 to-[#2c2520]/70" />

      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-32">
        <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-[#e8e0d0] mb-6 animate-fade-in-up">
          Studio de Pilates · Nantes · La Baule
        </p>
        <h1
          className="font-serif text-white text-5xl md:text-7xl lg:text-[96px] leading-[0.95] max-w-4xl animate-fade-in-up"
          style={{ animationDelay: "0.15s", opacity: 0, animationFillMode: "forwards" }}
        >
          L'art du <em className="italic font-light">mouvement</em>,<br />
          la passion du <em className="italic font-light">bien-être</em>.
        </h1>
        <p
          className="text-[#e8e0d0] mt-8 max-w-xl text-base md:text-lg leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
        >
          Une méthode authentique, un accompagnement sur-mesure. Découvrez le Pilates dans nos studios haut de gamme à Nantes et La Baule.
        </p>
        <div
          className="mt-10 flex flex-wrap gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.45s", opacity: 0, animationFillMode: "forwards" }}
        >
          <a
            href={siteInfo.planningUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#faf7f2] text-[#2c2520] text-xs uppercase tracking-[0.3em] hover:bg-[#e8e0d0] transition-colors"
          >
            Réserver un cours <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            to="/le-studio"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#faf7f2] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#faf7f2] hover:text-[#2c2520] transition-colors"
          >
            Découvrir le studio
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-3 text-[#e8e0d0] text-xs tracking-[0.3em] uppercase">
        <div className="w-12 h-px bg-[#e8e0d0]" />
        Scroll
      </div>
    </section>
  );
};

export default HeroSection;
