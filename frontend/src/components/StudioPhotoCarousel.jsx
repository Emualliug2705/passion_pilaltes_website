import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * StudioPhotoCarousel
 * A user-controllable, swipeable photo carousel for a studio.
 * - photos: array of image URLs
 * - studioName: used as alt text
 */
const StudioPhotoCarousel = ({ photos = [], studioName = "Studio" }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  const scrollTo = useCallback((i) => {
    if (emblaApi) emblaApi.scrollTo(i);
  }, [emblaApi]);

  const onSelect = useCallback((api) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, [setSelectedIndex, setCanPrev, setCanNext]);

  useEffect(() => {
    if (!emblaApi) return undefined;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!photos.length) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {photos.map((src, i) => (
            <div key={src} className="relative flex-[0_0_100%] md:flex-[0_0_75%] lg:flex-[0_0_60%] pr-3 md:pr-5">
              <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-[#e8e0d0]">
                <img
                  src={src}
                  alt={`${studioName} — photo ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / next controls */}
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canPrev}
        aria-label="Photo précédente"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#faf7f2]/90 backdrop-blur flex items-center justify-center text-[#3a2f24] hover:bg-[#faf7f2] disabled:opacity-40 transition-opacity"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canNext}
        aria-label="Photo suivante"
        className="absolute right-3 md:right-[26%] lg:right-[41%] top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#faf7f2]/90 backdrop-blur flex items-center justify-center text-[#3a2f24] hover:bg-[#faf7f2] disabled:opacity-40 transition-opacity"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots — keyed by the photo URL they target */}
      <div className="flex justify-center gap-2 mt-6">
        {photos.map((src, i) => (
          <button
            key={`dot-${src}`}
            type="button"
            onClick={() => scrollTo(i)}
            aria-label={`Aller à la photo ${i + 1}`}
            className={`h-1.5 transition-all duration-300 ${
              i === selectedIndex ? "w-8 bg-[#3a2f24]" : "w-1.5 bg-[#c9bda4] hover:bg-[#8a7a5e]"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-center mt-4 text-[11px] uppercase tracking-[0.3em] text-[#8a7a5e]">
        {String(selectedIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
      </p>
    </div>
  );
};

export default StudioPhotoCarousel;
