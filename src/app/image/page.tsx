"use client";
import { imageCategories, imagePrompts } from "@/data/imagePrompts";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ImagePage() {
  const hotPrompts = imagePrompts.filter(p => p.hot);

  return (
    <main className="fade-in">
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          🎨 图片提示词
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
          Midjourney / Stable Diffusion / DALL·E 提示词模板，复制即出图
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {imageCategories.map(c => (
            <Link key={c.id} href={`/image-category/${c.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 text-center border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all">
              <span className="text-3xl block mb-2">{c.icon}</span>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">{c.name}</h3>
              <p className="text-[11px] text-gray-400 mt-1">{c.description}</p>
            </Link>
          ))}
        </div>

        {/* Hot Prompts */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 热门推荐</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotPrompts.map(p => {
            const cat = imageCategories.find(c => c.id === p.category);
            return (
              <Link key={p.id} href={`/image-prompt/${p.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{cat?.icon}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 font-medium">🔥 热门</span>
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
            );
          })}
        </div>

        {/* All Prompts */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-12 mb-4">📋 全部模板（{imagePrompts.length} 个）</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {imagePrompts.filter(p => !p.hot).map(p => {
            const cat = imageCategories.find(c => c.id === p.category);
            return (
              <Link key={p.id} href={`/image-prompt/${p.id}`} className="group bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{cat?.icon}</span>
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
            );
          })}
        </div>
      </div>
    </main>
  );
}
