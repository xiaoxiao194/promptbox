"use client";
import { useState, useMemo } from "react";
import { prompts, categories } from "@/data/prompts";
import { imagePrompts, imageCategories } from "@/data/imagePrompts";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [search, setSearch] = useState("");

  const hotPrompts = useMemo(() => prompts.filter(p => p.hot), []);
  const hotImagePrompts = useMemo(() => imagePrompts.filter(p => p.hot), []);

  // 搜索同时覆盖文字和图片模板
  const filteredResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const textResults = prompts
      .filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.platforms.some(pl => pl.toLowerCase().includes(q))
      )
      .map(p => ({ ...p, type: "text" as const, href: `/prompt/${p.id}` }));

    const imageResults = imagePrompts
      .filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.platforms.some(pl => pl.toLowerCase().includes(q))
      )
      .map(p => ({ ...p, type: "image" as const, href: `/image-prompt/${p.id}` }));

    return [...textResults, ...imageResults];
  }, [search]);

  const totalTemplates = prompts.length + imagePrompts.length;
  const totalCategories = categories.length + imageCategories.length;

  return (
    <main className="fade-in">
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          好 Prompt，好结果
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">
          填空式模板，小白也能写出专业提示词
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <span className="text-2xl font-extrabold gradient-text">{totalTemplates}+</span>
            <p className="text-xs text-gray-400 mt-0.5">精选模板</p>
          </div>
          <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <span className="text-2xl font-extrabold gradient-text">{totalCategories}</span>
            <p className="text-xs text-gray-400 mt-0.5">大分类</p>
          </div>
          <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
          <div className="text-center">
            <span className="text-2xl font-extrabold gradient-text">6</span>
            <p className="text-xs text-gray-400 mt-0.5">AI 平台</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 搜索提示词... 例：公众号、Midjourney、简历、Logo"
            className="w-full px-5 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 text-sm"
          />
          {search && filteredResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 max-h-80 overflow-y-auto z-50">
              {filteredResults.map((p) => (
                <Link key={p.id} href={p.href} className="block px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-50 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${p.type === "image" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-500" : "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500"}`}>
                      {p.type === "image" ? "🎨 图片" : "💬 文字"}
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{p.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 ml-14">{p.description}</p>
                </Link>
              ))}
            </div>
          )}
          {search && filteredResults.length === 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 text-center text-gray-400 text-sm z-50">
              没有找到相关提示词 😅
            </div>
          )}
        </div>

        {/* Hot tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["公众号", "Midjourney", "简历", "翻译", "知乎", "小红书", "Logo", "代码"].map((tag) => (
            <button key={tag} onClick={() => setSearch(tag)} className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Text Prompt Categories */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">💬 文字提示词</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/category/${cat.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.description}</p>
              <p className="text-xs text-indigo-500 mt-2">{prompts.filter(p => p.category === cat.id).length} 个模板 →</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Image Prompt Categories */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">🎨 图片提示词</h2>
          <Link href="/image" className="text-sm text-purple-500 hover:text-purple-600 dark:hover:text-purple-400 font-medium">查看全部 →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {imageCategories.map((cat) => (
            <Link key={cat.id} href={`/image-category/${cat.id}`} className="group bg-white dark:bg-gray-800/60 rounded-xl p-4 text-center border border-gray-100 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="text-2xl mb-2">{cat.icon}</div>
              <h3 className="font-bold text-xs text-gray-900 dark:text-white">{cat.name}</h3>
              <p className="text-[10px] text-purple-500 mt-1">{imagePrompts.filter(p => p.category === cat.id).length} 个</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Hot Text Prompts */}
      <section className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🔥 热门文字提示词</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotPrompts.map((p) => {
            const cat = categories.find(c => c.id === p.category);
            return (
              <Link key={p.id} href={`/prompt/${p.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{cat?.icon}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">{cat?.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.difficulty === "新手" ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"}`}>{p.difficulty}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">{p.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {p.platforms.map(pl => (
                    <span key={pl} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{pl}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Hot Image Prompts */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🎨 热门图片提示词</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotImagePrompts.map((p) => {
            const cat = imageCategories.find(c => c.id === p.category);
            return (
              <Link key={p.id} href={`/image-prompt/${p.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{cat?.icon}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium">{cat?.name}</span>
                  {p.platforms.map(pl => (
                    <span key={pl} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{pl}</span>
                  ))}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1">{p.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-400">#{t}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-gray-400 dark:text-gray-500">
        <p>✨ PromptBox — 免费 AI 提示词百宝箱</p>
        <p className="mt-1">所有提示词模板免费使用，持续更新中</p>
      </footer>
    </main>
  );
}
