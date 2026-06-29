import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { siteInfo, studios } from "../mock";

const Footer = () => {
  return (
    <footer className="bg-[#2c2520] text-[#e8e0d0] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-[#4a3f33]">
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl mb-2">
              Passion <span className="italic">Pilates</span>
            </h3>
            <p className="text-xs tracking-[0.3em] uppercase text-[#a89878] mb-6">
              par {siteInfo.owner}
            </p>
            <p className="text-sm text-[#c9bda4] leading-relaxed">
              {siteInfo.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a href={siteInfo.instagram} className="w-9 h-9 border border-[#4a3f33] flex items-center justify-center hover:bg-[#4a3f33] transition-colors">
                <Instagram size={16} />
              </a>
              <a href={siteInfo.facebook} className="w-9 h-9 border border-[#4a3f33] flex items-center justify-center hover:bg-[#4a3f33] transition-colors">
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-[#a89878] mb-5">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/le-studio" className="hover:text-white transition-colors">Le Studio</Link></li>
              <li><Link to="/nantes" className="hover:text-white transition-colors">Studio Nantes</Link></li>
              <li><Link to="/la-baule" className="hover:text-white transition-colors">Studio La Baule</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {studios.map((s) => (
            <div key={s.id}>
              <h4 className="text-xs uppercase tracking-[0.3em] text-[#a89878] mb-5">{s.name}</h4>
              <ul className="space-y-3 text-sm text-[#c9bda4]">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="mt-1 flex-shrink-0" />
                  <span>{s.address}<br/>{s.postal}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} />
                  <a href={`tel:${s.phone}`} className="hover:text-white transition-colors">{s.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} />
                  <a href={`mailto:${s.email}`} className="hover:text-white transition-colors break-all">{s.email}</a>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#a89878]">
          <p>© {new Date().getFullYear()} Passion Pilates — Tous droits réservés</p>
          <p className="tracking-widest uppercase">Méthode Pilates authentique</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
