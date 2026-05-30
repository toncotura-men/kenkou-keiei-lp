"use client";
import { motion } from "framer-motion";
const stats = [
  { value: "500+", label: "支援企業数", sub: "中小企業から上場企業まで" },
  { value: "98%", label: "認定取得率", sub: "業界平均の2倍" },
  { value: "32%", label: "離職率改善", sub: "支援企業平均" },
  { value: "3.2x", label: "生産性向上", sub: "平均ROI" },
];
const feats = [
  { icon: "\u{1F52C}", title: "エビデンスベース", desc: "学術論文・政府データに基づく科学的アプローチで施策を設計します。" },
  { icon: "\u{1F91D}", title: "継続サポート", desc: "認定取得後も継続的な改善サイクルで組織の健康経営を底上げします。" },
  { icon: "\u{1F3ED}", title: "業種特化の知見", desc: "製造・IT・小売・医療など業種ごとの課題に対応した支援を提供します。" },
  { icon: "\u{1F4BB}", title: "デジタル×人間", desc: "テクノロジーと人的サポートを組み合わせた最適なソリューションを届けます。" },
];
export default function ResultsSection() {
  return (
    <section id="results" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-sm text-white/40 tracking-widest uppercase mb-4">Results</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">実績・数字で見る成果</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">500社以上の支援実績が証明する、確かな効果</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border border-white/[0.06]">
              <div className="text-4xl font-bold gradient-text-blue mb-2">{s.value}</div>
              <div className="text-white font-medium text-sm mb-1">{s.label}</div>
              <div className="text-white/40 text-xs">{s.sub}</div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feats.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/[0.06] flex gap-4">
              <div className="text-3xl shrink-0">{f.icon}</div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}