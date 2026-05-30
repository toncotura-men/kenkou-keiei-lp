"use client";
import { motion } from "framer-motion";
const steps = [
  { num: "01", title: "分析・診断", icon: "\u{1F4CB}", desc: "現状の健康データを多角的に分析し、課題を明確化します。", items: ["健康データ分析","ストレスチェック精査","生活習慣リスク評価"] },
  { num: "02", title: "戦略・ロードマップ", icon: "\u{1F5FA}", desc: "分析結果をもとに、実行可能な健康経営戦略を策定します。", items: ["KPI・目標設定","優先施策の絞り込み","予算計画"] },
  { num: "03", title: "施策・プログラム実施", icon: "\u{1F680}", desc: "カスタマイズされたウェルネスプログラムを展開します。", items: ["ウェルネスプログラム","健康イベント","オンライン研修"] },
  { num: "04", title: "測定・改善", icon: "\u{1F4C8}", desc: "効果を定量的に測定し、継続的な改善を推進します。", items: ["ROIレポート","改善提案","上位認定へのアップグレード"] },
];
export default function ScrollFeature() {
  return (
    <section id="cases" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-sm text-white/40 tracking-widest uppercase mb-4">Process</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">支援プロセス</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">4つのステップで健康経営を実現</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-2xl p-6 border border-white/[0.06] relative overflow-hidden">
              <div className="absolute top-4 right-4 text-5xl font-black text-white/[0.04]">{step.num}</div>
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-white/40 text-sm mb-4 leading-relaxed">{step.desc}</p>
              <ul className="space-y-1.5">
                {step.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="w-1 h-1 rounded-full bg-blue-400/50 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}