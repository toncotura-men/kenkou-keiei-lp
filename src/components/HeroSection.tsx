"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { num: "500+", label: "導入企業数" },
  { num: "93%", label: "顧客満足度" },
  { num: "40%", label: "欠勤率削減" },
  { num: "15年", label: "支援実績" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-[55%] bg-emerald-50 rounded-l-[80px] hidden lg:block" />
      <div className="absolute top-40 right-32 w-80 h-80 bg-emerald-200 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-20 right-60 w-48 h-48 bg-amber-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-112px)]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 border border-emerald-200"
            >
              <span className="flex w-2 h-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              健康経営優良法人認定支援 No.1
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-[1.15] mb-6 tracking-tight"
            >
              従業員の健康が、
              <br />
              <span className="text-emerald-600 relative">
                企業の成長
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10 Q75 2 150 8 Q225 14 298 6" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              を加速させる
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-10 leading-relaxed"
            >
              戦略的な健康経営の導入から継続的な運用改善まで、
              専門チームが貴社の状況に合わせてトータルサポート。
              500社以上の導入実績で、持続可能な組織づくりを実現します。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200/60 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                無料相談を予約する
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-semibold text-base hover:border-emerald-400 hover:text-emerald-700 transition-all"
              >
                サービス詳細を見る
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-4 gap-4 pt-8 border-t border-gray-100"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <div className="text-2xl font-bold text-emerald-600">{s.num}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&auto=format&fit=crop"
                alt="健康的なオフィスで働くチーム"
                fill
                className="object-cover"
                priority
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4 border border-gray-100"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm">健康経営優良法人</div>
                <div className="text-xs text-gray-500">認定サポート率 98%</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-emerald-600 text-white rounded-2xl shadow-xl p-4 text-center"
            >
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs opacity-90 mt-0.5">導入企業</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}