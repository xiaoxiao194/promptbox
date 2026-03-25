import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://promptbox.vercel.app";
const siteName = "PromptBox — AI 提示词百宝箱";
const siteDesc = "免费 AI 提示词模板库，60+ 精选模板覆盖写作、编程、翻译、营销、Midjourney、Stable Diffusion 等场景。填空即用，一键复制到 ChatGPT / Claude / Kimi。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PromptBox — 免费 AI 提示词百宝箱 | ChatGPT / Midjourney 提示词模板",
    template: "%s | PromptBox",
  },
  description: siteDesc,
  keywords: [
    "AI提示词", "Prompt", "ChatGPT提示词", "Claude提示词", "Kimi提示词",
    "Midjourney提示词", "Stable Diffusion提示词", "AI绘画提示词",
    "提示词模板", "提示词大全", "Prompt模板", "AI写作", "AI编程",
    "AI工具", "免费提示词", "prompt engineering",
  ],
  authors: [{ name: "PromptBox" }],
  creator: "PromptBox",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName,
    title: "PromptBox — 免费 AI 提示词百宝箱",
    description: siteDesc,
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptBox — 免费 AI 提示词百宝箱",
    description: siteDesc,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "PromptBox",
              "url": siteUrl,
              "description": siteDesc,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "CNY",
              },
              "inLanguage": "zh-CN",
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
