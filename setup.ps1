# ============================================================
# HealthForce 健康経営LP - Setup Script
# ============================================================

# 1. Create Next.js app
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git

# 2. Install dependencies
npm install framer-motion gsap @supabase/supabase-js react-intersection-observer

# 3. Create directory structure
New-Item -ItemType Directory -Force -Path "src/app/api/contact" | Out-Null
New-Item -ItemType Directory -Force -Path "src/components" | Out-Null

# ============================================================
# src/app/globals.css
# ============================================================
Set-Content -Path "src/app/globals.css" -Encoding UTF8 -Value @"
@import "tailwindcss";

:root {
  --background: #000000;
  --foreground: #f5f5f7;
  --accent: #2997ff;
  --accent-green: #30d158;
  --accent-gold: #ffd60a;
  --surface: #1d1d1f;
  --surface-2: #2d2d2f;
  --border: rgba(255,255,255,0.1);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #2997ff 0%, #30d158 50%, #ffd60a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-blue {
  background: linear-gradient(135deg, #2997ff 0%, #5ac8fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: #000;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 3px;
}

/* Section transitions */
.section-fade-in {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.section-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Noise texture overlay */
.noise::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: 0.4;
}
"@

# ============================================================
# src/app/layout.tsx
# ============================================================
Set-Content -Path "src/app/layout.tsx" -Encoding UTF8 -Value @"
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthForce — 健康経営で、人と組織を強くする",
  description:
    "従業員の健康を戦略的に推進。健康経営優良法人認定取得支援から、wellnessプログラム設計・実装まで、企業の健康経営を一気通貫でサポートします。",
  keywords: "健康経営, 健康経営優良法人, ウェルネス, 従業員健康, 産業保健",
  openGraph: {
    title: "HealthForce — 健康経営で、人と組織を強くする",
    description: "従業員の健康を戦略的に推進。企業の健康経営を一気通貫でサポート。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`\${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
"@

# ============================================================
# src/app/page.tsx
# ============================================================
Set-Content -Path "src/app/page.tsx" -Encoding UTF8 -Value @"
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import ScrollFeature from "@/components/ScrollFeature";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navigation />
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <ResultsSection />
      <ScrollFeature />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
"@

# ============================================================
# src/app/api/contact/route.ts
# ============================================================
Set-Content -Path "src/app/api/contact/route.ts" -Encoding UTF8 -Value @"
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, name, email, phone, employees, message } = body;

    if (!company || !name || !email) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error } = await supabase.from("contact_submissions").insert([
        { company, name, email, phone, employees, message },
      ]);
      if (error) console.error("Supabase insert error:", error);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
"@

# ============================================================
# src/components/Navigation.tsx
# ============================================================
Set-Content -Path "src/components/Navigation.tsx" -Encoding UTF8 -Value @"
"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
  { label: "サービス", href: "#services" },
  { label: "実績", href: "#results" },
  { label: "事例", href: "#cases" },
  { label: "料金", href: "#pricing" },
  { label: "お問い合わせ", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 z-[100]"
        style={{ width: progressWidth }}
      />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div
          className={\`px-6 md:px-12 py-4 transition-all duration-500 \${
            scrolled
              ? "bg-black/80 backdrop-blur-2xl border-b border-white/10"
              : "bg-transparent"
          }\`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                Health<span className="gradient-text-blue">Force</span>
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleNavClick("#contact")}
                className="px-5 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-400 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
              >
                無料相談
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
                className="block h-[1.5px] bg-white w-full origin-center"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-[1.5px] bg-white w-full"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
                className="block h-[1.5px] bg-white w-full origin-center"
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          className="overflow-hidden bg-black/95 backdrop-blur-2xl border-b border-white/10"
        >
          <nav className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-left text-white/80 hover:text-white py-2 border-b border-white/5 text-lg"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("#contact")}
              className="mt-2 px-5 py-3 text-sm font-medium bg-blue-500 text-white rounded-full text-center"
            >
              無料相談
            </button>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}
"@

# ============================================================
# src/components/HeroSection.tsx
# ============================================================
Set-Content -Path "src/components/HeroSection.tsx" -Encoding UTF8 -Value @"
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        {/* Deep space gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black" />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "radial-gradient(circle, #2997ff 0%, transparent 70%)",
            y: springY,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "radial-gradient(circle, #30d158 0%, transparent 70%)",
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: "radial-gradient(circle, #ffd60a 0%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: \`
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            \`,
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            健康経営優良法人認定取得率 98%
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="block text-white">人が輝く</span>
          <span className="block gradient-text">健康経営</span>
          <span className="block text-white">を、ともに。</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          従業員の健康が、企業の未来をつくる。
          <br className="hidden md:block" />
          戦略的な健康経営で、人と組織のポテンシャルを最大化します。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full text-base transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/40 w-full sm:w-auto"
          >
            無料で相談する
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 glass border border-white/20 text-white font-semibold rounded-full text-base transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
          >
            サービスを見る ↓
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          {[
            { value: "500+", label: "支援企業数" },
            { value: "98%", label: "認定取得率" },
            { value: "3.2x", label: "生産性向上" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-blue">{stat.value}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
"@

# ============================================================
# src/components/MarqueeSection.tsx
# ============================================================
Set-Content -Path "src/components/MarqueeSection.tsx" -Encoding UTF8 -Value @"
"use client";

import { motion } from "framer-motion";

const certifications = [
  "健康経営優良法人認定",
  "経済産業省認定",
  "厚生労働省認定",
  "産業医連携",
  "ISO 45001",
  "ストレスチェック実施機関",
  "EAP認定",
  "データヘルス計画",
  "健康優良企業",
  "スマートウェルネス",
];

export default function MarqueeSection() {
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/[0.04] bg-white/[0.01]">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />

      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...certifications, ...certifications].map((item, i) => (
          <span key={i} className="text-white/20 text-sm font-medium tracking-wider flex-shrink-0 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
"@

# ============================================================
# src/components/ServicesSection.tsx
# ============================================================
Set-Content -Path "src/components/ServicesSection.tsx" -Encoding UTF8 -Value @"
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "🏆",
    title: "健康経営優良法人\n認定取得支援",
    description:
      "経済産業省の健康経営優良法人認定制度に向けた申請書類作成から、認定後のブランディングまで完全サポート。",
    color: "from-blue-500/20 to-blue-600/5",
    accent: "#2997ff",
    items: ["申請書類一括作成", "審査基準クリア戦略", "毎年の更新管理"],
  },
  {
    icon: "💡",
    title: "ウェルネス\nプログラム設計",
    description:
      "従業員の健康データを分析し、エビデンスベースの健康増進プログラムを企業規模・業種に応じてカスタマイズ設計。",
    color: "from-green-500/20 to-green-600/5",
    accent: "#30d158",
    items: ["メンタルヘルスケア", "運動習慣化支援", "食生活改善プログラム"],
  },
  {
    icon: "📊",
    title: "健康データ\nアナリティクス",
    description:
      "定期健康診断・ストレスチェック・ウェアラブルデータを統合分析。組織の健康リスクを可視化し、先手の対策を実現。",
    color: "from-purple-500/20 to-purple-600/5",
    accent: "#bf5af2",
    items: ["リスクスコアリング", "部署別ヒートマップ", "ROI測定・報告"],
  },
  {
    icon: "🧘",
    title: "メンタルヘルス\n対策強化",
    description:
      "産業医・臨床心理士と連携したストレスチェック実施・分析から、EAPプログラムの導入・運用まで包括支援。",
    color: "from-orange-500/20 to-orange-600/5",
    accent: "#ff9f0a",
    items: ["ストレスチェック実施", "高ストレス者フォロー", "管理職向け研修"],
  },
  {
    icon: "🎯",
    title: "健康経営\nコンサルティング",
    description:
      "経営戦略と連動した健康経営推進計画の策定から、社内推進体制の構築・人材育成まで伴走型でサポート。",
    color: "from-red-500/20 to-red-600/5",
    accent: "#ff375f",
    items: ["戦略立案・KPI設計", "推進体制構築", "社内浸透支援"],
  },
  {
    icon: "🤝",
    title: "産業保健\nアウトソーシング",
    description:
      "産業医選任から保健師活用まで、専門人材の確保が難しい中小企業向けに産業保健機能を丸ごとアウトソース。",
    color: "from-teal-500/20 to-teal-600/5",
    accent: "#5ac8fa",
    items: ["産業医コーディネート", "保健師常駐サービス", "衛生委員会運営"],
  },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Services
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            健康経営を、
            <br />
            <span className="gradient-text">あらゆる角度から</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            認定取得から定着・改善まで。貴社の健康経営を一気通貫でサポートする6つのサービス。
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="relative rounded-2xl p-8 border border-white/[0.08] cursor-pointer group overflow-hidden"
              style={{
                background: \`linear-gradient(135deg, \${service.color
                  .replace("from-", "")
                  .replace(" to-", ", ")})\`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: \`radial-gradient(circle at 50% 50%, \${service.accent}15 0%, transparent 70%)\`,
                }}
              />

              {/* Icon */}
              <div className="text-4xl mb-4">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 whitespace-pre-line leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Items */}
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: service.accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Arrow */}
              <motion.div
                className="absolute bottom-6 right-6 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:border-white/30 group-hover:text-white/70 transition-all duration-300"
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"@

# ============================================================
# src/components/ResultsSection.tsx
# ============================================================
Set-Content -Path "src/components/ResultsSection.tsx" -Encoding UTF8 -Value @"
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "支援企業数", description: "中小企業から上場企業まで" },
  { value: 98, suffix: "%", label: "認定取得率", description: "業界平均の2倍以上" },
  { value: 32, suffix: "%", label: "離職率削減", description: "平均的な支援企業での実績" },
  { value: 3.2, suffix: "x", label: "生産性向上", description: "投資対効果の平均値" },
];

const features = [
  {
    title: "エビデンスベース",
    description: "学術論文・厚生労働省データに基づいた科学的アプローチで確実な成果を出します。",
    icon: "🔬",
  },
  {
    title: "伴走型サポート",
    description: "認定取得後も継続して改善サイクルを回し、持続的な健康経営を実現します。",
    icon: "🤝",
  },
  {
    title: "業種特化ノウハウ",
    description: "製造・IT・小売・医療など20業種以上の専門知識で、業種固有の課題に対応。",
    icon: "🏭",
  },
  {
    title: "デジタル×ヒューマン",
    description: "テクノロジーと人の力を融合。データドリブンな施策を温かみのある支援で実行。",
    icon: "💻",
  },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#020208]" />
        {/* Decorative circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Results
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            数字が証明する、
            <br />
            <span className="gradient-text">確かな実績</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl glass border border-white/[0.06]"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text-blue mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-white/40 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Why us */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            選ばれ続ける、4つの理由
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h4 className="text-white font-bold text-lg mb-2">{feature.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"@

# ============================================================
# src/components/ScrollFeature.tsx
# ============================================================
Set-Content -Path "src/components/ScrollFeature.tsx" -Encoding UTF8 -Value @"
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "現状分析・\n課題特定",
    description:
      "健康診断データ、ストレスチェック結果、離職率など定量データを収集・分析。貴社固有の健康課題を科学的に特定します。",
    visual: {
      bg: "from-blue-900/30 to-blue-800/10",
      icon: "📋",
      items: ["健診データ分析", "ストレスチェック精査", "生活習慣リスク評価"],
    },
  },
  {
    step: "02",
    title: "戦略策定・\nロードマップ作成",
    description:
      "分析結果と経営目標を照らし合わせ、KPIを設定。認定取得から継続改善まで、3カ年の健康経営推進計画を策定します。",
    visual: {
      bg: "from-green-900/30 to-green-800/10",
      icon: "🗺️",
      items: ["KPI・目標設定", "施策優先順位化", "予算計画策定"],
    },
  },
  {
    step: "03",
    title: "施策実施・\nプログラム導入",
    description:
      "計画に基づき、健診・ストレスチェックの適切な実施から、運動・食事・禁煙などのウェルネスプログラムを順次展開。",
    visual: {
      bg: "from-purple-900/30 to-purple-800/10",
      icon: "🚀",
      items: ["ウェルネスプログラム", "健康イベント企画", "オンライン研修"],
    },
  },
  {
    step: "04",
    title: "効果測定・\n継続改善",
    description:
      "施策の効果を定量的に測定・可視化。PDCAサイクルを回しながら健康経営の質を高め続け、上位認定を目指します。",
    visual: {
      bg: "from-orange-900/30 to-orange-800/10",
      icon: "📈",
      items: ["ROI可視化レポート", "改善提案・実施", "上位認定へのステップ"],
    },
  },
];

export default function ScrollFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="cases">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020208] to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Process
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            成果を生む、
            <br />
            <span className="gradient-text">4ステップ</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            分析から改善まで一気通貫。確実な成果を出すための体系的なプロセス。
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={containerRef} className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={\`flex flex-col \${
                i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-8 items-center\`}
            >
              {/* Text side */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-bold text-white/10">{step.step}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white whitespace-pre-line">
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed">{step.description}</p>
              </div>

              {/* Visual side */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={\`flex-1 rounded-2xl p-8 border border-white/[0.08] bg-gradient-to-br \${step.visual.bg}\`}
              >
                <div className="text-5xl mb-6">{step.visual.icon}</div>
                <div className="space-y-3">
                  {step.visual.items.map((item, j) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.1 + 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-green-400" />
                      <span className="text-white/70 text-sm font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
"@

# ============================================================
# src/components/TestimonialsSection.tsx
# ============================================================
Set-Content -Path "src/components/TestimonialsSection.tsx" -Encoding UTF8 -Value @"
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    company: "製造業 A社",
    size: "従業員数 850名",
    role: "人事部長",
    name: "田中 雅子",
    quote:
      "HealthForceと組んで1年で健康経営優良法人（大規模法人部門）の認定を取得。それだけでなく、離職率が前年比28%改善しました。データに基づく施策提案が特に助かっています。",
    result: "離職率 −28%",
    industry: "製造",
    color: "from-blue-900/20",
  },
  {
    company: "IT企業 B社",
    size: "従業員数 320名",
    role: "CEO",
    name: "鈴木 健二",
    quote:
      "エンジニアのメンタルヘルス対策で悩んでいました。HealthForceのストレスチェック分析と個別フォロープログラムで、休職者数が半減。採用でも「健康経営優良法人」の認定が差別化になっています。",
    result: "休職者数 −52%",
    industry: "IT",
    color: "from-green-900/20",
  },
  {
    company: "小売業 C社",
    size: "従業員数 1,200名",
    role: "総務部長",
    name: "佐藤 恵美",
    quote:
      "全国展開の店舗スタッフも含めたウェルネスプログラムを設計してもらいました。一人ひとりに合った健康支援が実現でき、スタッフのエンゲージメントスコアが大幅に向上しました。",
    result: "エンゲージメント +41%",
    industry: "小売",
    color: "from-purple-900/20",
  },
  {
    company: "物流業 D社",
    size: "従業員数 450名",
    role: "安全衛生管理者",
    name: "高橋 誠",
    quote:
      "ドライバーの健康管理は特殊なノウハウが必要です。HealthForceは業種固有のリスクを熟知しており、実践的なプログラムを提案してくれました。健診受診率も100%を達成しました。",
    result: "健診受診率 100%",
    industry: "物流",
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
            お客様の声が、
            <br />
            <span className="gradient-text">全てを語っています</span>
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
                className={\`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 \${
                  active === i
                    ? "bg-white text-black"
                    : "border border-white/10 text-white/50 hover:text-white/80"
                }\`}
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
              className={\`rounded-3xl p-8 md:p-12 border border-white/[0.08] bg-gradient-to-br \${testimonials[active].color} to-transparent\`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
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
                      成果
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
"@

# ============================================================
# src/components/PricingSection.tsx
# ============================================================
Set-Content -Path "src/components/PricingSection.tsx" -Encoding UTF8 -Value @"
"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "スターター",
    nameEn: "Starter",
    price: "98,000",
    unit: "円/月",
    description: "健康経営を始めたい中小企業向け",
    badge: null,
    color: "border-white/10",
    btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: [
      "健康経営優良法人認定申請支援",
      "ストレスチェック実施・集計",
      "月次レポート提供",
      "専任コンサルタント1名",
      "メール・チャットサポート",
    ],
    notIncluded: [
      "ウェルネスプログラム設計",
      "産業医コーディネート",
    ],
  },
  {
    name: "スタンダード",
    nameEn: "Standard",
    price: "198,000",
    unit: "円/月",
    description: "本格的な健康経営推進を目指す企業向け",
    badge: "人気No.1",
    color: "border-blue-500/50",
    btnStyle: "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25",
    features: [
      "スターターの全機能",
      "ウェルネスプログラム設計・実施",
      "健康データアナリティクス",
      "産業医コーディネート",
      "従業員向けアプリ提供",
      "四半期経営レポート",
    ],
    notIncluded: [],
  },
  {
    name: "エンタープライズ",
    nameEn: "Enterprise",
    price: "要相談",
    unit: "",
    description: "大規模組織・グループ企業向けカスタムプラン",
    badge: null,
    color: "border-white/10",
    btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: [
      "スタンダードの全機能",
      "グループ会社一括対応",
      "専任チーム体制",
      "カスタムダッシュボード",
      "経営会議への同席・報告",
      "24時間緊急サポート",
    ],
    notIncluded: [],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            シンプルで
            <br />
            <span className="gradient-text">透明な料金体系</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            隠れたコストは一切なし。必要なサービスだけを、適正価格で。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={\`relative rounded-2xl p-8 border \${plan.color} \${
                plan.badge ? "bg-gradient-to-b from-blue-950/40 to-blue-900/10" : "bg-white/[0.02]"
              }\`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">
                  {plan.nameEn}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === "要相談" ? "" : "¥"}
                    {plan.price}
                  </span>
                  {plan.unit && (
                    <span className="text-white/40 text-sm mb-1">{plan.unit}</span>
                  )}
                </div>
                {plan.price === "要相談" && (
                  <div className="text-2xl font-bold text-white">要相談</div>
                )}
              </div>

              <button
                onClick={() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={\`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 mb-8 \${plan.btnStyle}\`}
              >
                {plan.price === "要相談" ? "お問い合わせ" : "無料で始める"}
              </button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/25">
                    <span className="mt-0.5 flex-shrink-0">–</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/30 text-sm mt-10"
        >
          ※ 初期費用別途 / 契約期間12ヶ月〜 / 従業員数・要件により異なります
        </motion.p>
      </div>
    </section>
  );
}
"@

# ============================================================
# src/components/ContactSection.tsx
# ============================================================
Set-Content -Path "src/components/ContactSection.tsx" -Encoding UTF8 -Value @"
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
            まず、話してみる。
            <br />
            <span className="gradient-text">それだけで十分です。</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            無料相談は60分。健康経営の現状と課題を一緒に整理します。
            <br />
            提案・営業はしません。
          </p>
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
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  お問い合わせありがとうございます
                </h3>
                <p className="text-white/50">
                  24時間以内にご連絡いたします。お待ちください。
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-2 border border-white/20 text-white/70 rounded-full text-sm hover:bg-white/10 transition-colors"
                >
                  別のお問い合わせ
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
                    会社名 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="株式会社〇〇"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    お名前 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="山田 太郎"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    メールアドレス <span className="text-red-400">*</span>
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
                    電話番号
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
                    従業員数
                  </label>
                  <select
                    name="employees"
                    value={form.employees}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" className="bg-black">選択してください</option>
                    <option value="~50" className="bg-black">50名以下</option>
                    <option value="51-100" className="bg-black">51〜100名</option>
                    <option value="101-300" className="bg-black">101〜300名</option>
                    <option value="301-1000" className="bg-black">301〜1000名</option>
                    <option value="1001+" className="bg-black">1001名以上</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-white/40 uppercase tracking-wider block mb-2">
                    ご相談内容・ご質問
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="例：健康経営優良法人の認定取得を検討しています。何から始めればよいか相談したい。"
                    className={\`\${inputClass} resize-none\`}
                  />
                </div>

                {status === "error" && (
                  <div className="md:col-span-2 text-red-400 text-sm text-center">
                    送信に失敗しました。お手数ですがしばらくしてから再度お試しください。
                  </div>
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
                        送信中...
                      </span>
                    ) : (
                      "無料相談を申し込む"
                    )}
                  </motion.button>
                  <p className="text-white/30 text-xs">
                    送信後24時間以内にご連絡します
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact alternatives */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          {[
            { icon: "📞", label: "電話", value: "03-0000-0000", sub: "平日 9:00〜18:00" },
            { icon: "✉️", label: "メール", value: "hello@healthforce.jp", sub: "24時間受付" },
            { icon: "💬", label: "オンライン相談", value: "Zoom / Teams 対応", sub: "全国どこでも" },
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
"@

# ============================================================
# src/components/Footer.tsx
# ============================================================
Set-Content -Path "src/components/Footer.tsx" -Encoding UTF8 -Value @"
"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">
                Health<span className="gradient-text-blue">Force</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">
              従業員の健康を戦略的に推進し、人と組織のポテンシャルを最大化する健康経営パートナー。
            </p>
            <div className="flex gap-3 mt-6">
              {["X", "LinkedIn", "note"].map((social) => (
                <div
                  key={social}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-colors cursor-pointer"
                >
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              サービス
            </h4>
            <ul className="space-y-3">
              {[
                "健康経営優良法人認定支援",
                "ウェルネスプログラム設計",
                "健康データアナリティクス",
                "メンタルヘルス対策",
                "産業保健アウトソーシング",
              ].map((item) => (
                <li key={item}>
                  <span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
              会社情報
            </h4>
            <ul className="space-y-3">
              {["会社概要", "採用情報", "ニュース", "ブログ", "プライバシーポリシー"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © 2025 HealthForce Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
            全システム正常稼働中
          </div>
        </div>
      </div>
    </footer>
  );
}
"@

# ============================================================
# .env.local
# ============================================================
Set-Content -Path ".env.local" -Encoding UTF8 -Value @"
NEXT_PUBLIC_SUPABASE_URL=https://lldgyrilnimrbnnwqyhw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZGd5cmlsbmltcmJubndxeWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODgwNTYsImV4cCI6MjA5NTQ2NDA1Nn0.2SlVHeXQocrq4Db7Le4ZF0i0fQ8LYH8x_YsxPxE4u1Y
"@

# ============================================================
# Git: commit and push
# ============================================================
git add .
git commit -m "feat: 健康経営LP initial commit"
git push -u origin main
