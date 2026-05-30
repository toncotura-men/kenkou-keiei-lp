"use client";
import { motion } from "framer-motion";

const companies = [
  "株式会社グリーン製造", "テクノロジー東京", "フューチャーワークス株式会社",
  "メディカルホールディングス", "スマートオフィス", "ヘルスケアパートナーズ",
  "未来建設株式会社", "デジタルフォース", "グローバルトレード",
  "イノベーションラボ", "ライフスタイル東京", "プレミアムケア株式会社",
];

const tripled = [...companies, ...companies, ...companies];

export default function MarqueeSection() {
  return (
    <section className="py-14 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em]">
          全国 500 社以上の企業に導入されています
        </p>
      </div>
      <div className="relative flex overflow-hidden select-none">
        <motion.div
          className="flex gap-14 flex-shrink-0 pr-14"
          animate={{ x: [0, "-33.333%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {tripled.map((name, i) => (
            <div key={i} className="inline-flex items-center gap-3 flex-shrink-0">
              <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-gray-400 font-semibold text-sm whitespace-nowrap">{name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}