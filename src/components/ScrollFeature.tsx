"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "迴ｾ迥ｶ蛻・梵繝ｻ\n隱ｲ鬘檎音螳・,
    description:
      "蛛･蠎ｷ險ｺ譁ｭ繝・・繧ｿ縲√せ繝医Ξ繧ｹ繝√ぉ繝・け邨先棡縲・屬閨ｷ邇・↑縺ｩ螳夐㍼繝・・繧ｿ繧貞庶髮・・蛻・梵縲りｲｴ遉ｾ蝗ｺ譛峨・蛛･蠎ｷ隱ｲ鬘後ｒ遘大ｭｦ逧・↓迚ｹ螳壹＠縺ｾ縺吶・,
    visual: {
      bg: "from-blue-900/30 to-blue-800/10",
      icon: "搭",
      items: ["蛛･險ｺ繝・・繧ｿ蛻・梵", "繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け邊ｾ譟ｻ", "逕滓ｴｻ鄙呈・繝ｪ繧ｹ繧ｯ隧穂ｾ｡"],
    },
  },
  {
    step: "02",
    title: "謌ｦ逡･遲門ｮ壹・\n繝ｭ繝ｼ繝峨・繝・・菴懈・",
    description:
      "蛻・梵邨先棡縺ｨ邨悟霧逶ｮ讓吶ｒ辣ｧ繧峨＠蜷医ｏ縺帙゜PI繧定ｨｭ螳壹りｪ榊ｮ壼叙蠕励°繧臥ｶ咏ｶ壽隼蝟・∪縺ｧ縲・繧ｫ蟷ｴ縺ｮ蛛･蠎ｷ邨悟霧謗ｨ騾ｲ險育判繧堤ｭ門ｮ壹＠縺ｾ縺吶・,
    visual: {
      bg: "from-green-900/30 to-green-800/10",
      icon: "亮・・,
      items: ["KPI繝ｻ逶ｮ讓呵ｨｭ螳・, "譁ｽ遲門━蜈磯・ｽ榊喧", "莠育ｮ苓ｨ育判遲門ｮ・],
    },
  },
  {
    step: "03",
    title: "譁ｽ遲門ｮ滓命繝ｻ\n繝励Ο繧ｰ繝ｩ繝蟆主・",
    description:
      "險育判縺ｫ蝓ｺ縺･縺阪∝▼險ｺ繝ｻ繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け縺ｮ驕ｩ蛻・↑螳滓命縺九ｉ縲・°蜍輔・鬟滉ｺ九・遖∫・縺ｪ縺ｩ縺ｮ繧ｦ繧ｧ繝ｫ繝阪せ繝励Ο繧ｰ繝ｩ繝繧帝・ｬ｡螻暮幕縲・,
    visual: {
      bg: "from-purple-900/30 to-purple-800/10",
      icon: "噫",
      items: ["繧ｦ繧ｧ繝ｫ繝阪せ繝励Ο繧ｰ繝ｩ繝", "蛛･蠎ｷ繧､繝吶Φ繝井ｼ∫判", "繧ｪ繝ｳ繝ｩ繧､繝ｳ遐比ｿｮ"],
    },
  },
  {
    step: "04",
    title: "蜉ｹ譫懈ｸｬ螳壹・\n邯咏ｶ壽隼蝟・,
    description:
      "譁ｽ遲悶・蜉ｹ譫懊ｒ螳夐㍼逧・↓貂ｬ螳壹・蜿ｯ隕門喧縲１DCA繧ｵ繧､繧ｯ繝ｫ繧貞屓縺励↑縺後ｉ蛛･蠎ｷ邨悟霧縺ｮ雉ｪ繧帝ｫ倥ａ邯壹￠縲∽ｸ贋ｽ崎ｪ榊ｮ壹ｒ逶ｮ謖・＠縺ｾ縺吶・,
    visual: {
      bg: "from-orange-900/30 to-orange-800/10",
      icon: "嶋",
      items: ["ROI蜿ｯ隕門喧繝ｬ繝昴・繝・, "謾ｹ蝟・署譯医・螳滓命", "荳贋ｽ崎ｪ榊ｮ壹∈縺ｮ繧ｹ繝・ャ繝・],
    },
  },
];

export default function ScrollFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="cases">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020208] to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Process
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            謌先棡繧堤函繧縲・            <br />
            <span className="gradient-text">4繧ｹ繝・ャ繝・/span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            蛻・梵縺九ｉ謾ｹ蝟・∪縺ｧ荳豌鈴夊ｲｫ縲ら｢ｺ螳溘↑謌先棡繧貞・縺吶◆繧√・菴鍋ｳｻ逧・↑繝励Ο繧ｻ繧ｹ縲・          </p>
        </motion.div>

        {/* Steps */}
        <div ref={containerRef} className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={\lex flex-col \ gap-8 items-center\}
            >
              {/* Text side */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-bold text-white/10">{step.step}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white whitespace-pre-line">
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed">{step.description}</p>
              </div>

              {/* Visual side */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={\lex-1 rounded-2xl p-8 border border-white/[0.08] bg-gradient-to-br \\}
              >
                <div className="text-5xl mb-6">{step.visual.icon}</div>
                <div className="space-y-3">
                  {step.visual.items.map((item, j) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.1 + 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                    >
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
