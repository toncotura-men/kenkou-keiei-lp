import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "HealthForce — 健康経営で、人と組織を強くする",
  description: "従業員の健康を戦略的に推進。健康経営優良法人認定取得支援からウェルネスプログラム設計まで一気通貫でサポート。",
  openGraph: { title: "HealthForce", description: "企業の健康経営を一気通貫でサポート。", type: "website" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}