import React from "react";

const FieldText = ({ label, name, type = "text", value, onChange, required = false }) => (
  <div>
    <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">
      {label}
      {required ? " *" : ""}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
    />
  </div>
);

const StudioSelect = ({ value, onChange }) => (
  <div>
    <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Studio</label>
    <select
      name="studio"
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
    >
      <option value="">Sélectionner</option>
      <option value="Nantes">Nantes</option>
      <option value="La Baule">La Baule</option>
      <option value="Indifférent">Indifférent</option>
    </select>
  </div>
);

const ContactFormFields = ({ form, onFieldChange }) => (
  <>
    <div className="grid md:grid-cols-2 gap-6">
      <FieldText label="Nom" name="name" value={form.name} onChange={onFieldChange} required />
      <FieldText label="Email" name="email" type="email" value={form.email} onChange={onFieldChange} required />
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <FieldText label="Téléphone" name="phone" type="tel" value={form.phone} onChange={onFieldChange} />
      <StudioSelect value={form.studio} onChange={onFieldChange} />
    </div>
  </>
);

export default ContactFormFields;
