import React from "react";

const CourseTypeSelector = ({ value, options, onChange }) => {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-3">
        Type de cours souhaité
      </label>
      <div className="grid sm:grid-cols-3 gap-2">
        {options.map((ct) => {
          const isActive = value === ct;
          return (
            <button
              type="button"
              key={ct}
              onClick={() => onChange(ct)}
              className={`px-3 py-3 text-xs uppercase tracking-[0.2em] border transition-colors ${
                isActive
                  ? "bg-[#7a6a4e] text-[#faf7f2] border-[#7a6a4e]"
                  : "bg-transparent text-[#3a2f24] border-[#c9bda4] hover:border-[#3a2f24]"
              }`}
            >
              {ct}
            </button>
          );
        })}
      </div>
      <p className="text-[11px] text-[#8a7a5e] italic mt-2">
        Optionnel &mdash; précisera automatiquement votre message.
      </p>
    </div>
  );
};

export default CourseTypeSelector;
