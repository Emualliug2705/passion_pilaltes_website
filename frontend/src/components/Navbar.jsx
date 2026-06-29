import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserCircle2 } from "lucide-react";
import { siteInfo } from "../mock";

const NAV_LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/le-studio", label: "Le Studio" },
  { to: "/nantes", label: "Nantes" },
  { to: "/la-baule", label: "La Baule" },
  { to: "/contact", label: "Contact" }
];

const PATH_TO_STUDIO = {
  "/nantes": "Nantes",
  "/la-baule": "La Baule"
};

const studioFromPath = (path) => PATH_TO_STUDIO[path] || "";

const buildDecouverteHref = (studio) => {
  if (!studio) return "/contact";
  return `/contact?studio=${encodeURIComponent(studio)}`;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 30);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const currentStudio = studioFromPath(location.pathname);
  const decouverteHref = buildDecouverteHref(currentStudio);

  const headerClasses = scrolled
    ? "bg-[#faf7f2]/95 backdrop-blur-md shadow-sm py-3"
    : "bg-transparent py-6";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClasses}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-serif text-2xl md:text-[28px] tracking-wide text-[#3a2f24]">
            Passion <span className="italic font-light">Pilates</span>
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#8a7a5e] mt-1">
            Nantes &middot; La Baule
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {NAV_LINKS.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link text-[13px] uppercase tracking-[0.25em] text-[#3a2f24] hover:text-[#7a6a4e] transition-colors ${
                  isActive ? "active text-[#7a6a4e]" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={siteInfo.planningUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] px-5 py-3 bg-[#7a6a4e] text-[#faf7f2] hover:bg-[#3a2f24] transition-colors duration-300"
          >
            <UserCircle2 size={14} />
            Élève
          </a>
          <Link
            to={decouverteHref}
            className="text-[12px] uppercase tracking-[0.25em] px-5 py-3 border border-[#3a2f24] text-[#3a2f24] hover:bg-[#3a2f24] hover:text-[#faf7f2] transition-colors duration-300"
          >
            Cours découverte
          </Link>
        </nav>

        <button
          className="lg:hidden text-[#3a2f24] p-2"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#faf7f2] border-t border-[#e8e0d0] mt-3">
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm uppercase tracking-[0.25em] text-[#3a2f24]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={siteInfo.planningUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 text-sm uppercase tracking-[0.25em] px-6 py-3 bg-[#7a6a4e] text-[#faf7f2]"
            >
              <UserCircle2 size={14} />
              Espace élève
            </a>
            <Link
              to={decouverteHref}
              className="text-sm uppercase tracking-[0.25em] px-6 py-3 border border-[#3a2f24] text-[#3a2f24] text-center"
            >
              Cours découverte
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
