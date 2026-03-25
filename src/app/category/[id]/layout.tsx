import type { Metadata } from "next";
import { categories } from "@/data/prompts";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cat = categories.find(c => c.id === id);
  if (!cat) return { title: "分类不存在" };
  return {
    title: `${cat.icon} ${cat.name} — AI 提示词模板`,
    description: `${cat.name}相关的 AI 提示词模板集合。${cat.description}，免费使用，填空即用，一键复制到 ChatGPT / Claude。`,
    keywords: [cat.name, "AI提示词", "Prompt模板", `${cat.name}提示词`],
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
