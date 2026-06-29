import React from "react";
import { galleryImages, testimonials } from "../../mock";

export const GallerySection = () => {
  return (
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
            <div
              key={img}
              className={`overflow-hidden reveal ${
                i % 5 === 0 ? "md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1200ms]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 reveal">
          <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-6">Elles en parlent</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2c2520]">Témoignages</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div key={t.name} className="reveal text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <p className="font-serif text-2xl italic text-[#3a2f24] leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="w-10 h-px bg-[#8a7a5e] mx-auto my-6" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#8a7a5e]">
                {t.name} &mdash; {t.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
