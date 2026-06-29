import React from "react";
import { Star, ExternalLink } from "lucide-react";

/**
 * GoogleReviewsSection
 * Displays mock Google reviews for a studio with a link to the real Google page.
 * Replace the `reviews` prop with real Google Places API data when available.
 */
const GoogleReviewsSection = ({
  studioName,
  rating,
  reviewCount,
  reviews = [],
  googleReviewsUrl
}) => {
  return (
    <section className="py-24 md:py-32 px-6 md:px-10 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#8a7a5e] mb-4">Avis Google</p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#2c2520] leading-tight">
              Ils en parlent &mdash; <em className="italic font-light">{studioName}</em>
            </h2>
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1 text-[#e0a800]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i <= Math.round(rating) ? "fill-[#e0a800]" : "fill-[#e8e0d0] text-[#e8e0d0]"}
                  />
                ))}
              </div>
              <span className="font-serif text-2xl text-[#3a2f24]">{rating.toFixed(1)}</span>
              <span className="text-sm text-[#7a6a4e]">/ 5 &middot; {reviewCount} avis</span>
            </div>
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] px-6 py-3 border border-[#3a2f24] text-[#3a2f24] hover:bg-[#3a2f24] hover:text-[#faf7f2] transition-colors"
          >
            Voir sur Google <ExternalLink size={12} />
          </a>
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
          {reviews.map((r) => (
            <article key={`${r.author}-${r.date}`} className="bg-white border border-[#e8e0d0] p-6 flex flex-col">
              <div className="flex items-center gap-1 text-[#e0a800] mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i <= r.rating ? "fill-[#e0a800]" : "fill-[#e8e0d0] text-[#e8e0d0]"}
                  />
                ))}
              </div>
              <p className="text-sm text-[#3a2f24] leading-relaxed mb-5 flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between pt-4 border-t border-[#f0e8d6]">
                <div>
                  <p className="text-sm font-medium text-[#2c2520]">{r.author}</p>
                  <p className="text-xs text-[#8a7a5e]">{r.date}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] flex items-center justify-center text-white text-[10px] font-bold">
                  G
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
