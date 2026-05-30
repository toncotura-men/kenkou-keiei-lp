"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
  { label: "Service", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 z-[100]"
        style={{ width: progressWidth }}
      />
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`px-6 md:px-12 py-4 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/10" : "bg-transparent"}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">Health<span className="gradient-text-blue">Force</span></span>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => handleNavClick(item.href)} className="text-sm text-white/70 hover:text-white transition-colors">
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="hidden md:flex">
              <button onClick={() => handleNavClick("#contact")} className="px-5 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-400 text-white rounded-full transition-all">
                Free Consultation
              </button>
            </div>
            <button className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px]" onClick={() => setMenuOpen(!menuOpen)}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block h-[1.5px] bg-white w-full origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block h-[1.5px] bg-white w-full" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block h-[1.5px] bg-white w-full origin-center" />
            </button>
          </div>
        </div>
        <motion.div initial={false} animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }} className="overflow-hidden bg-black/95 backdrop-blur-2xl border-b border-white/10">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => handleNavClick(item.href)} className="text-left text-white/80 hover:text-white py-2 border-b border-white/5 text-lg">
                {item.label}
              </button>
            ))}
            <button onClick={() => handleNavClick("#contact")} className="mt-2 px-5 py-3 text-sm font-medium bg-blue-500 text-white rounded-full">Free Consultation</button>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}