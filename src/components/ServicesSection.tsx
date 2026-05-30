"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "醇",
    title: "蛛･蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ\n隱榊ｮ壼叙蠕玲髪謠ｴ",
    description:
      "邨梧ｸ育肇讌ｭ逵√・蛛･蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ隱榊ｮ壼宛蠎ｦ縺ｫ蜷代￠縺溽筏隲区嶌鬘樔ｽ懈・縺九ｉ縲∬ｪ榊ｮ壼ｾ後・繝悶Λ繝ｳ繝・ぅ繝ｳ繧ｰ縺ｾ縺ｧ螳悟・繧ｵ繝昴・繝医・,
    color: "from-blue-500/20 to-blue-600/5",
    accent: "#2997ff",
    items: ["逕ｳ隲区嶌鬘樔ｸ諡ｬ菴懈・", "蟇ｩ譟ｻ蝓ｺ貅悶け繝ｪ繧｢謌ｦ逡･", "豈主ｹｴ縺ｮ譖ｴ譁ｰ邂｡逅・],
  },
  {
    icon: "庁",
    title: "繧ｦ繧ｧ繝ｫ繝阪せ\n繝励Ο繧ｰ繝ｩ繝險ｭ險・,
    description:
      "蠕捺･ｭ蜩｡縺ｮ蛛･蠎ｷ繝・・繧ｿ繧貞・譫舌＠縲√お繝薙ョ繝ｳ繧ｹ繝吶・繧ｹ縺ｮ蛛･蠎ｷ蠅鈴ｲ繝励Ο繧ｰ繝ｩ繝繧剃ｼ∵･ｭ隕乗ｨ｡繝ｻ讌ｭ遞ｮ縺ｫ蠢懊§縺ｦ繧ｫ繧ｹ繧ｿ繝槭う繧ｺ險ｭ險医・,
    color: "from-green-500/20 to-green-600/5",
    accent: "#30d158",
    items: ["繝｡繝ｳ繧ｿ繝ｫ繝倥Ν繧ｹ繧ｱ繧｢", "驕句虚鄙呈・蛹匁髪謠ｴ", "鬟溽函豢ｻ謾ｹ蝟・・繝ｭ繧ｰ繝ｩ繝"],
  },
  {
    icon: "投",
    title: "蛛･蠎ｷ繝・・繧ｿ\n繧｢繝翫Μ繝・ぅ繧ｯ繧ｹ",
    description:
      "螳壽悄蛛･蠎ｷ險ｺ譁ｭ繝ｻ繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け繝ｻ繧ｦ繧ｧ繧｢繝ｩ繝悶Ν繝・・繧ｿ繧堤ｵｱ蜷亥・譫舌らｵ・ｹ斐・蛛･蠎ｷ繝ｪ繧ｹ繧ｯ繧貞庄隕門喧縺励∝・謇九・蟇ｾ遲悶ｒ螳溽樟縲・,
    color: "from-purple-500/20 to-purple-600/5",
    accent: "#bf5af2",
    items: ["繝ｪ繧ｹ繧ｯ繧ｹ繧ｳ繧｢繝ｪ繝ｳ繧ｰ", "驛ｨ鄂ｲ蛻･繝偵・繝医・繝・・", "ROI貂ｬ螳壹・蝣ｱ蜻・],
  },
  {
    icon: "ｧ・,
    title: "繝｡繝ｳ繧ｿ繝ｫ繝倥Ν繧ｹ\n蟇ｾ遲門ｼｷ蛹・,
    description:
      "逕｣讌ｭ蛹ｻ繝ｻ閾ｨ蠎雁ｿ・炊螢ｫ縺ｨ騾｣謳ｺ縺励◆繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け螳滓命繝ｻ蛻・梵縺九ｉ縲・AP繝励Ο繧ｰ繝ｩ繝縺ｮ蟆主・繝ｻ驕狗畑縺ｾ縺ｧ蛹・峡謾ｯ謠ｴ縲・,
    color: "from-orange-500/20 to-orange-600/5",
    accent: "#ff9f0a",
    items: ["繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け螳滓命", "鬮倥せ繝医Ξ繧ｹ閠・ヵ繧ｩ繝ｭ繝ｼ", "邂｡逅・・蜷代￠遐比ｿｮ"],
  },
  {
    icon: "識",
    title: "蛛･蠎ｷ邨悟霧\n繧ｳ繝ｳ繧ｵ繝ｫ繝・ぅ繝ｳ繧ｰ",
    description:
      "邨悟霧謌ｦ逡･縺ｨ騾｣蜍輔＠縺溷▼蠎ｷ邨悟霧謗ｨ騾ｲ險育判縺ｮ遲門ｮ壹°繧峨∫､ｾ蜀・耳騾ｲ菴灘宛縺ｮ讒狗ｯ峨・莠ｺ譚占ご謌舌∪縺ｧ莨ｴ襍ｰ蝙九〒繧ｵ繝昴・繝医・,
    color: "from-red-500/20 to-red-600/5",
    accent: "#ff375f",
    items: ["謌ｦ逡･遶区｡医・KPI險ｭ險・, "謗ｨ騾ｲ菴灘宛讒狗ｯ・, "遉ｾ蜀・ｵｸ騾乗髪謠ｴ"],
  },
  {
    icon: "､・,
    title: "逕｣讌ｭ菫晏▼\n繧｢繧ｦ繝医た繝ｼ繧ｷ繝ｳ繧ｰ",
    description:
      "逕｣讌ｭ蛹ｻ驕ｸ莉ｻ縺九ｉ菫晏▼蟶ｫ豢ｻ逕ｨ縺ｾ縺ｧ縲∝ｰる摩莠ｺ譚舌・遒ｺ菫昴′髮｣縺励＞荳ｭ蟆丈ｼ∵･ｭ蜷代￠縺ｫ逕｣讌ｭ菫晏▼讖溯・繧剃ｸｸ縺斐→繧｢繧ｦ繝医た繝ｼ繧ｹ縲・,
    color: "from-teal-500/20 to-teal-600/5",
    accent: "#5ac8fa",
    items: ["逕｣讌ｭ蛹ｻ繧ｳ繝ｼ繝・ぅ繝阪・繝・, "菫晏▼蟶ｫ蟶ｸ鬧舌し繝ｼ繝薙せ", "陦帷函蟋泌藤莨夐°蝟ｶ"],
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Services
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            蛛･蠎ｷ邨悟霧繧偵・            <br />
            <span className="gradient-text">縺ゅｉ繧・ｋ隗貞ｺｦ縺九ｉ</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            隱榊ｮ壼叙蠕励°繧牙ｮ夂捩繝ｻ謾ｹ蝟・∪縺ｧ縲りｲｴ遉ｾ縺ｮ蛛･蠎ｷ邨悟霧繧剃ｸ豌鈴夊ｲｫ縺ｧ繧ｵ繝昴・繝医☆繧・縺､縺ｮ繧ｵ繝ｼ繝薙せ縲・          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="relative rounded-2xl p-8 border border-white/[0.08] cursor-pointer group overflow-hidden"
              style={{
                background: \linear-gradient(135deg, \)\,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: \adial-gradient(circle at 50% 50%, \15 0%, transparent 70%)\,
                }}
              />

              {/* Icon */}
              <div className="text-4xl mb-4">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 whitespace-pre-line leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Items */}
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: service.accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <motion.div
                className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-white/30 group-hover:text-white/70 transition-all duration-300"
              >
                竊・              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
