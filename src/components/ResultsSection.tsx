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
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "謾ｯ謠ｴ莨∵･ｭ謨ｰ", description: "荳ｭ蟆丈ｼ∵･ｭ縺九ｉ荳雁ｴ莨∵･ｭ縺ｾ縺ｧ" },
  { value: 98, suffix: "%", label: "隱榊ｮ壼叙蠕礼紫", description: "讌ｭ逡悟ｹｳ蝮・・2蛟堺ｻ･荳・ },
  { value: 32, suffix: "%", label: "髮｢閨ｷ邇・炎貂・, description: "蟷ｳ蝮・噪縺ｪ謾ｯ謠ｴ莨∵･ｭ縺ｧ縺ｮ螳溽ｸｾ" },
  { value: 3.2, suffix: "x", label: "逕溽肇諤ｧ蜷台ｸ・, description: "謚戊ｳ・ｯｾ蜉ｹ譫懊・蟷ｳ蝮・､" },
];

const features = [
  {
    title: "繧ｨ繝薙ョ繝ｳ繧ｹ繝吶・繧ｹ",
    description: "蟄ｦ陦楢ｫ匁枚繝ｻ蜴夂函蜉ｴ蜒咲怐繝・・繧ｿ縺ｫ蝓ｺ縺･縺・◆遘大ｭｦ逧・い繝励Ο繝ｼ繝√〒遒ｺ螳溘↑謌先棡繧貞・縺励∪縺吶・,
    icon: "溌",
  },
  {
    title: "莨ｴ襍ｰ蝙九し繝昴・繝・,
    description: "隱榊ｮ壼叙蠕怜ｾ後ｂ邯咏ｶ壹＠縺ｦ謾ｹ蝟・し繧､繧ｯ繝ｫ繧貞屓縺励∵戟邯夂噪縺ｪ蛛･蠎ｷ邨悟霧繧貞ｮ溽樟縺励∪縺吶・,
    icon: "､・,
  },
  {
    title: "讌ｭ遞ｮ迚ｹ蛹悶ヮ繧ｦ繝上え",
    description: "陬ｽ騾繝ｻIT繝ｻ蟆丞｣ｲ繝ｻ蛹ｻ逋ゅ↑縺ｩ20讌ｭ遞ｮ莉･荳翫・蟆る摩遏･隴倥〒縲∵･ｭ遞ｮ蝗ｺ譛峨・隱ｲ鬘後↓蟇ｾ蠢懊・,
    icon: "少",
  },
  {
    title: "繝・ず繧ｿ繝ｫﾃ励ヲ繝･繝ｼ繝槭Φ",
    description: "繝・け繝弱Ο繧ｸ繝ｼ縺ｨ莠ｺ縺ｮ蜉帙ｒ陞榊粋縲ゅョ繝ｼ繧ｿ繝峨Μ繝悶Φ縺ｪ譁ｽ遲悶ｒ貂ｩ縺九∩縺ｮ縺ゅｋ謾ｯ謠ｴ縺ｧ螳溯｡後・,
    icon: "捗",
  },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#020208]" />
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Results
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            謨ｰ蟄励′險ｼ譏弱☆繧九・            <br />
            <span className="gradient-text">遒ｺ縺九↑螳溽ｸｾ</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl glass border border-white/[0.06]"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text-blue mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-white/40 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Why us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            驕ｸ縺ｰ繧檎ｶ壹￠繧九・縺､縺ｮ逅・罰
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
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
