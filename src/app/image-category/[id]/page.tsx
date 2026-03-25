"use client";
import { use } from "react";
import { imagePrompts, imageCategories } from "@/data/imagePrompts";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ImageCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const category = imageCategories.find(c => c.id === id);
  const catPrompts = imagePrompts
    .filter(p => p.category === id)
    .sort((a, b) => (a.hot && !b.hot ? -1 : !a.hot && b.hot ? 1 : 0));

  if (!category) return <div className="p-12 text-center text-gray-400">分类不存在</div>;

  return (
    <main className="fade-in">
      <Navbar breadcrumbs={[
        { label: "🎨 图片提示词", href: "/image" },
        { label: `${category.icon} ${category.name}` },
      ]} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span>
            {category.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{category.description} · {catPrompts.length} 个模板</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {catPrompts.map(p => (
            <Link key={p.id} href={`/image-prompt/${p.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-2 mb-3">
                {p.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 font-medium">🔥 热门</span>}
                {p.platforms.map(pl => (
                  <span key={pl} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{pl}</span>
                ))}
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">{p.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400">#{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
