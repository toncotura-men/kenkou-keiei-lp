"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
}

const metrics = [
  { target: 500, suffix: "+", label: "導入企業数", sub: "全国の企業が信頼" },
  { target: 93, suffix: "%", label: "顧客満足度", sub: "5年連続最高評価" },
  { target: 40, suffix: "%", label: "欠勤率削減", sub: "平均導入後1年以内" },
  { target: 98, suffix: "%", label: "認定取得率", sub: "健康経営優良法人" },
];

export default function ResultsSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="results" ref={sectionRef} className="py-24 bg-emerald-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Results
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            数字で見る、HealthForceの実績
          </h2>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">
            15年間の専門知識と実績が、確かな成果として表れています
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((m, i) => {
            const { count, ref } = useCounter(m.target);
            return (
              <motion.div
                key={m.label}
                ref={ref}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-colors"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                  {count}
                  <span className="text-amber-300">{m.suffix}</span>
                </div>
                <div className="text-emerald-100 font-semibold text-lg mb-1">{m.label}</div>
                <div className="text-emerald-200 text-xs">{m.sub}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white/10 border border-white/20 rounded-2xl p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="text-center lg:text-left">
            <h3 className="text-white font-bold text-xl mb-1">まずは無料診断からはじめませんか？</h3>
            <p className="text-emerald-100 text-sm">現在の健康経営の課題を30分でヒアリングし、最適な改善策をご提案します</p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 px-8 py-4 bg-white text-emerald-700 rounded-full font-bold hover:bg-emerald-50 transition-colors shadow-lg text-sm whitespace-nowrap"
          >
            無料診断を申し込む
          </a>
        </motion.div>
      </div>
    </section>
  );
}