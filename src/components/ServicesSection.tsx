"use client";
import { motion } from "framer-motion";
const svcs = [
  { icon: "\u{1F3C6}", title: "健康経営優良法人\n認定支援", desc: "経産省の認定申請を完全サポート。書類作成から審査対策まで一貫して対応します。", tags: ["申請書類作成","審査対策","更新サポート"] },
  { icon: "\u{1F4AA}", title: "ウェルネス\nプログラム設計", desc: "従業員の心身の健康を総合的にサポートするプログラムを設計・実施します。", tags: ["メンタルヘルス","フィジカルケア","ストレス管理"] },
  { icon: "\u{1F4CA}", title: "健康データ\n分析・活用", desc: "健診データ・ストレスチェックをAIで分析し、効果的な施策を立案します。", tags: ["データ可視化","リスク予測","ROI測定"] },
  { icon: "\u{1F91D}", title: "産業保健\nコンサルティング", desc: "産業医・保健師と連携し、職場の健康管理体制を整備します。", tags: ["産業医選定","保健師連携","衛生委員会"] },
  { icon: "\u{1F4BB}", title: "デジタル健康\nマネジメント", desc: "最新のデジタルツールで従業員の健康状態をリアルタイムに把握・管理します。", tags: ["健康アプリ","ウェアラブル連携","ダッシュボード"] },
  { icon: "\u{1F4DA}", title: "健康経営\n教育・研修", desc: "経営層から従業員まで、健康経営の理解と実践力を高める研修を提供します。", tags: ["管理職研修","全社員研修","e-ラーニング"] },
];
export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-sm text-white/40 tracking-widest uppercase mb-4">Services</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">サービス一覧</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">健康経営の全フェーズをカバーする6つのサービス</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {svcs.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-6 border border-white/[0.06] hover:border-blue-500/30 transition-colors">
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3 whitespace-pre-line">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag, j) => (
                  <span key={j} className="text-xs text-blue-400/70 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}