"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "導入から1年でストレス関連の休職者が半減しました。データに基づいた提案が経営陣にも響き、健康経営を全社的に推進できています。欠勤率は前年比42%改善という驚きの結果です。",
    name: "田中 誠一",
    role: "人事部長",
    company: "大手製造業（従業員数 3,200名）",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop",
    rating: 5,
    tag: "製造業",
  },
  {
    quote: "健康経営優良法人（大規模法人部門）の認定取得が悲願でしたが、HealthForceのサポートで1年以内に達成。採用活動にも好影響が出ており、優秀な人材の確保につながっています。",
    name: "佐藤 花子",
    role: "代表取締役",
    company: "ITスタートアップ（従業員数 420名）",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format&fit=crop",
    rating: 5,
    tag: "IT・テクノロジー",
  },
  {
    quote: "産業医との連携が難しく困っていたところ、HealthForceに相談したところ業界に精通した先生をすぐにご紹介いただけました。従業員満足度調査のスコアが20ポイント向上しています。",
    name: "山田 太郎",
    role: "総務・人事責任者",
    company: "小売チェーン（店舗数 180店舗）",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80&auto=format&fit=crop",
    rating: 5,
    tag: "小売・流通",
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

export default function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            お客様の声
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            様々な業種・規模の企業から高い評価をいただいています
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={card}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <svg className="w-8 h-8 text-emerald-200 mb-4 flex-shrink-0" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H7.9C8.4 11.7 9.9 10 12 9.4L10 8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6.1c.5-2.3 2-4 4.1-4.6L24 8z" />
              </svg>
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">{t.quote}</p>
              <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-emerald-100">
                  <Image src={t.img} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                  <div className="text-xs text-gray-400">{t.company}</div>
                </div>
                <span className="ml-auto px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs rounded-full font-medium flex-shrink-0">
                  {t.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}