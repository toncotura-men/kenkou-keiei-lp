"use client";

import { motion } from "framer-motion";

const items = [
  "Health Management Certification",
  "METI Certified",
  "MHLW Certified",
  "Occupational Physician",
  "ISO 45001",
  "Stress Check Implementer",
  "EAP Certified",
  "Health Data Plan",
  "Healthy Excellence Award",
  "Smart Wellness",
];

export default function MarqueeSection() {
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/[0.04] bg-white/[0.01]">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />
      <motion.div className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white/20 text-sm font-medium tracking-wider flex-shrink-0 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}