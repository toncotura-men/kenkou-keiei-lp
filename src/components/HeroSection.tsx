"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black" />
        <motion.div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)", y: springY }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(circle, #30d158 0%, transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
          style={{ background: "radial-gradient(circle, #ffd60a 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </motion.div>
      <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ y: textY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            健康経営優良法人 認定取得率 98%
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="block text-white">従業員が輝く。</span>
          <span className="block gradient-text">組織が強くなる。</span>
          <span className="block text-white">それが健康経営。</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          従業員の健康こそ、組織の競争力。<br className="hidden md:block" />
          戦略的な健康経営で、人と組織のポテンシャルを最大化します。
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            onClick={() => { document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full text-base transition-all shadow-lg shadow-blue-500/30 w-full sm:w-auto">
            無料相談する
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            onClick={() => { document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-4 glass border border-white/20 text-white font-semibold rounded-full text-base transition-all hover:bg-white/10 w-full sm:w-auto">
            サービスを見る
          </motion.button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }} className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[{ value: "500+", label: "支援企業数" }, { value: "98%", label: "認定取得率" }, { value: "3.2x", label: "生産性向上率" }].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-blue">{stat.value}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ opacity }}>
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}