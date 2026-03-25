"use client";
import { useState, useMemo } from "react";
import { prompts, categories } from "@/data/prompts";
import { imagePrompts, imageCategories } from "@/data/imagePrompts";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"text" | "image">("text");

  const hotForTab = useMemo(() => {
    if (tab === "text") {
      return prompts.filter(p => p.hot).slice(0, 6).map(p => ({
        id: p.id, title: p.title, desc: p.description, type: "text" as const,
        href: `/prompt/${p.id}`, tags: p.platforms, icon: categories.find(c => c.id === p.category)?.icon || "",
        catName: categories.find(c => c.id === p.category)?.name || "",
      }));
    } else {
      return imagePrompts.filter(p => p.hot).slice(0, 6).map(p => ({
        id: p.id, title: p.title, desc: p.description, type: "image" as const,
        href: `/image-prompt/${p.id}`, tags: p.platforms, icon: imageCategories.find(c => c.id === p.category)?.icon || "",
        catName: imageCategories.find(c => c.id === p.category)?.name || "",
      }));
    }
  }, [tab]);

  const filteredResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    const textR = prompts
      .filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)) || p.platforms.some(pl => pl.toLowerCase().includes(q)))
      .map(p => ({ id: p.id, title: p.title, desc: p.description, type: "text" as const, href: `/prompt/${p.id}` }));
    const imgR = imagePrompts
      .filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)) || p.platforms.some(pl => pl.toLowerCase().includes(q)))
      .map(p => ({ id: p.id, title: p.title, desc: p.description, type: "image" as const, href: `/image-prompt/${p.id}` }));
    return [...textR, ...imgR];
  }, [search]);

  const totalTemplates = prompts.length + imagePrompts.length;

  const currentCategories = tab === "text" ? categories : imageCategories;
  const currentPrompts = tab === "text" ? prompts : imagePrompts;

  return (
    <main className="fade-in">
      <Navbar />

      {/* Hero — 简洁大气 */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          好 Prompt，好结果
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-3">
          填空式模板，小白也能写出专业提示词
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-10">
          {totalTemplates}+ 精选模板 · 覆盖 ChatGPT / Claude / Midjourney 等 6 大平台
        </p>

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
              {filteredResults.slice(0, 10).map((p) => (
                <Link key={p.id} href={p.href} className="block px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-50 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${p.type === "image" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-500" : "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500"}`}>
                      {p.type === "image" ? "🎨 图片" : "💬 文字"}
                    </span>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{p.title}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 pl-14">{p.desc}</p>
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

        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["公众号", "Midjourney", "简历", "翻译", "知乎", "小红书", "Logo", "代码"].map((tag) => (
            <button key={tag} onClick={() => setSearch(tag)} className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* 分类浏览 — Tab 切换文字/图片 */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-1 mb-6">
          <button
            onClick={() => setTab("text")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tab === "text" ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            💬 文字提示词
          </button>
          <button
            onClick={() => setTab("image")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tab === "image" ? "bg-purple-500 text-white shadow-md shadow-purple-500/20" : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            🎨 图片提示词
          </button>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-4 ${tab === "image" ? "lg:grid-cols-4" : ""} gap-4`}>
          {currentCategories.map((cat) => (
            <Link
              key={cat.id}
              href={tab === "text" ? `/category/${cat.id}` : `/image-category/${cat.id}`}
              className={`group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:-translate-y-1 transition-all ${tab === "image" ? "hover:border-purple-200 dark:hover:border-purple-700" : "hover:border-indigo-200 dark:hover:border-indigo-700"}`}
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className={`font-bold text-gray-900 dark:text-white transition-colors ${tab === "image" ? "group-hover:text-purple-600 dark:group-hover:text-purple-400" : "group-hover:text-indigo-600 dark:group-hover:text-indigo-400"}`}>{cat.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.description}</p>
              <p className={`text-xs mt-2 ${tab === "image" ? "text-purple-500" : "text-indigo-500"}`}>
                {currentPrompts.filter(p => p.category === cat.id).length} 个模板 →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 精选推荐 — 混合文字+图片，只展示 6 个 */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          🔥 {tab === "text" ? "热门文字提示词" : "热门图片提示词"}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotForTab.map((p) => (
            <Link key={p.id} href={p.href} className={`group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:-translate-y-1 transition-all ${p.type === "image" ? "hover:border-purple-200 dark:hover:border-purple-700" : "hover:border-indigo-200 dark:hover:border-indigo-700"}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{p.icon}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.type === "image" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" : "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"}`}>{p.catName}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${p.type === "image" ? "bg-purple-50 dark:bg-purple-900/30 text-purple-500" : "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500"}`}>
                  {p.type === "image" ? "图片" : "文字"}
                </span>
              </div>
              <h3 className={`font-bold text-gray-900 dark:text-white transition-colors mb-1 ${p.type === "image" ? "group-hover:text-purple-600 dark:group-hover:text-purple-400" : "group-hover:text-indigo-600 dark:group-hover:text-indigo-400"}`}>{p.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">{p.desc}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {p.tags.map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
