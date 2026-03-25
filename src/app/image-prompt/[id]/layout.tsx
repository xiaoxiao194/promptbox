import type { Metadata } from "next";
import { imagePrompts, imageCategories } from "@/data/imagePrompts";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const prompt = imagePrompts.find(p => p.id === id);
  if (!prompt) return { title: "提示词不存在" };
  const cat = imageCategories.find(c => c.id === prompt.category);
  return {
    title: `${prompt.title} — ${cat?.name || "AI绘画"}提示词`,
    description: `${prompt.description}。适用于 ${prompt.platforms.join("、")}。中英文双版本，填空即用，一键复制。`,
    keywords: [...prompt.tags, "AI绘画提示词", "Midjourney提示词", prompt.title],
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
