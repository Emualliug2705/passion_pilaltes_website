import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Award, Star, ArrowRight } from "lucide-react";
import { siteInfo, studios } from "../mock";

const Footer = () => {
  return (
    <footer className="bg-[#2c2520] text-[#e8e0d0] pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* TOP: brand + nav + contact */}
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-[#4a3f33]">
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl mb-2">
              Passion <span className="italic">Pilates</span>
            </h3>
            <p className="text-xs tracking-[0.3em] uppercase text-[#a89878] mb-6">
              par Betty &amp; Mathilde ADRIEN
            </p>
            <p className="text-sm text-[#c9bda4] leading-relaxed mb-5">
              {siteInfo.description}
            </p>
            <div className="flex items-start gap-2 text-xs text-[#a89878]">
              <Award size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                Diplômées de l&rsquo;École de Formation Pilates de Nantes &middot; Studio agréé{" "}
                <a
                  href={siteInfo.certification.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-white"
                >
                  FPMP
                </a>
              </span>
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
              <li>
                <a
                  href={siteInfo.planningUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Espace élève (Deciplus)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-[#a89878] mb-5">Contact</h4>
            <ul className="space-y-4 text-sm text-[#c9bda4]">
              <li className="flex items-center gap-3">
                <Phone size={14} className="flex-shrink-0" />
                <a href={`tel:${siteInfo.phone}`} className="hover:text-white transition-colors">{siteInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="flex-shrink-0" />
                <a href={`mailto:${siteInfo.email}`} className="hover:text-white transition-colors break-all">{siteInfo.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* ADDRESSES: only addresses + dedicated CTA per studio */}
        <div className="grid md:grid-cols-2 gap-10 py-10 border-b border-[#4a3f33]">
          {studios.map((s) => (
            <div key={s.id}>
              <h4 className="text-xs uppercase tracking-[0.3em] text-[#a89878] mb-4">
                Studio {s.name}
              </h4>
              <div className="flex items-start gap-3 text-sm text-[#c9bda4] mb-5">
                <MapPin size={14} className="mt-1 flex-shrink-0" />
                <div>
                  <p>{s.address}</p>
                  <p>{s.postal}</p>
                  <p className="text-xs text-[#8a7a5e] italic mt-1">{s.nearby}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  to={`/contact?studio=${encodeURIComponent(s.name)}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] border border-[#a89878] text-[#e8e0d0] px-4 py-2 hover:bg-[#a89878] hover:text-[#2c2520] transition-colors"
                >
                  Cours découverte <ArrowRight size={12} />
                </Link>
                <a
                  href={s.googleReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#a89878] hover:text-white transition-colors"
                >
                  <Star size={12} className="fill-current" />
                  Avis Google ({s.googleRating}/5)
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#a89878]">
          <p>&copy; {new Date().getFullYear()} Passion Pilates &mdash; Tous droits réservés</p>
          <p className="tracking-widest uppercase">Méthode Pilates authentique</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
