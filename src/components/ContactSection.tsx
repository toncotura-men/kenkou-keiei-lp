"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
type FormData = { company: string; name: string; email: string; phone: string; employees: string; message: string; };
export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ company: "", name: "", email: "", phone: "", employees: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("success"); setForm({ company: "", name: "", email: "", phone: "", employees: "", message: "" }); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };
  const inputClass = "w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-400/60 transition-all duration-300 text-sm";
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#030310] to-black" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-[150px]"
        style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)" }} />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Contact</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Start with a<br /><span className="gradient-text">Conversation.</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Free 60-minute consultation. We organize your current health management situation and challenges together.<br />No sales pitch.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 md:p-12 backdrop-blur-xl">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="text-6xl mb-6">&#9989;</div>
                <h3 className="text-2xl font-bold text-white mb-3">Thank you for your inquiry</h3>
                <p className="text-white/50">We will contact you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="mt-8 px-6 py-2 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors">Send Another</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Company <span className="text-red-400">*</span></label>
                  <input type="text" name="company" required value={form.company} onChange={handleChange} placeholder="Company Name" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Name <span className="text-red-400">*</span></label>
                  <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Email <span className="text-red-400">*</span></label>
                  <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="email@company.com" className={inputClass} />
                </div>
                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="03-0000-0000" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Employees</label>
                  <select name="employees" value={form.employees} onChange={handleChange} className={inputClass}>
                    <option value="" className="bg-black">Select</option>
                    <option value="~50" className="bg-black">Under 50</option>
                    <option value="51-100" className="bg-black">51-100</option>
                    <option value="101-300" className="bg-black">101-300</option>
                    <option value="301-1000" className="bg-black">301-1,000</option>
                    <option value="1001+" className="bg-black">1,001+</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="E.g. We are considering obtaining the Health Management Excellence certification." className={`${inputClass} resize-none`} />
                </div>
                {status === "error" && <div className="md:col-span-2 text-red-400 text-sm text-center">Send failed. Please try again later.</div>}
                <div className="md:col-span-2 flex flex-col sm:flex-row items-center gap-4">
                  <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-10 py-4 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-500/25">
                    {status === "loading" ? "Sending..." : "Book Free Consultation"}
                  </motion.button>
                  <p className="text-white/30 text-xs">We will respond within 24 hours</p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[{ icon: "\u{1F4DE}", label: "Phone", value: "03-0000-0000", sub: "Weekdays 9:00-18:00" }, { icon: "\u2709", label: "Email", value: "hello@healthforce.jp", sub: "24/7 reception" }, { icon: "\u{1F4AC}", label: "Online", value: "Zoom / Teams", sub: "Nationwide" }].map((item) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] text-center">
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