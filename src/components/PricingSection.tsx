"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ",
    nameEn: "Starter",
    price: "98,000",
    unit: "蜀・譛・,
    description: "蛛･蠎ｷ邨悟霧繧貞ｧ九ａ縺溘＞荳ｭ蟆丈ｼ∵･ｭ蜷代￠",
    badge: null,
    color: "border-white/10",
    btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: [
      "蛛･蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ隱榊ｮ夂筏隲区髪謠ｴ",
      "繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け螳滓命繝ｻ髮・ｨ・,
      "譛域ｬ｡繝ｬ繝昴・繝域署萓・,
      "蟆ゆｻｻ繧ｳ繝ｳ繧ｵ繝ｫ繧ｿ繝ｳ繝・蜷・,
      "繝｡繝ｼ繝ｫ繝ｻ繝√Ε繝・ヨ繧ｵ繝昴・繝・,
    ],
    notIncluded: [
      "繧ｦ繧ｧ繝ｫ繝阪せ繝励Ο繧ｰ繝ｩ繝險ｭ險・,
      "逕｣讌ｭ蛹ｻ繧ｳ繝ｼ繝・ぅ繝阪・繝・,
    ],
  },
  {
    name: "繧ｹ繧ｿ繝ｳ繝繝ｼ繝・,
    nameEn: "Standard",
    price: "198,000",
    unit: "蜀・譛・,
    description: "譛ｬ譬ｼ逧・↑蛛･蠎ｷ邨悟霧謗ｨ騾ｲ繧堤岼謖・☆莨∵･ｭ蜷代￠",
    badge: "莠ｺ豌湧o.1",
    color: "border-blue-500/50",
    btnStyle: "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25",
    features: [
      "繧ｹ繧ｿ繝ｼ繧ｿ繝ｼ縺ｮ蜈ｨ讖溯・",
      "繧ｦ繧ｧ繝ｫ繝阪せ繝励Ο繧ｰ繝ｩ繝險ｭ險医・螳滓命",
      "蛛･蠎ｷ繝・・繧ｿ繧｢繝翫Μ繝・ぅ繧ｯ繧ｹ",
      "逕｣讌ｭ蛹ｻ繧ｳ繝ｼ繝・ぅ繝阪・繝・,
      "蠕捺･ｭ蜩｡蜷代￠繧｢繝励Μ謠蝉ｾ・,
      "蝗帛濠譛溽ｵ悟霧繝ｬ繝昴・繝・,
    ],
    notIncluded: [],
  },
  {
    name: "繧ｨ繝ｳ繧ｿ繝ｼ繝励Λ繧､繧ｺ",
    nameEn: "Enterprise",
    price: "隕∫嶌隲・,
    unit: "",
    description: "螟ｧ隕乗ｨ｡邨・ｹ斐・繧ｰ繝ｫ繝ｼ繝嶺ｼ∵･ｭ蜷代￠繧ｫ繧ｹ繧ｿ繝繝励Λ繝ｳ",
    badge: null,
    color: "border-white/10",
    btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: [
      "繧ｹ繧ｿ繝ｳ繝繝ｼ繝峨・蜈ｨ讖溯・",
      "繧ｰ繝ｫ繝ｼ繝嶺ｼ夂､ｾ荳諡ｬ蟇ｾ蠢・,
      "蟆ゆｻｻ繝√・繝菴灘宛",
      "繧ｫ繧ｹ繧ｿ繝繝繝・す繝･繝懊・繝・,
      "邨悟霧莨夊ｭｰ縺ｸ縺ｮ蜷悟ｸｭ繝ｻ蝣ｱ蜻・,
      "24譎る俣邱頑･繧ｵ繝昴・繝・,
    ],
    notIncluded: [],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            繧ｷ繝ｳ繝励Ν縺ｧ
            <br />
            <span className="gradient-text">騾乗・縺ｪ譁咎≡菴鍋ｳｻ</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            髫繧後◆繧ｳ繧ｹ繝医・荳蛻・↑縺励ょｿ・ｦ√↑繧ｵ繝ｼ繝薙せ縺縺代ｒ縲・←豁｣萓｡譬ｼ縺ｧ縲・          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={\elative rounded-2xl p-8 border \ \\}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">
                  {plan.nameEn}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === "隕∫嶌隲・ ? "" : "ﾂ･"}
                    {plan.price}
                  </span>
                  {plan.unit && (
                    <span className="text-white/40 text-sm mb-1">{plan.unit}</span>
                  )}
                </div>
                {plan.price === "隕∫嶌隲・ && (
                  <div className="text-2xl font-bold text-white">隕∫嶌隲・/div>
                )}
              </div>

              <button
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={\w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 mb-8 \\}
              >
                {plan.price === "隕∫嶌隲・ ? "縺雁撫縺・粋繧上○" : "辟｡譁吶〒蟋九ａ繧・}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">笨・/span>
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/25">
                    <span className="mt-0.5 flex-shrink-0">窶・/span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-10"
        >
          窶ｻ 蛻晄悄雋ｻ逕ｨ蛻･騾・/ 螂醍ｴ・悄髢・2繝ｶ譛医・/ 蠕捺･ｭ蜩｡謨ｰ繝ｻ隕∽ｻｶ縺ｫ繧医ｊ逡ｰ縺ｪ繧翫∪縺・        </motion.p>
      </div>
    </section>
  );
}
