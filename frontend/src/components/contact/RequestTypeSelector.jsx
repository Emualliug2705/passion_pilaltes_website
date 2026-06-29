import React from "react";
import { Clock } from "lucide-react";

const REQUEST_OPTIONS = [
  { value: "decouverte", label: "Cours découverte" },
  { value: "inscription", label: "Inscription" },
  { value: "info", label: "Information" }
];

const RequestTypeSelector = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-3">
        Objet de votre demande
      </label>
      <div className="grid sm:grid-cols-3 gap-2">
        {REQUEST_OPTIONS.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`px-4 py-3 text-xs uppercase tracking-[0.2em] border transition-colors ${
                isActive
                  ? "bg-[#3a2f24] text-[#faf7f2] border-[#3a2f24]"
                  : "bg-transparent text-[#3a2f24] border-[#c9bda4] hover:border-[#3a2f24]"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {value === "decouverte" && (
        <div className="mt-4 flex items-start gap-3 bg-[#f2ebdf] border border-[#e8dfca] p-4 text-sm text-[#3a2f24]">
          <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#7a6a4e]" />
          <p>
            Merci de réserver votre cours découverte au moins <strong className="font-medium">7 jours à l&rsquo;avance</strong>. Betty ou Mathilde vous recontactera personnellement pour fixer ensemble votre première séance.
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestTypeSelector;
