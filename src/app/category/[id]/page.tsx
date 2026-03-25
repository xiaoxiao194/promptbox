"use client";
import { use, useMemo } from "react";
import { prompts, categories } from "@/data/prompts";
import Link from "next/link";

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const category = categories.find(c => c.id === id);
  const categoryPrompts = useMemo(() => prompts.filter(p => p.category === id), [id]);

  if (!category) return <div className="p-12 text-center text-gray-400">分类不存在</div>;

  return (
    <main className="fade-in">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Prompt<span className="gradient-text">Box</span></span>
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{category.icon} {category.name}</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-4xl">{category.icon}</span>
            {category.name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{category.description} · {categoryPrompts.length} 个模板</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryPrompts.map((p) => (
            <Link key={p.id} href={`/prompt/${p.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-2 mb-3">
                {p.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 font-medium">🔥 热门</span>}
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.difficulty === "新手" ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" : p.difficulty === "进阶" ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" : "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400"}`}>{p.difficulty}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">{p.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">#{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
