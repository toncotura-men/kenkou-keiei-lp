"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Contact
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              まずは無料相談から<br />はじめましょう
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              フォームにご記入いただくか、お電話でもお気軽にご連絡ください。
              専任コンサルタントが30分以内にご連絡いたします。
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: "お電話でのお問い合わせ",
                  value: "0120-XXX-XXX",
                  sub: "平日 9:00〜18:00",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "メールでのお問い合わせ",
                  value: "info@healthforce.co.jp",
                  sub: "24時間受付",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "所在地",
                  value: "東京都港区虎ノ門X-X-X",
                  sub: "虎ノ門駅 徒歩3分",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                    <div className="font-bold text-gray-900">{item.value}</div>
                    <div className="text-xs text-gray-400">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">送信完了しました</h3>
                <p className="text-gray-500 text-sm">担当者より30分以内にご連絡いたします。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-gray-900 mb-6">無料相談フォーム</h3>
                {[
                  { id: "company", label: "会社名", type: "text", placeholder: "株式会社〇〇", required: true },
                  { id: "name", label: "担当者名", type: "text", placeholder: "山田 太郎", required: true },
                  { id: "email", label: "メールアドレス", type: "email", placeholder: "example@company.co.jp", required: true },
                  { id: "phone", label: "電話番号", type: "tel", placeholder: "03-XXXX-XXXX", required: false },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-4 py-3 border
Write-UTF8 "$b\src\components\ContactSection.tsx" @'
"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              Contact
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              まずは無料相談から<br />はじめましょう
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              専任コンサルタントが30分以内にご連絡いたします。
              貴社の課題をヒアリングし、最適なプランをご提案します。
            </p>
            <div className="space-y-6">
              {[
                { label: "お電話", value: "0120-XXX-XXX", sub: "平日 9:00〜18:00" },
                { label: "メール", value: "info@healthforce.co.jp", sub: "24時間受付" },
                { label: "所在地", value: "東京都港区虎ノ門X-X-X", sub: "虎ノ門駅 徒歩3分" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">{item.label}</div>
                    <div className="font-bold text-gray-900">{item.value}</div>
                    <div className="text-xs text-gray-400">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">送信完了しました</h3>
                <p className="text-gray-500 text-sm">担当者より30分以内にご連絡いたします。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-gray-900 mb-6">無料相談フォーム</h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    会社名 <span className="text-red-500">*</span>
                  </label>
                  <input type="text" required placeholder="株式会社〇〇" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      担当者名 <span className="text-red-500">*</span>
                    </label>
                    <input type="text" required placeholder="山田 太郎" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      従業員数
                    </label>
                    <select className={inputClass}>
                      <option value="">選択してください</option>
                      <option>〜50名</option>
                      <option>51〜200名</option>
                      <option>201〜500名</option>
                      <option>501〜1,000名</option>
                      <option>1,001名以上</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input type="email" required placeholder="example@company.co.jp" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">電話番号</label>
                  <input type="tel" placeholder="03-XXXX-XXXX" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">お問い合わせ内容</label>
                  <textarea
                    rows={4}
                    placeholder="健康経営の推進について相談したい、など"
                    className={inputClass + " resize-none"}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 text-white rounded-full font-bold text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 active:translate-y-0"
                >
                  無料相談を申し込む
                </button>
                <p className="text-xs text-gray-400 text-center">
                  送信することで
                  <a href="#" className="underline">プライバシーポリシー</a>
                  に同意したものとみなします
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}