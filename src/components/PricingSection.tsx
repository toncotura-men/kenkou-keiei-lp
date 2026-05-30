"use client";
import { motion } from "framer-motion";
const plans = [
  { name: "スターター", price: "98,000", unit: "円/月", popular: false, desc: "健康経営を始めたい中小企業向け",
    features: ["健康経営優良法人認定支援","健康診断データ分析","ストレスチェック支援","月次レポート","メールサポート"] },
  { name: "スタンダード", price: "198,000", unit: "円/月", popular: true, desc: "本格的な健康経営推進を目指す企業向け",
    features: ["スターター全機能","ウェルネスプログラム設計","産業医・保健師連携","デジタルツール導入支援","週次ミーティング","優先サポート"] },
  { name: "エンタープライズ", price: "要相談", unit: "", popular: false, desc: "大企業・グループ企業向けカスタムプラン",
    features: ["スタンダード全機能","グループ全社展開支援","専任コンサルタント","カスタムダッシュボード","24時間サポート","成果保証オプション"] },
];
export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-sm text-white/40 tracking-widest uppercase mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">料金プラン</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">企業規模・目的に合わせて選べる3つのプラン</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative glass rounded-2xl p-6 flex flex-col border ${plan.popular ? "border-blue-500/40" : "border-white/[0.06]"}`}>
              {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white bg-blue-500 px-4 py-1 rounded-full">一番人気</div>}
              <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
              <p className="text-white/40 text-sm mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className={`text-4xl font-black ${plan.popular ? "gradient-text-blue" : "text-white"}`}>{plan.price}</span>
                <span className="text-white/40 ml-1 text-sm">{plan.unit}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                    <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? "bg-blue-500 hover:bg-blue-400 text-white" : "border border-white/20 text-white/70 hover:border-white/40 hover:text-white"}`}>
                相談する
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}