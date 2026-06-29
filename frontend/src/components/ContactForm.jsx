import React, { useState, useEffect, useRef } from "react";
import { Clock, Info } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const buildDiscoveryMessage = (name) => {
  const cleanName = (name || "").trim();
  return [
    "Bonjour Madame ADRIEN,",
    "",
    "j'aurais aimé m'inscrire pour un cours de découverte collectifs ou privé. Quelles sont les disponibilités ?",
    "",
    "Bien à vous,",
    "",
    cleanName ? `Madame ${cleanName}` : "Madame"
  ].join("\n");
};

const ContactForm = ({ defaultStudio = "", defaultRequest = "decouverte" }) => {
  const { toast } = useToast();

  // Whether the message is still the auto-generated template (and therefore
  // should keep syncing with the name field). As soon as the user edits the
  // textarea manually, this becomes false and the auto-fill stops.
  const [messageAutoFilled, setMessageAutoFilled] = useState(defaultRequest === "decouverte");

  const initialMessage = defaultRequest === "decouverte" ? buildDiscoveryMessage("") : "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studio: defaultStudio,
    requestType: defaultRequest,
    message: initialMessage
  });
  const [submitting, setSubmitting] = useState(false);

  // Track last auto-generated message to detect manual edits
  const lastAutoMessageRef = useRef(initialMessage);

  // Keep studio in sync if parent default changes (e.g. URL param hydration)
  useEffect(() => {
    if (defaultStudio) {
      setForm((prev) => ({ ...prev, studio: defaultStudio }));
    }
  }, [defaultStudio]);

  // When the name changes AND the message is still the auto template,
  // regenerate the message so the signature stays in sync.
  useEffect(() => {
    if (messageAutoFilled && form.requestType === "decouverte") {
      const next = buildDiscoveryMessage(form.name);
      lastAutoMessageRef.current = next;
      setForm((prev) => ({ ...prev, message: next }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onMessageChange = (e) => {
    const value = e.target.value;
    // If user edits to anything different from the auto-generated content,
    // disable further auto fill.
    if (value !== lastAutoMessageRef.current) {
      setMessageAutoFilled(false);
    }
    setForm((prev) => ({ ...prev, message: value }));
  };

  const onRequestTypeChange = (newType) => {
    setForm((prev) => {
      const next = { ...prev, requestType: newType };
      if (newType === "decouverte") {
        // Re-enable auto fill only if the message field is empty or was
        // previously auto-filled. Otherwise we keep what the user typed.
        const isEmpty = prev.message.trim() === "";
        const stillAuto = prev.message === lastAutoMessageRef.current;
        if (isEmpty || stillAuto) {
          const tpl = buildDiscoveryMessage(prev.name);
          lastAutoMessageRef.current = tpl;
          setMessageAutoFilled(true);
          next.message = tpl;
        }
      } else if (messageAutoFilled) {
        // Switching away from découverte while still auto-filled → clear
        next.message = "";
        setMessageAutoFilled(false);
      }
      return next;
    });
  };

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
      const blankMsg = defaultRequest === "decouverte" ? buildDiscoveryMessage("") : "";
      lastAutoMessageRef.current = blankMsg;
      setMessageAutoFilled(defaultRequest === "decouverte");
      setForm({
        name: "",
        email: "",
        phone: "",
        studio: defaultStudio,
        requestType: defaultRequest,
        message: blankMsg
      });
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
              onClick={() => onRequestTypeChange(opt.value)}
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
          {isDecouverte && messageAutoFilled && (
            <span className="text-[10px] normal-case tracking-normal text-[#8a7a5e] italic ml-2">
              (modèle pré-rempli — votre nom s&rsquo;ajoute automatiquement à la signature)
            </span>
          )}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={onMessageChange}
          rows={9}
          className="w-full bg-transparent border-b border-[#c9bda4] py-3 text-[#2c2520] focus:outline-none focus:border-[#3a2f24] transition-colors resize-none whitespace-pre-wrap"
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
