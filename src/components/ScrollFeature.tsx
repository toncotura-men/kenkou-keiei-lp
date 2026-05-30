"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    tag: "データ活用",
    title: "健康データを、\n経営の武器に変える",
    desc: "健診結果・ストレスチェック・勤怠情報を一元管理し、独自のアルゴリズムで組織の健康リスクを可視化。役員会議で使えるレポートを自動生成します。",
    points: ["リアルタイムダッシュボード", "部署別リスク分析", "ROI試算レポート"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop",
    alt: "データ分析ダッシュボード",
    reverse: false,
  },
  {
    tag: "専門家サポート",
    title: "全国トップクラスの\n専門家チームが伴走",
    desc: "産業医・保健師・心理士・管理栄養士など多職種の専門家が連携。従業員一人ひとりに寄り添ったきめ細かなサポートを提供します。",
    points: ["全国200名以上の専門家ネットワーク", "業界特化の産業医マッチング", "24時間相談窓口"],
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop",
    alt: "専門家チームによるサポート",
    reverse: true,
  },
  {
    tag: "継続的改善",
    title: "PDCAで回す、\n持続可能な健康経営",
    desc: "単発の施策ではなく、計画・実施・評価・改善のサイクルを確立。毎月の進捗レビューと四半期ごとの戦略見直しで、継続的に成果を高めます。",
    points: ["月次KPIモニタリング", "経営層向け四半期報告", "ベンチマーク比較分析"],
    img: "https://images.unsplash.com/photo-1531498860502-7c67cf519b9e?w=800&q=80&auto=format&fit=crop",
    alt: "チームミーティングでのPDCA",
    reverse: false,
  },
];

function FeatureBlock({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index > 0 ? "pt-20 border-t border-gray-100" : ""}`}>
      <motion.div
        initial={{ opacity: 0, x: feature.reverse ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={feature.reverse ? "lg:order-2" : ""}
      >
        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold mb-5">
          {feature.tag}
        </span>
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-5 leading-snug whitespace-pre-line">
          {feature.title}
        </h3>
        <p className="text-gray-500 leading-relaxed mb-8">{feature.desc}</p>
        <ul className="space-y-3">
          {feature.points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {p}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: feature.reverse ? -40 : 40, scale: 0.97 }}
        animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className={`relative ${feature.reverse ? "lg:order-1" : ""}`}
      >
        <div className={`absolute inset-0 rounded-3xl ${feature.reverse ? "bg-amber-100" : "bg-emerald-100"} translate-x-4 translate-y-4`} />
        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
          <Image src={feature.img} alt={feature.alt} fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  );
}

export default function ScrollFeature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            HealthForceが選ばれる3つの理由
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            他社との圧倒的な差別化ポイントをご紹介します
          </p>
        </motion.div>

        <div className="space-y-20">
          {features.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}