"use client";

import { motion } from "framer-motion";

const certifications = [
  "蛛･蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ隱榊ｮ・,
  "邨梧ｸ育肇讌ｭ逵∬ｪ榊ｮ・,
  "蜴夂函蜉ｴ蜒咲怐隱榊ｮ・,
  "逕｣讌ｭ蛹ｻ騾｣謳ｺ",
  "ISO 45001",
  "繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け螳滓命讖滄未",
  "EAP隱榊ｮ・,
  "繝・・繧ｿ繝倥Ν繧ｹ險育判",
  "蛛･蠎ｷ蜆ｪ濶ｯ莨∵･ｭ",
  "繧ｹ繝槭・繝医え繧ｧ繝ｫ繝阪せ",
];

export default function MarqueeSection() {
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/[0.04] bg-white/[0.01]">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...certifications, ...certifications].map((item, i) => (
          <span key={i} className="text-white/20 text-sm font-medium tracking-wider flex-shrink-0 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
