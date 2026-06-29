import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { studios, siteInfo, services } from "../mock";
import ContactForm from "../components/ContactForm";

const StudioPage = ({ studioId }) => {
  const studio = studios.find((s) => s.id === studioId);
  const other = studios.find((s) => s.id !== studioId);

  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, [studioId]);

  if (!studio) return null;

  return (
    <div className="bg-[#faf7f2]">
      {/* HERO */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom" style={{ backgroundImage: `url(${studio.image})` }} />
        <div className="absolute inset-0 bg-[#2c2520]/45" />
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-20">
          <p className="text-xs tracking-[0.5em] uppercase text-[#e8e0d0] mb-4 animate-fade-in-up">Studio</p>
          <h1 className="font-serif text-white text-6xl md:text-8xl lg:text-[120px] leading-none animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
            {studio.name}
          </h1>
          <div className="flex items-center gap-3 mt-6 text-[#e8e0d0] animate-fade-in-up" style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}>
            <MapPin size={16} /> <span className="text-sm">{studio.address} — {studio.postal}</span>
          </div>
        </div>
      </section>

      {/* INFO BLOCK */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 lg:gap-20">
          <div className="md:col-span-1 reveal">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Passion Pilates {studio.name}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] leading-tight">
              Un studio <em className="italic font-light">pensé pour vous.</em>
            </h2>
            <div className="w-16 h-px bg-[#8a7a5e] my-8" />
            <p className="text-[#5c5147] leading-[1.9]">
              Notre studio de {studio.name} vous accueille dans un espace lumineux et apaisé, équipé du matériel Pilates le plus complet : Reformer, Cadillac, Chair, Springboards et tapis professionnels.
            </p>
          </div>

          <div className="md:col-span-2 grid sm:grid-cols-2 gap-8 reveal">
            <div className="border-l border-[#c9bda4] pl-6">
              <div className="flex items-center gap-3 text-[#8a7a5e] mb-3">
                <MapPin size={16} />
                <span className="text-xs uppercase tracking-[0.3em]">Adresse</span>
              </div>
              <p className="text-[#2c2520] leading-relaxed">{studio.address}<br/>{studio.postal}</p>
              <p className="text-sm text-[#7a6a4e] mt-2 italic">{studio.nearby}</p>
            </div>
            <div className="border-l border-[#c9bda4] pl-6">
              <div className="flex items-center gap-3 text-[#8a7a5e] mb-3">
                <Phone size={16} />
                <span className="text-xs uppercase tracking-[0.3em]">Téléphone</span>
              </div>
              <a href={`tel:${studio.phone}`} className="text-[#2c2520] hover:text-[#7a6a4e] transition-colors">{studio.phone}</a>
            </div>
            <div className="border-l border-[#c9bda4] pl-6">
              <div className="flex items-center gap-3 text-[#8a7a5e] mb-3">
                <Mail size={16} />
                <span className="text-xs uppercase tracking-[0.3em]">Email</span>
              </div>
              <a href={`mailto:${studio.email}`} className="text-[#2c2520] hover:text-[#7a6a4e] transition-colors break-all">{studio.email}</a>
            </div>
            <div className="border-l border-[#c9bda4] pl-6">
              <div className="flex items-center gap-3 text-[#8a7a5e] mb-3">
                <Clock size={16} />
                <span className="text-xs uppercase tracking-[0.3em]">Horaires</span>
              </div>
              <ul className="text-sm text-[#2c2520] space-y-1">
                {studio.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-[#7a6a4e]">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES MINI */}
      <section className="py-20 md:py-24 bg-[#f2ebdf] px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="reveal mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-4">Au studio de {studio.name}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2c2520]">Cours proposés</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-[#d9cdb4]">
            {services.map((s, i) => (
              <div key={i} className="bg-[#f2ebdf] p-8 reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <h3 className="font-serif text-2xl text-[#2c2520] mb-3">{s.title}</h3>
                <p className="text-sm text-[#5c5147] leading-relaxed mb-5">{s.description}</p>
                <div className="flex gap-5 text-[11px] uppercase tracking-[0.25em] text-[#8a7a5e]">
                  <span>{s.duration}</span>
                  <span>{s.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center reveal mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Nous contacter</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520]">
              Inscrivez-vous au studio de <em className="italic font-light">{studio.name}</em>
            </h2>
            <p className="text-[#5c5147] mt-6 max-w-xl mx-auto">
              Si vous souhaitez vous inscrire ou obtenir des informations, renseignez les champs ci-dessous. Nous vous répondrons rapidement.
            </p>
          </div>
          <div className="reveal">
            <ContactForm defaultStudio={studio.name} />
          </div>
        </div>
      </section>

      {/* PLANNING + OTHER STUDIO */}
      <section className="py-20 md:py-24 bg-[#2c2520] text-[#faf7f2] px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="text-xs tracking-[0.4em] uppercase text-[#a89878] mb-4">Gérez votre pratique</p>
            <h3 className="font-serif text-3xl md:text-4xl mb-4">Planning Deciplus</h3>
            <p className="text-[#c9bda4] leading-relaxed mb-6">Accédez à votre espace pour réserver, modifier ou annuler vos séances.</p>
            <a href={siteInfo.planningUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-3 border border-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#faf7f2] hover:text-[#2c2520] transition-colors">
              Accéder au planning <ArrowRight size={14} />
            </a>
          </div>
          <div className="reveal md:text-right">
            <p className="text-xs tracking-[0.4em] uppercase text-[#a89878] mb-4">Découvrez aussi</p>
            <h3 className="font-serif text-3xl md:text-4xl mb-4">Studio de {other.name}</h3>
            <p className="text-[#c9bda4] leading-relaxed mb-6">{other.address} — {other.postal}</p>
            <Link to={`/${other.id}`} className="inline-flex items-center gap-3 px-8 py-3 border border-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#faf7f2] hover:text-[#2c2520] transition-colors">
              Visiter <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudioPage;
