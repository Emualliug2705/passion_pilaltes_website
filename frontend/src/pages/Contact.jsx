import React, { useEffect } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { studios, siteInfo, galleryImages } from "../mock";
import ContactForm from "../components/ContactForm";
import useReveal from "../hooks/useReveal";

const ContactHero = () => (
  <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
    <div className="absolute inset-0 bg-cover bg-center animate-slow-zoom" style={{ backgroundImage: `url(${galleryImages[7]})` }} />
    <div className="absolute inset-0 bg-[#2c2520]/55" />
    <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-16">
      <p className="text-xs tracking-[0.5em] uppercase text-[#e8e0d0] mb-4">Prenez contact</p>
      <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-[96px] leading-none">
        <em className="italic font-light">Contact</em>
      </h1>
    </div>
  </section>
);

const ContactDetails = () => (
  <div className="lg:col-span-2 reveal">
    <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Cours découverte &middot; Information</p>
    <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520] leading-tight">
      Écrivez-nous, nous <em className="italic font-light">vous recontactons.</em>
    </h2>
    <div className="w-16 h-px bg-[#8a7a5e] my-8" />
    <p className="text-[#5c5147] leading-[1.9] mb-6">
      Pour toute demande de <strong className="font-medium text-[#3a2f24]">cours découverte</strong>, d&rsquo;inscription ou d&rsquo;information, n&rsquo;hésitez pas à nous contacter via le formulaire ci-contre.
    </p>
    <p className="text-[#5c5147] leading-[1.9] mb-10">
      Pour un premier cours, merci de nous solliciter au moins <strong className="font-medium text-[#3a2f24]">7 jours à l&rsquo;avance</strong>. Betty ou Mathilde vous recontactera personnellement pour échanger sur vos attentes et fixer votre première séance.
    </p>

    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Phone size={18} className="text-[#8a7a5e] mt-1" />
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8a7a5e] mb-1">Téléphone</p>
          <a href={`tel:${siteInfo.phone}`} className="text-[#2c2520] hover:text-[#7a6a4e] transition-colors">{siteInfo.phone}</a>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Mail size={18} className="text-[#8a7a5e] mt-1" />
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#8a7a5e] mb-1">Email</p>
          <a href={`mailto:${siteInfo.email}`} className="text-[#2c2520] hover:text-[#7a6a4e] transition-colors break-all">{siteInfo.email}</a>
        </div>
      </div>
      {studios.map((s) => (
        <div key={s.id} className="flex items-start gap-4">
          <MapPin size={18} className="text-[#8a7a5e] mt-1" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#8a7a5e] mb-1">Studio {s.name}</p>
            <p className="text-[#2c2520]">{s.address}<br/>{s.postal}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Contact = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useReveal();

  return (
    <div className="bg-[#faf7f2]">
      <ContactHero />
      <section className="py-24 md:py-32 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 lg:gap-20">
          <ContactDetails />
          <div className="lg:col-span-3 reveal">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
