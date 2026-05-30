"use client";
import { motion } from "framer-motion";
const list = [
  { company: "製造業A社", size: "従業員850名", role: "人事部長", name: "田中 誠", quote: "HealthForceと取り組んだことで健康経営優良法人の認定を取得できました。離職率が大幅に改善し採用にも好影響が出ています。", result: "離職率 -28%" },
  { company: "IT企業B社", size: "従業員320名", role: "代表取締役", name: "鈴木 健", quote: "エンジニアのメンタルヘルス対策に悩んでいましたがデータに基づいた施策で休職者数を大きく減らすことができました。", result: "休職者数 -52%" },
  { company: "小売業C社", size: "従業員1,200名", role: "総務部", name: "佐藤 恵", quote: "全国の店舗スタッフの健康管理を一元化できました。従業員エンゲージメントも向上し顧客満足度にも繋がっています。", result: "エンゲージメント +41%" },
  { company: "物流会社D社", size: "従業員450名", role: "安全衛生管理者", name: "高橋 守", quote: "ドライバーの健康管理は難しい課題でしたがHealthForceのサポートで健診受診率100%を達成できました。", result: "健診受診率 100%" },
];
export default function TestimonialsSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-sm text-white/40 tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">お客様の声</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">全国500社以上の導入実績から</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {list.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/[0.06]">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-white font-semibold">{t.company}</div>
                  <div className="text-white/40 text-sm">{t.size} / {t.role}</div>
                </div>
                <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full shrink-0 ml-3">{t.result}</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4">&#x300C;{t.quote}&#x300D;</p>
              <div className="text-white/30 text-sm">— {t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}