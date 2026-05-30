$b = "C:\Users\tomoh\kenkou-keiei-lp"
New-Item -ItemType Directory -Force -Path "$b\src\components" | Out-Null
New-Item -ItemType Directory -Force -Path "$b\src\app\api\contact" | Out-Null

function Write-UTF8 ($path, $content) {
    [System.IO.File]::WriteAllText($path, $content, (New-Object System.Text.UTF8Encoding $false))
}

Write-UTF8 "$b\tsconfig.json" @'
{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
'@

Write-UTF8 "$b\next.config.ts" @'
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
'@

Write-UTF8 "$b\postcss.config.mjs" @'
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
'@

Write-UTF8 "$b\src\app\globals.css" @'
@import "tailwindcss";

:root {
  --background: #000000;
  --foreground: #f5f5f7;
  --accent: #2997ff;
  --accent-green: #30d158;
  --accent-gold: #ffd60a;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background: var(--background);
  color: var(--foreground);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

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

.glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
'@

Write-UTF8 "$b\src\app\layout.tsx" @'
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthForce - Corporate Health Management",
  description: "Strategic corporate health management. Supporting certification and wellness programs.",
  openGraph: {
    title: "HealthForce",
    description: "End-to-end corporate health management support.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
'@

Write-UTF8 "$b\src\app\page.tsx" @'
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
'@

Write-UTF8 "$b\src\app\api\contact\route.ts" @'
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, name, email, phone, employees, message } = body;
    if (!company || !name || !email) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
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
'@

Write-UTF8 "$b\src\components\Navigation.tsx" @'
"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
  { label: "Service", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Process", href: "#cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
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
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-green-400 to-yellow-400 z-[100]"
        style={{ width: progressWidth }}
      />
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={`px-6 md:px-12 py-4 transition-all duration-500 ${scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/10" : "bg-transparent"}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">Health<span className="gradient-text-blue">Force</span></span>
            </button>
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => handleNavClick(item.href)} className="text-sm text-white/70 hover:text-white transition-colors">
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="hidden md:flex">
              <button onClick={() => handleNavClick("#contact")} className="px-5 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-400 text-white rounded-full transition-all">
                Free Consultation
              </button>
            </div>
            <button className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px]" onClick={() => setMenuOpen(!menuOpen)}>
              <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} className="block h-[1.5px] bg-white w-full origin-center" />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} className="block h-[1.5px] bg-white w-full" />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} className="block h-[1.5px] bg-white w-full origin-center" />
            </button>
          </div>
        </div>
        <motion.div initial={false} animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }} className="overflow-hidden bg-black/95 backdrop-blur-2xl border-b border-white/10">
          <nav className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button key={item.href} onClick={() => handleNavClick(item.href)} className="text-left text-white/80 hover:text-white py-2 border-b border-white/5 text-lg">
                {item.label}
              </button>
            ))}
            <button onClick={() => handleNavClick("#contact")} className="mt-2 px-5 py-3 text-sm font-medium bg-blue-500 text-white rounded-full">Free Consultation</button>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}
'@

Write-UTF8 "$b\src\components\HeroSection.tsx" @'
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-black" />
        <motion.div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)", y: springY }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(circle, #30d158 0%, transparent 70%)" }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
          style={{ background: "radial-gradient(circle, #ffd60a 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
      </motion.div>

      <motion.div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ y: textY, opacity }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-white/70 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Corporate Health Management Certification Rate 98%
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="block text-white">People Thrive.</span>
          <span className="block gradient-text">Organizations Excel.</span>
          <span className="block text-white">Together.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Employee health drives organizational success.<br className="hidden md:block" />
          Strategic corporate health management maximizes human and organizational potential.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.1 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            onClick={() => { document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-semibold rounded-full text-base transition-all shadow-lg shadow-blue-500/30 w-full sm:w-auto">
            Free Consultation
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
            onClick={() => { document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-4 glass border border-white/20 text-white font-semibold rounded-full text-base transition-all hover:bg-white/10 w-full sm:w-auto">
            View Services
          </motion.button>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.4 }} className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[{ value: "500+", label: "Companies Supported" }, { value: "98%", label: "Certification Rate" }, { value: "3.2x", label: "Productivity Gain" }].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text-blue">{stat.value}</div>
              <div className="text-sm text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} style={{ opacity }}>
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }} transition={{ duration: 1.5, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}
'@

Write-UTF8 "$b\src\components\MarqueeSection.tsx" @'
"use client";

import { motion } from "framer-motion";

const items = [
  "Health Management Certification",
  "METI Certified",
  "MHLW Certified",
  "Occupational Physician",
  "ISO 45001",
  "Stress Check Implementer",
  "EAP Certified",
  "Health Data Plan",
  "Healthy Excellence Award",
  "Smart Wellness",
];

export default function MarqueeSection() {
  return (
    <div className="relative py-10 overflow-hidden border-y border-white/[0.04] bg-white/[0.01]">
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-black to-transparent" />
      <motion.div className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, "-50%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white/20 text-sm font-medium tracking-wider flex-shrink-0 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/40" />{item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
'@

Write-UTF8 "$b\src\components\ServicesSection.tsx" @'
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  { icon: "trophy", title: "Health Management\nCertification Support", description: "Full support from application documents for METI certification to post-certification branding.", color: "from-blue-500/20 to-blue-600/5", accent: "#2997ff", items: ["Document Preparation", "Audit Strategy", "Annual Renewal"] },
  { icon: "bulb", title: "Wellness\nProgram Design", description: "Evidence-based wellness programs customized for your company size and industry.", color: "from-green-500/20 to-green-600/5", accent: "#30d158", items: ["Mental Health Care", "Exercise Habits", "Nutrition Program"] },
  { icon: "chart", title: "Health Data\nAnalytics", description: "Integrated analysis of health checkups, stress checks, and wearable data to visualize organizational health risks.", color: "from-purple-500/20 to-purple-600/5", accent: "#bf5af2", items: ["Risk Scoring", "Department Heatmap", "ROI Measurement"] },
  { icon: "mind", title: "Mental Health\nSupport", description: "Comprehensive support from stress check implementation with occupational physicians to EAP program management.", color: "from-orange-500/20 to-orange-600/5", accent: "#ff9f0a", items: ["Stress Check", "High-Risk Follow-up", "Manager Training"] },
  { icon: "target", title: "Health Management\nConsulting", description: "From strategic planning aligned with management goals to building internal promotion structures.", color: "from-red-500/20 to-red-600/5", accent: "#ff375f", items: ["Strategy & KPI Design", "Structure Building", "Internal Promotion"] },
  { icon: "handshake", title: "Occupational Health\nOutsourcing", description: "Full outsourcing of occupational health functions for SMEs who have difficulty securing specialist personnel.", color: "from-teal-500/20 to-teal-600/5", accent: "#5ac8fa", items: ["Physician Coordination", "On-site Nurse Service", "Safety Committee"] },
];

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Services</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">Health Management<br /><span className="gradient-text">from Every Angle</span></h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">From certification to continuous improvement. Six services supporting your health management end-to-end.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.01 }}
              className="relative rounded-2xl p-8 border border-white/[0.08] cursor-pointer group overflow-hidden bg-white/[0.02]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 50%, ${service.accent}15 0%, transparent 70%)` }} />
              <div className="text-4xl mb-4">
                {service.icon === "trophy" && "🏆"}
                {service.icon === "bulb" && "💡"}
                {service.icon === "chart" && "📊"}
                {service.icon === "mind" && "🧘"}
                {service.icon === "target" && "🎯"}
                {service.icon === "handshake" && "🤝"}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 whitespace-pre-line leading-tight">{service.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{service.description}</p>
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.accent }} />{item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@

Write-UTF8 "$b\src\components\ResultsSection.tsx" @'
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
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: "+", label: "Companies", description: "SMEs to listed companies" },
  { value: 98, suffix: "%", label: "Cert Rate", description: "2x industry average" },
  { value: 32, suffix: "%", label: "Turnover Reduction", description: "Average across clients" },
  { value: 3.2, suffix: "x", label: "Productivity Gain", description: "Average ROI" },
];

const features = [
  { title: "Evidence-Based", description: "Scientific approach based on academic papers and government data for reliable results.", icon: "🔬" },
  { title: "Ongoing Support", description: "After certification, we keep improving the cycle for sustainable health management.", icon: "🤝" },
  { title: "Industry Expertise", description: "Specialized knowledge across 20+ industries including manufacturing, IT, retail, and healthcare.", icon: "🏭" },
  { title: "Digital + Human", description: "Merging technology and human expertise. Data-driven measures with warm, personal support.", icon: "💻" },
];

export default function ResultsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id="results" className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-[#020208]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #2997ff 0%, transparent 70%)" }} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-green-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Results</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Numbers Prove<br /><span className="gradient-text">Proven Results</span></h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center p-8 rounded-2xl glass border border-white/[0.06]">
              <div className="text-4xl md:text-5xl font-bold gradient-text-blue mb-2"><CountUp target={stat.value} suffix={stat.suffix} /></div>
              <div className="text-white font-semibold mb-1">{stat.label}</div>
              <div className="text-white/40 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-white">4 Reasons Clients Choose Us</h3>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }} className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
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
'@

Write-UTF8 "$b\src\components\ScrollFeature.tsx" @'
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Analysis &\nDiagnosis", description: "We collect and analyze quantitative data including health checkup results, stress check data, and turnover rates to scientifically identify your company's unique health challenges.", visual: { bg: "from-blue-900/30 to-blue-800/10", icon: "📋", items: ["Health Data Analysis", "Stress Check Review", "Lifestyle Risk Assessment"] } },
  { step: "02", title: "Strategy &\nRoadmap", description: "Aligned with management goals, we set KPIs and create a 3-year health management promotion plan from certification acquisition to continuous improvement.", visual: { bg: "from-green-900/30 to-green-800/10", icon: "🗺️", items: ["KPI & Goal Setting", "Priority Measures", "Budget Planning"] } },
  { step: "03", title: "Implementation &\nPrograms", description: "Based on the plan, we deploy wellness programs including proper health checkups, stress checks, and exercise, diet, and smoking cessation programs.", visual: { bg: "from-purple-900/30 to-purple-800/10", icon: "🚀", items: ["Wellness Programs", "Health Events", "Online Training"] } },
  { step: "04", title: "Measurement &\nImprovement", description: "We quantitatively measure and visualize the effectiveness of measures. Running PDCA cycles to continuously improve health management quality.", visual: { bg: "from-orange-900/30 to-orange-800/10", icon: "📈", items: ["ROI Reports", "Improvement Proposals", "Advanced Certification"] } },
];

export default function ScrollFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative py-32 px-6 overflow-hidden" id="cases">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020208] to-black" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Process</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Results-Driven<br /><span className="gradient-text">4-Step Process</span></h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">End-to-end from analysis to improvement. A systematic process for guaranteed results.</p>
        </motion.div>
        <div ref={containerRef} className="space-y-8">
          {steps.map((step, i) => (
            <motion.div key={step.step} initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 items-center`}>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-6xl font-bold text-white/10">{step.step}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white whitespace-pre-line">{step.title}</h3>
                <p className="text-white/50 leading-relaxed">{step.description}</p>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} className={`flex-1 rounded-2xl p-8 border border-white/[0.08] bg-gradient-to-br ${step.visual.bg}`}>
                <div className="text-5xl mb-6">{step.visual.icon}</div>
                <div className="space-y-3">
                  {step.visual.items.map((item, j) => (
                    <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: j * 0.1 + 0.3 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
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
'@

Write-UTF8 "$b\src\components\TestimonialsSection.tsx" @'
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  { company: "Manufacturing Co. A", size: "850 Employees", role: "HR Director", name: "M. Tanaka", quote: "Working with HealthForce, we obtained the Health Management Excellence certification in just one year. Beyond that, our turnover rate improved 28% year-over-year. The data-driven proposals are especially valuable.", result: "Turnover -28%", color: "from-blue-900/20" },
  { company: "IT Company B", size: "320 Employees", role: "CEO", name: "K. Suzuki", quote: "We were struggling with engineer mental health. HealthForce stress check analysis and individual follow-up programs halved our leave of absence cases. The certification also differentiates us in recruitment.", result: "Leave of Absence -52%", color: "from-green-900/20" },
  { company: "Retail Co. C", size: "1,200 Employees", role: "General Affairs", name: "E. Sato", quote: "They designed a wellness program covering all our nationwide store staff. Personalized health support was realized, and employee engagement scores improved significantly.", result: "Engagement +41%", color: "from-purple-900/20" },
  { company: "Logistics Co. D", size: "450 Employees", role: "Safety Manager", name: "M. Takahashi", quote: "Driver health management requires specialized know-how. HealthForce understands industry-specific risks and proposed practical programs. We achieved 100% health checkup attendance.", result: "Checkup Rate 100%", color: "from-orange-900/20" },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="text-orange-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Client Voices<br /><span className="gradient-text">Tell Everything</span></h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {testimonials.map((t, i) => (
              <button key={t.company} onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active === i ? "bg-white text-black" : "border border-white/10 text-white/50 hover:text-white/80"}`}>
                {t.company}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
              className={`rounded-3xl p-8 md:p-12 border border-white/[0.08] bg-gradient-to-br ${testimonials[active].color} to-transparent`}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex gap-1 mb-6">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">&#9733;</span>)}</div>
                  <blockquote className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">&ldquo;{testimonials[active].quote}&rdquo;</blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white font-bold">{testimonials[active].name[0]}</div>
                    <div>
                      <div className="text-white font-semibold">{testimonials[active].name}</div>
                      <div className="text-white/40 text-sm">{testimonials[active].role} / {testimonials[active].company}</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-64 flex flex-col justify-center">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
                    <div className="text-xs text-white/40 uppercase tracking-widest mb-3">Result</div>
                    <div className="text-3xl font-bold gradient-text-blue mb-2">{testimonials[active].result}</div>
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
'@

Write-UTF8 "$b\src\components\PricingSection.tsx" @'
"use client";

import { motion } from "framer-motion";

const plans = [
  { name: "Starter", nameEn: "Starter", price: "98,000", unit: "JPY/month", description: "For SMEs starting health management", badge: null, color: "border-white/10", btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: ["Health Mgmt Certification Support", "Stress Check Implementation", "Monthly Reports", "Dedicated Consultant", "Email & Chat Support"], notIncluded: ["Wellness Program Design", "Physician Coordination"] },
  { name: "Standard", nameEn: "Standard", price: "198,000", unit: "JPY/month", description: "For companies pursuing full health management", badge: "Most Popular", color: "border-blue-500/50", btnStyle: "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/25",
    features: ["All Starter Features", "Wellness Program Design", "Health Data Analytics", "Physician Coordination", "Employee App", "Quarterly Reports"], notIncluded: [] },
  { name: "Enterprise", nameEn: "Enterprise", price: "Custom", unit: "", description: "Custom plan for large organizations", badge: null, color: "border-white/10", btnStyle: "border border-white/20 text-white hover:bg-white/10",
    features: ["All Standard Features", "Group Company Coverage", "Dedicated Team", "Custom Dashboard", "Board Meeting Support", "24/7 Emergency Support"], notIncluded: [] },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Simple,<br /><span className="gradient-text">Transparent Pricing</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">No hidden costs. Only the services you need, at the right price.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }} whileHover={{ y: -8 }}
              className={`relative rounded-2xl p-8 border ${plan.color} ${plan.badge ? "bg-gradient-to-b from-blue-950/40 to-blue-900/10" : "bg-white/[0.02]"}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">{plan.badge}</span>
                </div>
              )}
              <div className="mb-6">
                <div className="text-white/40 text-xs font-mono tracking-widest uppercase mb-1">{plan.nameEn}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/50 text-sm">{plan.description}</p>
              </div>
              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price === "Custom" ? "" : "&#165;"}{plan.price}</span>
                  {plan.unit && <span className="text-white/40 text-sm mb-1">{plan.unit}</span>}
                </div>
                {plan.price === "Custom" && <div className="text-2xl font-bold text-white">Custom Quote</div>}
              </div>
              <button onClick={() => { document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 mb-8 ${plan.btnStyle}`}>
                {plan.price === "Custom" ? "Contact Us" : "Get Started Free"}
              </button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">&#10003;</span>{feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-white/25">
                    <span className="mt-0.5 flex-shrink-0">-</span>{feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-white/30 text-sm mt-10">
          * Initial fee separate / 12-month minimum contract / Varies by headcount and requirements
        </motion.p>
      </div>
    </section>
  );
}
'@

Write-UTF8 "$b\src\components\ContactSection.tsx" @'
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
          {[{ icon: "📞", label: "Phone", value: "03-0000-0000", sub: "Weekdays 9:00-18:00" }, { icon: "✉️", label: "Email", value: "hello@healthforce.jp", sub: "24/7 reception" }, { icon: "💬", label: "Online", value: "Zoom / Teams", sub: "Nationwide" }].map((item) => (
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
'@

Write-UTF8 "$b\src\components\Footer.tsx" @'
"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-black py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-400 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              </div>
              <span className="text-white font-semibold text-lg">Health<span className="gradient-text-blue">Force</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm">Strategic employee health promotion partner maximizing human and organizational potential.</p>
            <div className="flex gap-3 mt-6">
              {["X", "LinkedIn", "note"].map((social) => (
                <div key={social} className="px-3 py-1.5 rounded-lg border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-colors cursor-pointer">{social}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-3">
              {["Certification Support", "Wellness Programs", "Health Analytics", "Mental Health", "Occupational Health"].map((item) => (
                <li key={item}><span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-3">
              {["About", "Careers", "News", "Blog", "Privacy Policy"].map((item) => (
                <li key={item}><span className="text-white/40 text-sm hover:text-white/70 transition-colors cursor-pointer">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">&#169; 2025 HealthForce Inc. All rights reserved.</p>
          <div className="flex items-center gap-1 text-white/20 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400/60 animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
}
'@

Set-Location $b
git add .
$changes = git diff --cached --name-only
if ($changes) {
    git commit -m "fix: rebuild all files with UTF-8 no-BOM encoding"
    git push -u origin main
    Write-Host "`n✅ Done! Vercel will auto-redeploy." -ForegroundColor Green
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}