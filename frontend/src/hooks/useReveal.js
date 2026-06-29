import { useEffect } from "react";

/**
 * Custom hook that adds a "visible" class to all elements with the
 * "reveal" class when they enter the viewport. Used for scroll-triggered
 * fade-in animations.
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
  }, []);
};

export default useReveal;
