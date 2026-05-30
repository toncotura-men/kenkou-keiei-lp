"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">
                Health<span className="gradient-text-blue">Force</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              蠕捺･ｭ蜩｡縺ｮ蛛･蠎ｷ繧呈姶逡･逧・↓謗ｨ騾ｲ縺励∽ｺｺ縺ｨ邨・ｹ斐・繝昴ユ繝ｳ繧ｷ繝｣繝ｫ繧呈怙螟ｧ蛹悶☆繧句▼蠎ｷ邨悟霧繝代・繝医リ繝ｼ縲・            </p>
            <div className="flex gap-3 mt-6">
              {["X", "LinkedIn", "note"].map((social) => (
                <div
                  key={social}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-colors cursor-pointer"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              繧ｵ繝ｼ繝薙せ
            </h4>
            <ul className="space-y-3">
              {[
                "蛛･蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ隱榊ｮ壽髪謠ｴ",
                "繧ｦ繧ｧ繝ｫ繝阪せ繝励Ο繧ｰ繝ｩ繝險ｭ險・,
                "蛛･蠎ｷ繝・・繧ｿ繧｢繝翫Μ繝・ぅ繧ｯ繧ｹ",
                "繝｡繝ｳ繧ｿ繝ｫ繝倥Ν繧ｹ蟇ｾ遲・,
                "逕｣讌ｭ菫晏▼繧｢繧ｦ繝医た繝ｼ繧ｷ繝ｳ繧ｰ",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              莨夂､ｾ諠・ｱ
            </h4>
            <ul className="space-y-3">
              {["莨夂､ｾ讎りｦ・, "謗｡逕ｨ諠・ｱ", "繝九Η繝ｼ繧ｹ", "繝悶Ο繧ｰ", "繝励Λ繧､繝舌す繝ｼ繝昴Μ繧ｷ繝ｼ"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            ﾂｩ 2025 HealthForce Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
            蜈ｨ繧ｷ繧ｹ繝・Β豁｣蟶ｸ遞ｼ蜒堺ｸｭ
          </div>
        </div>
      </div>
    </footer>
  );
}
