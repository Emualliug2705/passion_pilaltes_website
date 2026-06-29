import React, { useState } from "react";
import { useToast } from "../hooks/use-toast";

const ContactForm = ({ defaultStudio = "" }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studio: defaultStudio,
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Champs manquants", description: "Merci de remplir les champs obligatoires." });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Message envoyé",
        description: "Merci, Passion Pilates prendra contact avec vous dès réception de ce message."
      });
      setForm({ name: "", email: "", phone: "", studio: defaultStudio, message: "" });
    }, 900);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Nom *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Studio</label>
          <select
            name="studio"
            value={form.studio}
            onChange={onChange}
            className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors"
          >
            <option value="">Sélectionner</option>
            <option value="Nantes">Nantes</option>
            <option value="La Baule">La Baule</option>
            <option value="Les deux">Indifférent</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">Message *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={5}
          className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-4 px-10 py-4 bg-[#3a2f24] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#7a6a4e] transition-colors disabled:opacity-60"
      >
        {submitting ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
};

export default ContactForm;
