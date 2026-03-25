import type { Metadata } from "next";
import { prompts, categories } from "@/data/prompts";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const prompt = prompts.find(p => p.id === id);
  if (!prompt) return { title: "提示词不存在" };
  const cat = categories.find(c => c.id === prompt.category);
  return {
    title: `${prompt.title} — ${cat?.name || "AI"}提示词模板`,
    description: `${prompt.description}。适用于 ${prompt.platforms.join("、")}，${prompt.difficulty}难度。免费使用，填空即用，一键复制。`,
    keywords: [...prompt.tags, "AI提示词", "Prompt模板", prompt.title],
  };
}

export default function PromptLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
