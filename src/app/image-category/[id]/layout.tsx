import type { Metadata } from "next";
import { imageCategories } from "@/data/imagePrompts";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cat = imageCategories.find(c => c.id === id);
  if (!cat) return { title: "分类不存在" };
  return {
    title: `${cat.icon} ${cat.name} — AI 绘画提示词模板`,
    description: `${cat.name}相关的 AI 绘画提示词。${cat.description}，适用 Midjourney / Stable Diffusion / DALL·E。`,
    keywords: [cat.name, "AI绘画提示词", "Midjourney", cat.name + "提示词"],
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
