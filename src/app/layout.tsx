import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthForce 窶・蛛･蠎ｷ邨悟霧縺ｧ縲∽ｺｺ縺ｨ邨・ｹ斐ｒ蠑ｷ縺上☆繧・,
  description:
    "蠕捺･ｭ蜩｡縺ｮ蛛･蠎ｷ繧呈姶逡･逧・↓謗ｨ騾ｲ縲ょ▼蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ隱榊ｮ壼叙蠕玲髪謠ｴ縺九ｉ縲『ellness繝励Ο繧ｰ繝ｩ繝險ｭ險医・螳溯｣・∪縺ｧ縲∽ｼ∵･ｭ縺ｮ蛛･蠎ｷ邨悟霧繧剃ｸ豌鈴夊ｲｫ縺ｧ繧ｵ繝昴・繝医＠縺ｾ縺吶・,
  keywords: "蛛･蠎ｷ邨悟霧, 蛛･蠎ｷ邨悟霧蜆ｪ濶ｯ豕穂ｺｺ, 繧ｦ繧ｧ繝ｫ繝阪せ, 蠕捺･ｭ蜩｡蛛･蠎ｷ, 逕｣讌ｭ菫晏▼",
  openGraph: {
    title: "HealthForce 窶・蛛･蠎ｷ邨悟霧縺ｧ縲∽ｺｺ縺ｨ邨・ｹ斐ｒ蠑ｷ縺上☆繧・,
    description: "蠕捺･ｭ蜩｡縺ｮ蛛･蠎ｷ繧呈姶逡･逧・↓謗ｨ騾ｲ縲ゆｼ∵･ｭ縺ｮ蛛･蠎ｷ邨悟霧繧剃ｸ豌鈴夊ｲｫ縺ｧ繧ｵ繝昴・繝医・,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={\ h-full antialiased}>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
