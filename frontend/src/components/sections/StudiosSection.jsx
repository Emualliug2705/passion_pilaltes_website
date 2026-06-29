import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { studios } from "../../mock";

const StudiosSection = () => {
  return (
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
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
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
  );
};

export default StudiosSection;
