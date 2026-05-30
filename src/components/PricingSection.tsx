"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const plans = [
  {
    name: "ライト",
    nameEn: "Light",
    price: "98,000",
    unit: "月",
    desc: "健康経営をはじめたい中小企業向けの入門プラン",
    highlight: false,
    features: [
      "健康経営戦略策定支援",
      "ストレスチェック実施支援",
      "年2回の産業医面談",
      "月次レポート提供",
      "専任コンサルタント（1名）",
      "メール・電話サポート",
    ],
    cta: "相談する",
    badge: null,
  },
  {
    name: "スタンダード",
    nameEn: "Standard",
    price: "198,000",
    unit: "月",
    desc: "本格的な健康経営推進を目指す成長企業向けプラン",
    highlight: true,
    features: [
      "ライトプランの全機能",
      "健康経営優良法人認定サポート",
      "月1回の産業医面談",
      "保健師による面談支援",
      "データ分析ダッシュボード",
      "専任コンサルタント（2名）",
      "優先サポート対応",
    ],
    cta: "無料で試す",
    badge: "最も人気",
  },
  {
    name: "プレミアム",
    nameEn: "Premium",
    price: "398,000",
    unit: "月",
    desc: "大企業・グループ企業向けの包括的なサポートプラン",
    highlight: false,
    features: [
      "スタンダードプランの全機能",
      "専属産業医・保健師の常駐支援",
      "多拠点・グループ対応",
      "役員向けエグゼクティブサポート",
      "カスタムレポーティング",
      "専任チーム（5名体制）",
      "24時間緊急対応",
    ],
    cta: "相談する",
    badge: "大企業向け",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="pricing" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Pricing
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            シンプルな料金体系
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            すべてのプランに初期費用なし。まずは1ヶ月お試しください。
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className={`relative rounded-2xl p-8 flex flex-col transition-all ${
                plan.highlight
                  ? "bg-emerald-600 shadow-2xl shadow-emerald-200 scale-105 ring-4 ring-emerald-200"
                  : "bg-white border border-gray-200 hover:border-emerald-200 hover:shadow-lg"
              }`}
            >
              {plan.badge && (
                <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                  plan.highlight ? "bg-amber-400 text-amber-900" : "bg-emerald-100 text-emerald-700"
                }`}>
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlight ? "text-emerald-200" : "text-gray-400"}`}>
                  {plan.nameEn}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm leading-relaxed ${plan.highlight ? "text-emerald-100" : "text-gray-500"}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-8">
                <div className={`flex items-end gap-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  <span className="text-sm font-medium opacity-70">¥</span>
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className="text-sm font-medium opacity-70 mb-1">/ {plan.unit}</span>
                </div>
                <p className={`text-xs mt-1 ${plan.highlight ? "text-emerald-200" : "text-gray-400"}`}>
                  税別・初期費用なし
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-amber-300" : "text-emerald-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={plan.highlight ? "text-emerald-50" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3.5 rounded-full font-bold text-sm transition-all ${
                  plan.highlight
                    ? "bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg"
                    : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-gray-400 mt-10"
        >
          従業員数・企業規模に応じたカスタムプランもご用意しています。
          <a href="#contact" className="text-emerald-600 font-medium underline underline-offset-2 ml-1">お気軽にご相談ください</a>
        </motion.p>
      </div>
    </section>
  );
}