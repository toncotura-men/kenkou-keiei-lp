"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    company: "陬ｽ騾讌ｭ A遉ｾ",
    size: "蠕捺･ｭ蜩｡謨ｰ 850蜷・,
    role: "莠ｺ莠矩Κ髟ｷ",
    name: "逕ｰ荳ｭ 髮・ｭ・,
    quote:
      "HealthForce縺ｨ邨・ｓ縺ｧ1蟷ｴ縺ｧ蛛･蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ・亥､ｧ隕乗ｨ｡豕穂ｺｺ驛ｨ髢・峨・隱榊ｮ壹ｒ蜿門ｾ励ゅ◎繧後□縺代〒縺ｪ縺上・屬閨ｷ邇・′蜑榊ｹｴ豈・8%謾ｹ蝟・＠縺ｾ縺励◆縲ゅョ繝ｼ繧ｿ縺ｫ蝓ｺ縺･縺乗命遲匁署譯医′迚ｹ縺ｫ蜉ｩ縺九▲縺ｦ縺・∪縺吶・,
    result: "髮｢閨ｷ邇・竏・8%",
    industry: "陬ｽ騾",
    color: "from-blue-900/20",
  },
  {
    company: "IT莨∵･ｭ B遉ｾ",
    size: "蠕捺･ｭ蜩｡謨ｰ 320蜷・,
    role: "CEO",
    name: "驤ｴ譛ｨ 蛛･莠・,
    quote:
      "繧ｨ繝ｳ繧ｸ繝九い縺ｮ繝｡繝ｳ繧ｿ繝ｫ繝倥Ν繧ｹ蟇ｾ遲悶〒謔ｩ繧薙〒縺・∪縺励◆縲・ealthForce縺ｮ繧ｹ繝医Ξ繧ｹ繝√ぉ繝・け蛻・梵縺ｨ蛟句挨繝輔か繝ｭ繝ｼ繝励Ο繧ｰ繝ｩ繝縺ｧ縲∽ｼ題・閠・焚縺悟濠貂帙よ治逕ｨ縺ｧ繧ゅ悟▼蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ縲阪・隱榊ｮ壹′蟾ｮ蛻･蛹悶↓縺ｪ縺｣縺ｦ縺・∪縺吶・,
    result: "莨題・閠・焚 竏・2%",
    industry: "IT",
    color: "from-green-900/20",
  },
  {
    company: "蟆丞｣ｲ讌ｭ C遉ｾ",
    size: "蠕捺･ｭ蜩｡謨ｰ 1,200蜷・,
    role: "邱丞漁驛ｨ髟ｷ",
    name: "菴占陸 諱ｵ鄒・,
    quote:
      "蜈ｨ蝗ｽ螻暮幕縺ｮ蠎苓・繧ｹ繧ｿ繝・ヵ繧ょ性繧√◆繧ｦ繧ｧ繝ｫ繝阪せ繝励Ο繧ｰ繝ｩ繝繧定ｨｭ險医＠縺ｦ繧ゅｉ縺・∪縺励◆縲ゆｸ莠ｺ縺ｲ縺ｨ繧翫↓蜷医▲縺溷▼蠎ｷ謾ｯ謠ｴ縺悟ｮ溽樟縺ｧ縺阪√せ繧ｿ繝・ヵ縺ｮ繧ｨ繝ｳ繧ｲ繝ｼ繧ｸ繝｡繝ｳ繝医せ繧ｳ繧｢縺悟､ｧ蟷・↓蜷台ｸ翫＠縺ｾ縺励◆縲・,
    result: "繧ｨ繝ｳ繧ｲ繝ｼ繧ｸ繝｡繝ｳ繝・+41%",
    industry: "蟆丞｣ｲ",
    color: "from-purple-900/20",
  },
  {
    company: "迚ｩ豬∵･ｭ D遉ｾ",
    size: "蠕捺･ｭ蜩｡謨ｰ 450蜷・,
    role: "螳牙・陦帷函邂｡逅・・,
    name: "鬮俶ｩ・隱",
    quote:
      "繝峨Λ繧､繝舌・縺ｮ蛛･蠎ｷ邂｡逅・・迚ｹ谿翫↑繝弱え繝上え縺悟ｿ・ｦ√〒縺吶・ealthForce縺ｯ讌ｭ遞ｮ蝗ｺ譛峨・繝ｪ繧ｹ繧ｯ繧堤・遏･縺励※縺翫ｊ縲∝ｮ溯ｷｵ逧・↑繝励Ο繧ｰ繝ｩ繝繧呈署譯医＠縺ｦ縺上ｌ縺ｾ縺励◆縲ょ▼險ｺ蜿苓ｨｺ邇・ｂ100%繧帝＃謌舌＠縺ｾ縺励◆縲・,
    result: "蛛･險ｺ蜿苓ｨｺ邇・100%",
    industry: "迚ｩ豬・,
    color: "from-orange-900/20",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            縺雁ｮ｢讒倥・螢ｰ縺後・            <br />
            <span className="gradient-text">蜈ｨ縺ｦ繧定ｪ槭▲縺ｦ縺・∪縺・/span>
          </h2>
        </motion.div>

        {/* Testimonial cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tab selector */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {testimonials.map((t, i) => (
              <button
                key={t.company}
                onClick={() => setActive(i)}
                className={\px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 \\}
              >
                {t.company}
              </button>
            ))}
          </div>

          {/* Active testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={\ounded-3xl p-8 md:p-12 border border-white/[0.08] bg-gradient-to-br \ to-transparent\}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">笘・/span>
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold">
                      {testimonials[active].name[0]}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonials[active].name}</div>
                      <div className="text-white/40 text-sm">
                        {testimonials[active].role} / {testimonials[active].company}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result callout */}
                <div className="md:w-64 flex flex-col justify-center">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-3">
                      謌先棡
                    </div>
                    <div className="text-3xl font-bold gradient-text-blue mb-2">
                      {testimonials[active].result}
                    </div>
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
