import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { siteInfo } from "../mock";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/le-studio", label: "Le Studio" },
  { to: "/nantes", label: "Nantes" },
  { to: "/la-baule", label: "La Baule" },
  { to: "/contact", label: "Contact" }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // setScrolled is stable (from useState); onScroll defined locally
  }, []);

  useEffect(() => {
    setOpen(false);
    // setOpen is stable (from useState)
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#faf7f2]/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-serif text-2xl md:text-[28px] tracking-wide text-[#3a2f24]">
            Passion <span className="italic font-light">Pilates</span>
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-[#8a7a5e] mt-1">
            Nantes · La Baule
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10" aria-label="Navigation principale">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link text-[13px] uppercase tracking-[0.25em] text-[#3a2f24] hover:text-[#7a6a4e] transition-colors ${
                location.pathname === l.to ? "active text-[#7a6a4e]" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={siteInfo.planningUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] uppercase tracking-[0.25em] px-6 py-3 border border-[#3a2f24] text-[#3a2f24] hover:bg-[#3a2f24] hover:text-[#faf7f2] transition-colors duration-300"
          >
            Réserver
          </a>
        </nav>

        <button
          className="lg:hidden text-[#3a2f24] p-2"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#faf7f2] border-t border-[#e8e0d0] mt-3">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
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
              className="text-sm uppercase tracking-[0.25em] px-6 py-3 border border-[#3a2f24] text-[#3a2f24] text-center"
            >
              Réserver
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
