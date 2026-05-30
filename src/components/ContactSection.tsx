"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormData = {
  company: string;
  name: string;
  email: string;
  phone: string;
  employees: string;
  message: string;
};

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    phone: "",
    employees: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ company: "", name: "", email: "", phone: "", employees: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/60 focus:bg-white/[0.08] transition-all duration-300 text-sm";

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#030310] to-black" />

      {/* Decorative orb */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-[150px]"
        style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Contact
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            縺ｾ縺壹∬ｩｱ縺励※縺ｿ繧九・            <br />
            <span className="gradient-text">縺昴ｌ縺縺代〒蜊∝・縺ｧ縺吶・/span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            辟｡譁咏嶌隲・・60蛻・ょ▼蠎ｷ邨悟霧縺ｮ迴ｾ迥ｶ縺ｨ隱ｲ鬘後ｒ荳邱偵↓謨ｴ逅・＠縺ｾ縺吶・            <br />
            謠先｡医・蝟ｶ讌ｭ縺ｯ縺励∪縺帙ｓ縲・          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12 backdrop-blur-xl"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-6">笨・/div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  縺雁撫縺・粋繧上○縺ゅｊ縺後→縺・＃縺悶＞縺ｾ縺・                </h3>
                <p className="text-white/50">
                  24譎る俣莉･蜀・↓縺秘｣邨｡縺・◆縺励∪縺吶ゅ♀蠕・■縺上□縺輔＞縲・                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-2 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors"
                >
                  蛻･縺ｮ縺雁撫縺・粋繧上○
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-5"
              >
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    莨夂､ｾ蜷・<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="譬ｪ蠑丈ｼ夂､ｾ縲・・
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    縺雁錐蜑・<span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="螻ｱ逕ｰ 螟ｪ驛・
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    繝｡繝ｼ繝ｫ繧｢繝峨Ξ繧ｹ <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="yamada@company.co.jp"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    髮ｻ隧ｱ逡ｪ蜿ｷ
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="03-0000-0000"
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    蠕捺･ｭ蜩｡謨ｰ
                  </label>
                  <select
                    name="employees"
                    value={form.employees}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" className="bg-black">驕ｸ謚槭＠縺ｦ縺上□縺輔＞</option>
                    <option value="~50" className="bg-black">50蜷堺ｻ･荳・/option>
                    <option value="51-100" className="bg-black">51縲・00蜷・/option>
                    <option value="101-300" className="bg-black">101縲・00蜷・/option>
                    <option value="301-1000" className="bg-black">301縲・000蜷・/option>
                    <option value="1001+" className="bg-black">1001蜷堺ｻ･荳・/option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    縺皮嶌隲・・螳ｹ繝ｻ縺碑ｳｪ蝠・                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="萓具ｼ壼▼蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ縺ｮ隱榊ｮ壼叙蠕励ｒ讀懆ｨ弱＠縺ｦ縺・∪縺吶ゆｽ輔°繧牙ｧ九ａ繧後・繧医＞縺狗嶌隲・＠縺溘＞縲・
                    className={\\ resize-none\}
                  />
                </div>

                {status === "error" && (
                  <div className="md:col-span-2 text-red-400 text-sm text-center">
                    騾∽ｿ｡縺ｫ螟ｱ謨励＠縺ｾ縺励◆縲ゅ♀謇区焚縺ｧ縺吶′縺励・繧峨￥縺励※縺九ｉ蜀榊ｺｦ縺願ｩｦ縺励￥縺縺輔＞縲・                  </div>
                )}

                <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-4">
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-10 py-4 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        騾∽ｿ｡荳ｭ...
                      </span>
                    ) : (
                      "辟｡譁咏嶌隲・ｒ逕ｳ縺苓ｾｼ繧"
                    )}
                  </motion.button>
                  <p className="text-white/30 text-xs">
                    騾∽ｿ｡蠕・4譎る俣莉･蜀・↓縺秘｣邨｡縺励∪縺・                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact alternatives */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: "到", label: "髮ｻ隧ｱ", value: "03-0000-0000", sub: "蟷ｳ譌･ 9:00縲・8:00" },
            { icon: "笨会ｸ・, label: "繝｡繝ｼ繝ｫ", value: "hello@healthforce.jp", sub: "24譎る俣蜿嶺ｻ・ },
            { icon: "町", label: "繧ｪ繝ｳ繝ｩ繧､繝ｳ逶ｸ隲・, value: "Zoom / Teams 蟇ｾ蠢・, sub: "蜈ｨ蝗ｽ縺ｩ縺薙〒繧・ },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-white/40 text-xs mb-1">{item.label}</div>
              <div className="text-white/80 text-sm font-medium">{item.value}</div>
              <div className="text-white/30 text-xs mt-0.5">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
