"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { icon: "trophy", title: "Health Management\nCertification Support", description: "Full support from application documents for METI certification to post-certification branding.", color: "from-blue-500/20 to-blue-600/5", accent: "#2997ff", items: ["Document Preparation", "Audit Strategy", "Annual Renewal"] },
  { icon: "bulb", title: "Wellness\nProgram Design", description: "Evidence-based wellness programs customized for your company size and industry.", color: "from-green-500/20 to-green-600/5", accent: "#30d158", items: ["Mental Health Care", "Exercise Habits", "Nutrition Program"] },
  { icon: "chart", title: "Health Data\nAnalytics", description: "Integrated analysis of health checkups, stress checks, and wearable data to visualize organizational health risks.", color: "from-purple-500/20 to-purple-600/5", accent: "#bf5af2", items: ["Risk Scoring", "Department Heatmap", "ROI Measurement"] },
  { icon: "mind", title: "Mental Health\nSupport", description: "Comprehensive support from stress check implementation with occupational physicians to EAP program management.", color: "from-orange-500/20 to-orange-600/5", accent: "#ff9f0a", items: ["Stress Check", "High-Risk Follow-up", "Manager Training"] },
  { icon: "target", title: "Health Management\nConsulting", description: "From strategic planning aligned with management goals to building internal promotion structures.", color: "from-red-500/20 to-red-600/5", accent: "#ff375f", items: ["Strategy & KPI Design", "Structure Building", "Internal Promotion"] },
  { icon: "handshake", title: "Occupational Health\nOutsourcing", description: "Full outsourcing of occupational health functions for SMEs who have difficulty securing specialist personnel.", color: "from-teal-500/20 to-teal-600/5", accent: "#5ac8fa", items: ["Physician Coordination", "On-site Nurse Service", "Safety Committee"] },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Services</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Health Management<br /><span className="gradient-text">from Every Angle</span></h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">From certification to continuous improvement. Six services supporting your health management end-to-end.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.01 }}
              className="relative rounded-2xl p-8 border border-white/[0.08] cursor-pointer group overflow-hidden bg-white/[0.02]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.accent}15 0%, transparent 70%)` }} />
              <div className="text-4xl mb-4">
                {service.icon === "trophy" && "醇"}
                {service.icon === "bulb" && "庁"}
                {service.icon === "chart" && "投"}
                {service.icon === "mind" && "ｧ・}
                {service.icon === "target" && "識"}
                {service.icon === "handshake" && "､・}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 whitespace-pre-line leading-tight">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.accent }} />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}