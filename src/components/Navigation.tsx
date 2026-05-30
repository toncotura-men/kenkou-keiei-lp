"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#services", label: "サービス" },
  { href: "#results", label: "導入実績" },
  { href: "#testimonials", label: "お客様の声" },
  { href: "#pricing", label: "料金" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              Health<span className="text-emerald-600">Force</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0120-XXX-XXX" className="text-sm text-gray-500 font-medium">
              0120-XXX-XXX
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-full font-semibold text-sm hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
            >
              無料相談はこちら
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-600 rounded-lg"
            aria-label="メニュー"
          >
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-[5px]" : "mb-1.5"}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : "mb-1.5"}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-2 text-gray-700 text-sm font-medium border-b border-gray-50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="block mt-4 px-5 py-3 bg-emerald-600 text-white rounded-full font-semibold text-sm text-center"
              >
                無料相談はこちら
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}