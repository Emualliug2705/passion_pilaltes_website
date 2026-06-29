import React from "react";
import { Info } from "lucide-react";
import { services } from "../mock";
import { useToast } from "../hooks/use-toast";
import useContactForm from "../hooks/useContactForm";
import RequestTypeSelector from "./contact/RequestTypeSelector";
import CourseTypeSelector from "./contact/CourseTypeSelector";
import ContactFormFields from "./contact/ContactFormFields";

const COURSE_TYPES = services.map((s) => s.title);

const MessageHelper = ({ requestType, isInscription }) => {
  const detail = isInscription ? "votre nom, studio et type de cours" : "votre nom et studio";
  if (requestType !== "decouverte" && requestType !== "inscription") return null;
  return (
    <span className="text-[10px] normal-case tracking-normal text-[#8a7a5e] italic ml-2">
      (modèle pré-rempli &mdash; {detail} s&rsquo;ajoutent automatiquement)
    </span>
  );
};

const ContactForm = ({ defaultStudio = "", defaultRequest = "decouverte" }) => {
  const { toast } = useToast();
  const {
    form,
    messageAutoFilled,
    onFieldChange,
    onMessageChange,
    onRequestTypeChange,
    onCourseTypeChange,
    reset
  } = useContactForm({ defaultStudio, defaultRequest });
  const [submitting, setSubmitting] = React.useState(false);

  const isInscription = form.requestType === "inscription";
  const showHelper = messageAutoFilled;

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
      reset();
    }, 900);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <RequestTypeSelector value={form.requestType} onChange={onRequestTypeChange} />

      <ContactFormFields form={form} onFieldChange={onFieldChange} />

      {isInscription && (
        <CourseTypeSelector
          value={form.courseType}
          options={COURSE_TYPES}
          onChange={onCourseTypeChange}
        />
      )}

      <div>
        <label className="block text-[11px] uppercase tracking-[0.25em] text-[#7a6a4e] mb-2">
          Message *{" "}
          {showHelper && <MessageHelper requestType={form.requestType} isInscription={isInscription} />}
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
