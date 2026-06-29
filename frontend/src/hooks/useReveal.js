import { useEffect } from "react";

/**
 * Custom hook that adds a "visible" class to all elements with the
 * "reveal" class when they enter the viewport. Used for scroll-triggered
 * fade-in animations. The observer runs once on mount and watches all
 * matching elements currently in the DOM.
 */
const useReveal = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // Intentionally empty — observer must only initialize once per mount.
    // The DOM elements, observer instance, and local callback are scoped here
    // and recreated on every mount; no external value needs to be tracked.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useReveal;
