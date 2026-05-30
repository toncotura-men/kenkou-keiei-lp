const svcs = ["認定支援","ウェルネス設計","健康分析","メンタルヘルス","産業保健"];
const info = ["会社概要","採用情報","ニュース","ブログ","プライバシーポリシー"];
export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" /></svg>
              </div>
              <span className="text-white font-semibold text-lg">Health<span className="gradient-text-blue">Force</span></span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">健康経営で、人と組織を強くする。<br />日本の企業をもっと元気に。</p>
          </div>
          <div>
            <h4 className="text-white/60 text-xs tracking-widest uppercase mb-4">サービス</h4>
            <ul className="space-y-2">{svcs.map(s => <li key={s}><a href="#services" className="text-white/30 hover:text-white/70 text-sm transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="text-white/60 text-xs tracking-widest uppercase mb-4">会社情報</h4>
            <ul className="space-y-2">{info.map(c => <li key={c}><a href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors">{c}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="text-white/60 text-xs tracking-widest uppercase mb-4">お問い合わせ</h4>
            <div className="space-y-2 text-sm text-white/30">
              <p>&#x1F4DE; 0120-000-000</p>
              <p>&#x2709; info@healthforce.jp</p>
              <p>&#x1F4AC; オンライン相談受付中</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.04] pt-8 text-center text-white/20 text-sm">
          &#169; 2025 HealthForce&#26666;&#24335;&#20250;&#31038; All rights reserved.
        </div>
      </div>
    </footer>
  );
}