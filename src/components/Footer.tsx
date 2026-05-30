"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">Health<span className="gradient-text-blue">Force</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">Strategic employee health promotion partner maximizing human and organizational potential.</p>
            <div className="flex gap-3 mt-6">
              {["X", "LinkedIn", "note"].map((social) => (
                <div key={social} className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-colors cursor-pointer">{social}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-3">
              {["Certification Support", "Wellness Programs", "Health Analytics", "Mental Health", "Occupational Health"].map((item) => (
                <li key={item}><span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {["About", "Careers", "News", "Blog", "Privacy Policy"].map((item) => (
                <li key={item}><span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">&#169; 2025 HealthForce Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
}