import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Builds the message template fragment that mentions the studio.
 */
const studioFragment = (studio) => {
  if (studio && studio !== "Indifférent") return `au studio de ${studio}`;
  return "dans l'un de vos studios";
};

const signature = (name) => {
  const cleanName = (name || "").trim();
  return cleanName ? `Madame ${cleanName}` : "Madame";
};

const buildDiscoveryMessage = (name, studio) => [
  "Bonjour Madame ADRIEN,",
  "",
  `j'aurais aimé m'inscrire pour un cours de découverte collectifs ou privé ${studioFragment(studio)}. Quelles sont les disponibilités ?`,
  "",
  "Bien à vous,",
  "",
  signature(name)
].join("\n");

const buildInscriptionMessage = (name, studio, courseType) => {
  const courseStr = courseType ? `à un ${courseType}` : "à vos cours";
  return [
    "Bonjour Madame ADRIEN,",
    "",
    `je souhaiterais m'inscrire ${courseStr} ${studioFragment(studio)}. Pourriez-vous m'indiquer les modalités d'inscription ainsi que les créneaux disponibles ?`,
    "",
    "Bien à vous,",
    "",
    signature(name)
  ].join("\n");
};

export const buildTemplate = (requestType, { name, studio, courseType }) => {
  if (requestType === "decouverte") return buildDiscoveryMessage(name, studio);
  if (requestType === "inscription") return buildInscriptionMessage(name, studio, courseType);
  return "";
};

const isTemplatedRequest = (req) => req === "decouverte" || req === "inscription";

/**
 * Custom hook that owns the contact-form state, including the smart message
 * template that auto-fills the user's name, studio and course type. As soon
 * as the user manually edits the message textarea, the auto-fill is disabled.
 */
const useContactForm = ({ defaultStudio, defaultRequest }) => {
  const initialMessage = buildTemplate(defaultRequest, {
    name: "",
    studio: defaultStudio,
    courseType: ""
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    studio: defaultStudio,
    courseType: "",
    requestType: defaultRequest,
    message: initialMessage
  });
  const [messageAutoFilled, setMessageAutoFilled] = useState(
    isTemplatedRequest(defaultRequest)
  );
  const lastAutoMessageRef = useRef(initialMessage);

  // Keep studio in sync if parent default changes (e.g. URL param hydration).
  useEffect(() => {
    if (defaultStudio) {
      setForm((prev) => ({ ...prev, studio: defaultStudio }));
    }
  }, [defaultStudio]);

  // Auto-regenerate the message whenever any input feeding the template
  // changes, as long as the user has not taken over.
  useEffect(() => {
    if (!messageAutoFilled) return;
    if (!isTemplatedRequest(form.requestType)) return;
    const next = buildTemplate(form.requestType, {
      name: form.name,
      studio: form.studio,
      courseType: form.courseType
    });
    if (next === lastAutoMessageRef.current) return;
    lastAutoMessageRef.current = next;
    setForm((prev) => ({ ...prev, message: next }));
  }, [
    form.name,
    form.studio,
    form.courseType,
    form.requestType,
    messageAutoFilled
  ]);

  const onFieldChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onMessageChange = useCallback((e) => {
    const value = e.target.value;
    if (value !== lastAutoMessageRef.current) {
      setMessageAutoFilled(false);
    }
    setForm((prev) => ({ ...prev, message: value }));
  }, []);

  const onRequestTypeChange = useCallback((newType) => {
    setForm((prev) => {
      const next = { ...prev, requestType: newType };
      const templated = isTemplatedRequest(newType);
      const stillAuto = prev.message === lastAutoMessageRef.current;
      const isEmpty = prev.message.trim() === "";

      if (templated && (isEmpty || stillAuto)) {
        const tpl = buildTemplate(newType, {
          name: prev.name,
          studio: prev.studio,
          courseType: prev.courseType
        });
        lastAutoMessageRef.current = tpl;
        setMessageAutoFilled(true);
        next.message = tpl;
      } else if (!templated && stillAuto) {
        next.message = "";
        setMessageAutoFilled(false);
      }
      return next;
    });
  }, []);

  const onCourseTypeChange = useCallback((ct) => {
    setForm((prev) => ({
      ...prev,
      courseType: ct === prev.courseType ? "" : ct
    }));
  }, []);

  const reset = useCallback(() => {
    const blank = buildTemplate(defaultRequest, {
      name: "",
      studio: defaultStudio,
      courseType: ""
    });
    lastAutoMessageRef.current = blank;
    setMessageAutoFilled(isTemplatedRequest(defaultRequest));
    setForm({
      name: "",
      email: "",
      phone: "",
      studio: defaultStudio,
      courseType: "",
      requestType: defaultRequest,
      message: blank
    });
  }, [defaultRequest, defaultStudio]);

  return {
    form,
    messageAutoFilled,
    onFieldChange,
    onMessageChange,
    onRequestTypeChange,
    onCourseTypeChange,
    reset
  };
};

export default useContactForm;
