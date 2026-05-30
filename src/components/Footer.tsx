import Link from "next/link";

const footerLinks = {
  "サービス": [
    { label: "健康経営戦略立案", href: "#services" },
    { label: "ストレスチェック支援", href: "#services" },
    { label: "産業医・保健師手配", href: "#services" },
    { label: "データ分析・レポート", href: "#services" },
  ],
  "HealthForce": [
    { label: "会社概要", href: "#" },
    { label: "導入事例", href: "#testimonials" },
    { label: "料金プラン", href: "#pricing" },
    { label: "採用情報", href: "#" },
  ],
  "サポート": [
    { label: "よくある質問", href: "#" },
    { label: "お問い合わせ", href: "#contact" },
    { label: "プライバシーポリシー", href: "#" },
    { label: "利用規約", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Health<span className="text-emerald-400">Force</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-6">
              従業員の健康が企業の成長を加速させる。
              戦略的な健康経営で、持続可能な組織を実現します。
            </p>
            <div className="flex gap-3">
              {["twitter", "linkedin", "facebook"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">{s}</span>
                  <div className="w-4 h-4 bg-gray-500 rounded-sm" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-emerald-400 transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} HealthForce Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs">健康経営優良法人2024（大規模法人部門）認定</span>
          </div>
        </div>
      </div>
    </footer>
  );
}