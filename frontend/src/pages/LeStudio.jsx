import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { equipment, services, galleryImages, aboutImage, siteInfo } from "../mock";
import useReveal from "../hooks/useReveal";
import PrinciplesSection from "../components/sections/PrinciplesSection";

const LeStudioHero = () => (
  <section className="relative h-[60vh] min-h-[460px] w-full overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom" style={{ backgroundImage: `url(${galleryImages[4]})` }} />
    <div className="absolute inset-0 bg-[#2c2520]/55" />
    <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-16">
      <p className="text-xs tracking-[0.5em] uppercase text-[#e8e0d0] mb-4">Nantes · La Baule</p>
      <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-[96px] leading-none">
        Le <em className="italic font-light">Studio</em>
      </h1>
    </div>
  </section>
);

const LeStudioIntro = () => (
  <section className="py-24 md:py-32 px-6 md:px-10">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
      <div className="reveal">
        <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">L'esprit Passion Pilates</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] leading-tight">
          Une méthode, <em className="italic font-light">deux studios.</em>
        </h2>
        <div className="w-16 h-px bg-[#8a7a5e] my-8" />
        <p className="text-[#5c5147] leading-[1.9] mb-6">
          Passion Pilates propose à ses élèves un accompagnement personnalisé dans deux studios pensés pour la qualité de la pratique. Que vous soyez à Nantes ou à La Baule, vous y retrouverez la même exigence, le même matériel professionnel et la même attention.
        </p>
        <p className="text-[#5c5147] leading-[1.9]">
          Sous la direction de {siteInfo.owner}, chaque séance est conçue pour respecter le corps, ses besoins et ses objectifs.
        </p>
      </div>
      <div className="reveal aspect-[4/5] overflow-hidden">
        <img src={aboutImage} alt="Studio" className="w-full h-full object-cover" />
      </div>
    </div>
  </section>
);

const EquipmentSection = () => (
  <section className="py-24 md:py-32 bg-[#f2ebdf] px-6 md:px-10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20 reveal">
        <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Équipement professionnel</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520]">
          Le matériel <em className="italic font-light">le plus complet.</em>
        </h2>
        <p className="text-[#5c5147] mt-6 max-w-2xl mx-auto leading-relaxed">
          Nos studios sont équipés du matériel Pilates le plus authentique, pour une pratique exigeante et progressive.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {equipment.map((e, i) => (
          <div key={e.name} className="reveal border-t border-[#c9bda4] pt-8" style={{ transitionDelay: `${i * 80}ms` }}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-3">0{i + 1}</p>
            <h3 className="font-serif text-3xl text-[#2c2520] mb-3">{e.name}</h3>
            <p className="text-[#5c5147] leading-relaxed">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ServicesGrid = () => (
  <section className="py-24 md:py-32 px-6 md:px-10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16 reveal">
        <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Nos formules</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520]">
          Choisissez votre <em className="italic font-light">pratique.</em>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={s.title} className="reveal bg-[#f2ebdf] p-10 group hover:bg-[#2c2520] hover:text-[#faf7f2] transition-colors duration-500" style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="font-serif text-5xl text-[#c9bda4] group-hover:text-[#a89878] transition-colors">0{i + 1}</span>
            <h3 className="font-serif text-3xl mt-4 mb-4">{s.title}</h3>
            <p className="leading-relaxed mb-6 opacity-90">{s.description}</p>
            <div className="flex gap-6 text-xs uppercase tracking-[0.25em] border-t border-current/20 pt-4 opacity-80">
              <span>{s.duration}</span>
              <span>{s.capacity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 md:py-32 px-6 md:px-10">
    <div className="max-w-4xl mx-auto text-center reveal">
      <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] leading-tight">
        Prêt(e) à découvrir <em className="italic font-light">votre studio&nbsp;?</em>
      </h2>
      <div className="mt-12 flex flex-wrap gap-4 justify-center">
        <Link to="/nantes" className="px-10 py-4 bg-[#3a2f24] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#7a6a4e] transition-colors inline-flex items-center gap-3">
          Studio Nantes <ArrowRight size={14} />
        </Link>
        <Link to="/la-baule" className="px-10 py-4 border border-[#3a2f24] text-[#3a2f24] text-xs uppercase tracking-[0.3em] hover:bg-[#3a2f24] hover:text-[#faf7f2] transition-colors inline-flex items-center gap-3">
          Studio La Baule <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </section>
);

const LeStudio = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useReveal();

  return (
    <div className="bg-[#faf7f2]">
      <LeStudioHero />
      <LeStudioIntro />
      <EquipmentSection />
      <ServicesGrid />
      <PrinciplesSection titleSuffix="du Pilates" />
      <FinalCTA />
    </div>
  );
};

export default LeStudio;
