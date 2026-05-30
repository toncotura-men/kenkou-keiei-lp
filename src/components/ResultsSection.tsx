"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "Companies", description: "SMEs to listed companies" },
  { value: 98, suffix: "%", label: "Cert Rate", description: "2x industry average" },
  { value: 32, suffix: "%", label: "Turnover Reduction", description: "Average across clients" },
  { value: 3.2, suffix: "x", label: "Productivity Gain", description: "Average ROI" },
];

const features = [
  { title: "Evidence-Based", description: "Scientific approach based on academic papers and government data for reliable results.", icon: "溌" },
  { title: "Ongoing Support", description: "After certification, we keep improving the cycle for sustainable health management.", icon: "､・ },
  { title: "Industry Expertise", description: "Specialized knowledge across 20+ industries including manufacturing, IT, retail, and healthcare.", icon: "少" },
  { title: "Digital + Human", description: "Merging technology and human expertise. Data-driven measures with warm, personal support.", icon: "捗" },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="results" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#020208]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)" }} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Results</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Numbers Prove<br /><span className="gradient-text">Proven Results</span></h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center p-8 rounded-2xl glass border border-white/[0.06]">
              <div className="text-4xl md:text-5xl font-bold gradient-text-blue mb-2"><CountUp target={stat.value} suffix={stat.suffix} /></div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-white/40 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white">4 Reasons Clients Choose Us</h3>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}