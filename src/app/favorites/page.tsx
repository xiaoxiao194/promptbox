"use client";
import { useState, useEffect, useMemo } from "react";
import { prompts, categories } from "@/data/prompts";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function FavoritesPage() {
  const [favIds, setFavIds] = useState<string[]>([]);

  useEffect(() => {
    setFavIds(JSON.parse(localStorage.getItem("promptbox_favs") || "[]"));
  }, []);

  const favPrompts = useMemo(() => prompts.filter(p => favIds.includes(p.id)), [favIds]);

  const removeFav = (id: string) => {
    const newFavs = favIds.filter(f => f !== id);
    localStorage.setItem("promptbox_favs", JSON.stringify(newFavs));
    setFavIds(newFavs);
  };

  return (
    <main className="fade-in">
      <Navbar breadcrumbs={[{ label: "⭐ 我的收藏" }]} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">⭐ 我的收藏</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">收藏的提示词存储在本地浏览器中</p>

        {favPrompts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-gray-400 mb-6">还没有收藏任何提示词</p>
            <Link href="/" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-opacity">去逛逛</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favPrompts.map((p) => {
              const cat = categories.find(c => c.id === p.category);
              return (
                <div key={p.id} className="bg-white dark:bg-gray-800/60 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 relative group">
                  <button onClick={() => removeFav(p.id)} className="absolute top-3 right-3 text-gray-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm" title="取消收藏">✕</button>
                  <Link href={`/prompt/${p.id}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">{cat?.icon}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">{cat?.name}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-1">{p.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
