import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "⭐ 我的收藏",
  description: "查看你收藏的 AI 提示词模板，快速找到常用的 Prompt。",
};

export default function FavLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
