"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Analysis &\nDiagnosis", description: "We collect and analyze quantitative data including health checkup results, stress check data, and turnover rates to scientifically identify your company's unique health challenges.", visual: { bg: "from-blue-900/30 to-blue-800/10", icon: "搭", items: ["Health Data Analysis", "Stress Check Review", "Lifestyle Risk Assessment"] } },
  { step: "02", title: "Strategy &\nRoadmap", description: "Aligned with management goals, we set KPIs and create a 3-year health management promotion plan from certification acquisition to continuous improvement.", visual: { bg: "from-green-900/30 to-green-800/10", icon: "亮・・, items: ["KPI & Goal Setting", "Priority Measures", "Budget Planning"] } },
  { step: "03", title: "Implementation &\nPrograms", description: "Based on the plan, we deploy wellness programs including proper health checkups, stress checks, and exercise, diet, and smoking cessation programs.", visual: { bg: "from-purple-900/30 to-purple-800/10", icon: "噫", items: ["Wellness Programs", "Health Events", "Online Training"] } },
  { step: "04", title: "Measurement &\nImprovement", description: "We quantitatively measure and visualize the effectiveness of measures. Running PDCA cycles to continuously improve health management quality.", visual: { bg: "from-orange-900/30 to-orange-800/10", icon: "嶋", items: ["ROI Reports", "Improvement Proposals", "Advanced Certification"] } },
];

export default function ScrollFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative py-32 px-6 overflow-hidden" id="cases">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020208] to-black" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Process</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Results-Driven<br /><span className="gradient-text">4-Step Process</span></h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">End-to-end from analysis to improvement. A systematic process for guaranteed results.</p>
        </motion.div>
        <div ref={containerRef} className="space-y-8">
          {steps.map((step, i) => (
            <motion.div key={step.step} initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-bold text-white/10">{step.step}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white whitespace-pre-line">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.description}</p>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} className={`flex-1 rounded-2xl p-8 border border-white/[0.08] bg-gradient-to-br ${step.visual.bg}`}>
                <div className="text-5xl mb-6">{step.visual.icon}</div>
                <div className="space-y-3">
                  {step.visual.items.map((item, j) => (
                    <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.1 + 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400" />
                      <span className="text-white/70 text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}