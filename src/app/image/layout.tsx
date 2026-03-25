import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🎨 图片提示词模板 — Midjourney / Stable Diffusion / DALL·E",
  description: "精选 AI 绘画提示词模板，涵盖人像、风景、插画、Logo、电商、海报等分类。中英文双版本，填空即用，一键复制到 Midjourney、Stable Diffusion、DALL·E。",
  keywords: ["Midjourney提示词", "Stable Diffusion提示词", "AI绘画提示词", "AI画图", "图片生成", "DALL-E", "文生图"],
};

export default function ImageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
