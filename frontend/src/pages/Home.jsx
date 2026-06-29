import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { heroImage, aboutImage, services, principles, testimonials, studios, galleryImages, siteInfo } from "../mock";

const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const Home = () => {
  useReveal();
  const heroRef = useRef(null);

  return (
    <div className="bg-[#faf7f2]">
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c2520]/40 via-[#2c2520]/30 to-[#2c2520]/70" />

        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-32">
          <p className="text-xs md:text-sm tracking-[0.5em] uppercase text-[#e8e0d0] mb-6 animate-fade-in-up">
            Studio de Pilates · Nantes · La Baule
          </p>
          <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-[96px] leading-[0.95] max-w-4xl animate-fade-in-up" style={{ animationDelay: "0.15s", opacity: 0, animationFillMode: "forwards" }}>
            L'art du <em className="italic font-light">mouvement</em>,<br/>
            la passion du <em className="italic font-light">bien-être</em>.
          </h1>
          <p className="text-[#e8e0d0] mt-8 max-w-xl text-base md:text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}>
            Une méthode authentique, un accompagnement sur-mesure. Découvrez le Pilates dans nos studios haut de gamme à Nantes et La Baule.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: "0.45s", opacity: 0, animationFillMode: "forwards" }}>
            <a href={siteInfo.planningUrl} target="_blank" rel="noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#faf7f2] text-[#2c2520] text-xs uppercase tracking-[0.3em] hover:bg-[#e8e0d0] transition-colors">
              Réserver un cours <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <Link to="/le-studio" className="inline-flex items-center gap-3 px-8 py-4 border border-[#faf7f2] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#faf7f2] hover:text-[#2c2520] transition-colors">
              Découvrir le studio
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden md:flex items-center gap-3 text-[#e8e0d0] text-xs tracking-[0.3em] uppercase">
          <div className="w-12 h-px bg-[#e8e0d0]" />
          Scroll
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 md:py-36 px-6 md:px-10">
        <div className="max-w-5xl mx-auto text-center reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Bienvenue</p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#2c2520] leading-tight">
            Renforcer le corps,<br/>
            <em className="italic font-light">apaiser l'esprit.</em>
          </h2>
          <div className="w-16 h-px bg-[#8a7a5e] mx-auto my-10" />
          <p className="text-[#5c5147] text-lg leading-[1.9] max-w-3xl mx-auto">
            Passion Pilates est né d'une certitude : le mouvement, lorsqu'il est juste, transforme. Sous la conduite de {siteInfo.owner}, nos studios proposent une pratique exigeante et bienveillante, fidèle à l'esprit de Joseph Pilates. Chaque séance devient un dialogue entre le corps et le souffle.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32 bg-[#f2ebdf] px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal">
            <div>
              <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-4">Nos formules</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] max-w-xl leading-tight">
                Trois façons de pratiquer.
              </h2>
            </div>
            <p className="text-[#5c5147] max-w-md leading-relaxed">
              Que vous débutiez ou que vous soyez confirmé(e), choisissez le format qui correspond à vos objectifs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-[#d9cdb4]">
            {services.map((s, i) => (
              <div key={i} className="bg-[#f2ebdf] p-10 md:p-12 hover:bg-[#faf7f2] transition-colors duration-500 reveal group" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="font-serif text-5xl text-[#c9bda4] group-hover:text-[#8a7a5e] transition-colors">0{i + 1}</span>
                <h3 className="font-serif text-3xl text-[#2c2520] mt-6 mb-4">{s.title}</h3>
                <p className="text-[#5c5147] leading-relaxed mb-8">{s.description}</p>
                <div className="flex gap-6 text-xs uppercase tracking-[0.25em] text-[#8a7a5e] border-t border-[#d9cdb4] pt-6">
                  <span>{s.duration}</span>
                  <span>{s.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT BETTY */}
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
              « Le Pilates n'est pas un sport, c'est une discipline qui se vit. Mon rôle est de guider chacun vers une meilleure conscience de soi. »
            </p>
            <Link to="/le-studio" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#3a2f24] border-b border-[#3a2f24] pb-2 hover:gap-5 transition-all">
              En savoir plus <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-24 md:py-32 bg-[#2c2520] text-[#faf7f2] px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal">
            <p className="text-xs tracking-[0.4em] uppercase text-[#a89878] mb-6">Méthode</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Les six principes <em className="italic font-light">fondamentaux</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {principles.map((p, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="font-serif text-xs tracking-[0.4em] text-[#a89878]">0{i + 1}</span>
                <h3 className="font-serif text-3xl mt-4 mb-3">{p.title}</h3>
                <p className="text-[#c9bda4] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STUDIOS */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Sélectionnez votre studio</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] leading-tight">
              Deux adresses, <em className="italic font-light">une même exigence.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {studios.map((s) => (
              <Link key={s.id} to={`/${s.id}`} className="group block reveal">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2c2520]/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-10 text-[#faf7f2]">
                    <p className="text-xs tracking-[0.4em] uppercase text-[#e8e0d0] mb-3">Studio</p>
                    <h3 className="font-serif text-5xl md:text-6xl">{s.name}</h3>
                    <div className="flex items-center gap-2 mt-4 text-sm text-[#e8e0d0]">
                      <MapPin size={14} /> {s.postal}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full border border-[#faf7f2] flex items-center justify-center text-[#faf7f2] transition-all duration-300 group-hover:bg-[#faf7f2] group-hover:text-[#2c2520]">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-24 md:py-32 bg-[#f2ebdf] px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Atmosphère</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520]">
              Un écrin pour <em className="italic font-light">la pratique.</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {galleryImages.slice(0, 8).map((img, i) => (
              <div key={i} className={`overflow-hidden reveal ${i % 5 === 0 ? "md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"}`} style={{ transitionDelay: `${i * 50}ms` }}>
                <img src={img} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1200ms]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 reveal">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Elles en parlent</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520]">
              Témoignages
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((t, i) => (
              <div key={i} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="font-serif text-2xl italic text-[#3a2f24] leading-relaxed">“{t.text}”</p>
                <div className="w-10 h-px bg-[#8a7a5e] mx-auto my-6" />
                <p className="text-xs tracking-[0.3em] uppercase text-[#8a7a5e]">{t.name} — {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 md:py-40 px-6 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${galleryImages[2]})` }} />
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
            <a href={siteInfo.planningUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-10 py-4 bg-[#faf7f2] text-[#2c2520] text-xs uppercase tracking-[0.3em] hover:bg-[#e8e0d0] transition-colors">
              Réserver <ArrowRight size={14} />
            </a>
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 border border-[#faf7f2] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#faf7f2] hover:text-[#2c2520] transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
