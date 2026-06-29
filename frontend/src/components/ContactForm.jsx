import React, { useState } from "react";
import { Clock, Info } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const ContactForm = ({ defaultStudio = "", defaultRequest = "decouverte" }) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studio: defaultStudio,
    requestType: defaultRequest,
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
        description: "Merci, Passion Pilates vous recontactera personnellement dès réception de votre message."
      });
      setForm({ name: "", email: "", phone: "", studio: defaultStudio, requestType: defaultRequest, message: "" });
    }, 900);
  };

  const isDecouverte = form.requestType === "decouverte";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Request type selector */}
      <div>
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-3">Objet de votre demande</label>
        <div className="grid sm:grid-cols-3 gap-2">
          {[
            { value: "decouverte", label: "Cours découverte" },
            { value: "inscription", label: "Inscription" },
            { value: "info", label: "Information" }
          ].map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setForm({ ...form, requestType: opt.value })}
              className={`px-4 py-3 text-xs uppercase tracking-[0.2em] border transition-colors ${
                form.requestType === opt.value
                  ? "bg-[#3a2f24] text-[#faf7f2] border-[#3a2f24]"
                  : "bg-transparent text-[#3a2f24] border-[#c9bda4] hover:border-[#3a2f24]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {isDecouverte && (
          <div className="mt-4 flex items-start gap-3 bg-[#f2ebdf] border border-[#e8dfca] p-4 text-sm text-[#3a2f24]">
            <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#7a6a4e]" />
            <p>
              Merci de réserver votre cours découverte au moins <strong className="font-medium">7 jours à l&rsquo;avance</strong>. Betty ou Mathilde vous recontactera personnellement pour fixer ensemble votre première séance.
            </p>
          </div>
        )}
      </div>

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
            <option value="Indifférent">Indifférent</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">
          Message *{" "}
          {isDecouverte && (
            <span className="text-[10px] normal-case tracking-normal text-[#8a7a5e] italic ml-2">
              (préciser vos antécédents, objectifs et disponibilités)
            </span>
          )}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={5}
          className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors resize-none"
        />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="submit"
          disabled={submitting}
          className="px-10 py-4 bg-[#3a2f24] text-[#faf7f2] text-xs uppercase tracking-[0.3em] hover:bg-[#7a6a4e] transition-colors disabled:opacity-60"
        >
          {submitting ? "Envoi..." : "Envoyer ma demande"}
        </button>
        <p className="text-xs text-[#8a7a5e] flex items-center gap-2">
          <Info size={12} /> Réponse personnalisée sous 48h
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
