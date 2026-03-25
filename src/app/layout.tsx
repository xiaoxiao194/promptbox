import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PromptBox — AI 提示词百宝箱",
  description: "免费的 AI 提示词模板库，涵盖写作、编程、翻译、营销等场景。一键复制到 ChatGPT、Claude、Kimi，让 AI 更好用。",
  keywords: "AI提示词,Prompt,ChatGPT提示词,Claude提示词,AI模板,提示词大全,Prompt模板",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
