"use client";

import { motion } from "framer-motion";

const plans = [
  { name: "Starter", nameEn: "Starter", price: "98,000", unit: "JPY/month", description: "For SMEs starting health management", badge: null, color: "border-white/10", btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: ["Health Mgmt Certification Support", "Stress Check Implementation", "Monthly Reports", "Dedicated Consultant", "Email & Chat Support"], notIncluded: ["Wellness Program Design", "Physician Coordination"] },
  { name: "Standard", nameEn: "Standard", price: "198,000", unit: "JPY/month", description: "For companies pursuing full health management", badge: "Most Popular", color: "border-blue-500/50", btnStyle: "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25",
    features: ["All Starter Features", "Wellness Program Design", "Health Data Analytics", "Physician Coordination", "Employee App", "Quarterly Reports"], notIncluded: [] },
  { name: "Enterprise", nameEn: "Enterprise", price: "Custom", unit: "", description: "Custom plan for large organizations", badge: null, color: "border-white/10", btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: ["All Standard Features", "Group Company Coverage", "Dedicated Team", "Custom Dashboard", "Board Meeting Support", "24/7 Emergency Support"], notIncluded: [] },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Simple,<br /><span className="gradient-text">Transparent Pricing</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">No hidden costs. Only the services you need, at the right price.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }} whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-8 border ${plan.color} ${plan.badge ? "bg-gradient-to-b from-blue-950/40 to-blue-900/10" : "bg-white/[0.02]"}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">{plan.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <div className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">{plan.nameEn}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm">{plan.description}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price === "Custom" ? "" : "&#165;"}{plan.price}</span>
                  {plan.unit && <span className="text-white/40 text-sm mb-1">{plan.unit}</span>}
                </div>
                {plan.price === "Custom" && <div className="text-2xl font-bold text-white">Custom Quote</div>}
              </div>
              <button onClick={() => { document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 mb-8 ${plan.btnStyle}`}>
                {plan.price === "Custom" ? "Contact Us" : "Get Started Free"}
              </button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">&#10003;</span>{feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/25">
                    <span className="mt-0.5 flex-shrink-0">-</span>{feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-white/30 text-sm mt-10">
          * Initial fee separate / 12-month minimum contract / Varies by headcount and requirements
        </motion.p>
      </div>
    </section>
  );
}