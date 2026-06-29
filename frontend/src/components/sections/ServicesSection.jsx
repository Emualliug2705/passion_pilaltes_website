import React from "react";
import { services } from "../../mock";

const ServicesSection = () => {
  return (
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
            <div
              key={s.title}
              className="bg-[#f2ebdf] p-10 md:p-12 hover:bg-[#faf7f2] transition-colors duration-500 reveal group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="font-serif text-5xl text-[#c9bda4] group-hover:text-[#8a7a5e] transition-colors">
                0{i + 1}
              </span>
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
  );
};

export default ServicesSection;
