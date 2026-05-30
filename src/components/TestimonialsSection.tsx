"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  { company: "Manufacturing Co. A", size: "850 Employees", role: "HR Director", name: "M. Tanaka", quote: "Working with HealthForce, we obtained the Health Management Excellence certification in just one year. Beyond that, our turnover rate improved 28% year-over-year. The data-driven proposals are especially valuable.", result: "Turnover -28%", color: "from-blue-900/20" },
  { company: "IT Company B", size: "320 Employees", role: "CEO", name: "K. Suzuki", quote: "We were struggling with engineer mental health. HealthForce stress check analysis and individual follow-up programs halved our leave of absence cases. The certification also differentiates us in recruitment.", result: "Leave of Absence -52%", color: "from-green-900/20" },
  { company: "Retail Co. C", size: "1,200 Employees", role: "General Affairs", name: "E. Sato", quote: "They designed a wellness program covering all our nationwide store staff. Personalized health support was realized, and employee engagement scores improved significantly.", result: "Engagement +41%", color: "from-purple-900/20" },
  { company: "Logistics Co. D", size: "450 Employees", role: "Safety Manager", name: "M. Takahashi", quote: "Driver health management requires specialized know-how. HealthForce understands industry-specific risks and proposed practical programs. We achieved 100% health checkup attendance.", result: "Checkup Rate 100%", color: "from-orange-900/20" },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Client Voices<br /><span className="gradient-text">Tell Everything</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {testimonials.map((t, i) => (
              <button key={t.company} onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === i ? "bg-white text-black" : "border border-white/10 text-white/50 hover:text-white/80"}`}>
                {t.company}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className={`rounded-3xl p-8 md:p-12 border border-white/[0.08] bg-gradient-to-br ${testimonials[active].color} to-transparent`}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex gap-1 mb-6">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">&#9733;</span>)}</div>
                  <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">&ldquo;{testimonials[active].quote}&rdquo;</blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold">{testimonials[active].name[0]}</div>
                    <div>
                      <div className="text-white font-semibold">{testimonials[active].name}</div>
                      <div className="text-white/40 text-sm">{testimonials[active].role} / {testimonials[active].company}</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-64 flex flex-col justify-center">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Result</div>
                    <div className="text-3xl font-bold gradient-text-blue mb-2">{testimonials[active].result}</div>
                    <div className="text-white/30 text-xs">{testimonials[active].size}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}