"use client";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
export default function ContactSection() {
  const [done, setDone] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(fd)) });
    setDone(true);
  };
  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="text-sm text-white/40 tracking-widest uppercase mb-4">Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">無料相談・お問い合わせ</h2>
          <p className="text-white/50 text-lg">まずはお気軽にご相談ください。専門スタッフが丁寧にご対応します。</p>
        </motion.div>
        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-12 text-center border border-white/[0.06]">
            <div className="text-5xl mb-4">&#x2705;</div>
            <h3 className="text-2xl font-bold text-white mb-2">送信完了しました</h3>
            <p className="text-white/50">担当者より2営業日以内にご連絡いたします。</p>
          </motion.div>
        ) : (
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            onSubmit={onSubmit} className="glass rounded-2xl p-8 border border-white/[0.06] space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {([["company","会社名","株式会社○○"],["name","ご担当者名","山田 太郎"],["email","メールアドレス","example@co.jp"],["phone","電話番号","03-0000-0000"]] as const).map(([n,l,p]) => (
                <div key={n}>
                  <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase">{l}</label>
                  <input name={n} placeholder={p} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase">従業員数</label>
              <select name="employees" className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors">
                <option value="" className="bg-gray-900">選択してください</option>
                {["50名以下","51-100名","101-300名","301-1,000名","1,001名以上"].map(o => <option key={o} className="bg-gray-900">{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-2 tracking-wider uppercase">ご相談内容</label>
              <textarea name="message" rows={4} placeholder="ご相談内容をご記入ください" className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
            </div>
            <button type="submit" className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-xl text-sm transition-all">無料相談を予約する</button>
          </motion.form>
        )}
      </div>
    </section>
  );
}