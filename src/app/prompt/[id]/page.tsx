"use client";
import { use, useState, useMemo, useCallback, useEffect } from "react";
import { prompts, categories } from "@/data/prompts";
import Link from "next/link";

export default function PromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const prompt = prompts.find(p => p.id === id);
  const category = prompt ? categories.find(c => c.id === prompt.category) : null;

  const [variables, setVariables] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs: string[] = JSON.parse(localStorage.getItem("promptbox_favs") || "[]");
    setIsFav(favs.includes(id));
  }, [id]);

  const finalPrompt = useMemo(() => {
    if (!prompt) return "";
    let text = prompt.prompt;
    for (const [key, value] of Object.entries(variables)) {
      text = text.replaceAll(`{{${key}}}`, value || `{{${key}}}`);
    }
    return text;
  }, [prompt, variables]);

  const hasUnfilledVars = useMemo(() => {
    return finalPrompt.includes("{{");
  }, [finalPrompt]);

  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = finalPrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [finalPrompt]);

  const toggleFav = useCallback(() => {
    const favs: string[] = JSON.parse(localStorage.getItem("promptbox_favs") || "[]");
    if (isFav) {
      const newFavs = favs.filter(f => f !== id);
      localStorage.setItem("promptbox_favs", JSON.stringify(newFavs));
      setIsFav(false);
    } else {
      favs.push(id);
      localStorage.setItem("promptbox_favs", JSON.stringify(favs));
      setIsFav(true);
    }
  }, [id, isFav]);

  const relatedPrompts = useMemo(() => {
    if (!prompt) return [];
    return prompts.filter(p => p.category === prompt.category && p.id !== prompt.id).slice(0, 3);
  }, [prompt]);

  if (!prompt) return <div className="p-12 text-center text-gray-400">提示词不存在</div>;

  return (
    <main className="fade-in">
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Prompt<span className="gradient-text">Box</span></span>
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link href={`/category/${prompt.category}`} className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600">{category?.icon} {category?.name}</Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">{prompt.title}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">{category?.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prompt.difficulty === "新手" ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400" : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"}`}>{prompt.difficulty}</span>
            {prompt.platforms.map(pl => (
              <span key={pl} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{pl}</span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{prompt.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{prompt.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Variables + Prompt */}
          <div className="space-y-5">
            {/* Variable inputs */}
            {prompt.variables && prompt.variables.length > 0 && (
              <div className="bg-white dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">✏️ 填写变量</h2>
                <div className="space-y-4">
                  {prompt.variables.map((v) => (
                    <div key={v.key}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">{v.label}</label>
                      {v.placeholder.includes("\n") ? (
                        <textarea
                          value={variables[v.key] || ""}
                          onChange={(e) => setVariables({ ...variables, [v.key]: e.target.value })}
                          placeholder={v.placeholder}
                          rows={3}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400 resize-none placeholder:text-gray-400"
                        />
                      ) : (
                        <input
                          type="text"
                          value={variables[v.key] || ""}
                          onChange={(e) => setVariables({ ...variables, [v.key]: e.target.value })}
                          placeholder={v.placeholder}
                          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400 placeholder:text-gray-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {prompt.tips && (
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
                <p className="text-sm text-amber-700 dark:text-amber-400">💡 {prompt.tips}</p>
              </div>
            )}

            {/* Example */}
            {prompt.example && (
              <div className="bg-white dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50">
                <h2 className="font-bold text-gray-900 dark:text-white mb-3">📝 使用示例</h2>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-400">输入：</span><span className="text-gray-600 dark:text-gray-300">{prompt.example.input}</span></div>
                  <div><span className="text-gray-400">输出：</span><span className="text-gray-600 dark:text-gray-300">{prompt.example.output}</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Preview + Copy */}
          <div>
            <div className="bg-white dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900 dark:text-white">📋 生成的提示词</h2>
                <button onClick={toggleFav} className="text-xl hover:scale-110 transition-transform" title={isFav ? "取消收藏" : "收藏"}>
                  {isFav ? "⭐" : "☆"}
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words font-sans leading-relaxed">{finalPrompt}</pre>
              </div>

              {hasUnfilledVars && (
                <p className="text-xs text-amber-500 mb-3">⚠️ 还有未填写的变量（用 {"{{"}...{"}}"} 标记），填写后效果更好</p>
              )}

              <button
                onClick={copyToClipboard}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${copied ? "bg-green-500 text-white" : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20"}`}
              >
                {copied ? "✅ 已复制到剪贴板！" : "📋 一键复制提示词"}
              </button>

              <div className="flex gap-2 mt-3">
                {prompt.platforms.map(pl => (
                  <span key={pl} className="flex-1 text-center text-xs py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                    粘贴到 {pl}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedPrompts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔗 相关推荐</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedPrompts.map((p) => (
                <Link key={p.id} href={`/prompt/${p.id}`} className="bg-white dark:bg-gray-800/60 rounded-xl p-4 border border-gray-100 dark:border-gray-700/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
