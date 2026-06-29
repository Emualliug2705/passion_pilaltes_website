import React from "react";
import { principles } from "../../mock";

const PrinciplesSection = ({ titleSuffix = "fondamentaux", subtitle = "Méthode" }) => {
  return (
    <section className="py-24 md:py-32 bg-[#2c2520] text-[#faf7f2] px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-[#a89878] mb-6">{subtitle}</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight">
            Les six principes <em className="italic font-light">{titleSuffix}</em>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {principles.map((p, i) => (
            <div key={p.title} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="font-serif text-xs tracking-[0.4em] text-[#a89878]">0{i + 1}</span>
              <h3 className="font-serif text-3xl mt-4 mb-3">{p.title}</h3>
              <p className="text-[#c9bda4] leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
