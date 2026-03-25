"use client";
import { use, useState, useMemo, useCallback } from "react";
import { imagePrompts, imageCategories } from "@/data/imagePrompts";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ImagePromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const prompt = imagePrompts.find(p => p.id === id);
  const category = prompt ? imageCategories.find(c => c.id === prompt.category) : null;

  const [copiedEn, setCopiedEn] = useState(false);
  const [copiedCn, setCopiedCn] = useState(false);
  const [variables, setVariables] = useState<Record<string, string>>({});

  // Extract variables from prompt
  const vars = useMemo(() => {
    if (!prompt) return [];
    const matches = prompt.prompt.matchAll(/\{\{(\w+)\}\}/g);
    const seen = new Set<string>();
    const result: string[] = [];
    for (const m of matches) {
      if (!seen.has(m[1])) { seen.add(m[1]); result.push(m[1]); }
    }
    return result;
  }, [prompt]);

  const varLabels: Record<string, string> = {
    subject: "主体描述", outfit: "服装", background: "背景",
    character_desc: "角色描述", expression: "表情", hair_style: "发型",
    scene: "场景", mood: "氛围/情绪", colors: "配色",
    brand: "品牌名", industry: "行业", style: "风格",
    app_concept: "App概念", theme: "主题", text: "文字内容",
    product: "产品", dish: "菜品", topic: "主题",
    color_scheme: "配色方案", event: "活动", genre: "类型",
    title: "标题", position: "位置",
    room: "房间类型", materials: "材质",
    building_type: "建筑类型", environment: "周围环境",
    character: "角色", action: "动作/姿势",
  };

  const filledEn = useMemo(() => {
    if (!prompt) return "";
    let text = prompt.prompt;
    for (const [k, v] of Object.entries(variables)) {
      text = text.replaceAll(`{{${k}}}`, v || `{{${k}}}`);
    }
    return text;
  }, [prompt, variables]);

  const filledCn = useMemo(() => {
    if (!prompt) return "";
    let text = prompt.promptCn;
    for (const [k, v] of Object.entries(variables)) {
      text = text.replaceAll(`{{${k}}}`, v || `{{${k}}}`);
    }
    return text;
  }, [prompt, variables]);

  const copy = useCallback(async (text: string, type: "en" | "cn") => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy");
      document.body.removeChild(ta);
    }
    if (type === "en") { setCopiedEn(true); setTimeout(() => setCopiedEn(false), 2000); }
    else { setCopiedCn(true); setTimeout(() => setCopiedCn(false), 2000); }
  }, []);

  const related = useMemo(() => {
    if (!prompt) return [];
    return imagePrompts.filter(p => p.category === prompt.category && p.id !== prompt.id).slice(0, 3);
  }, [prompt]);

  if (!prompt) return <div className="p-12 text-center text-gray-400">提示词不存在</div>;

  return (
    <main className="fade-in">
      <Navbar breadcrumbs={[
        { label: "🎨 图片提示词", href: "/image" },
        { label: `${category?.icon} ${category?.name}`, href: `/image-category/${prompt.category}` },
        { label: prompt.title },
      ]} />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium">{category?.name}</span>
            {prompt.platforms.map(pl => (
              <span key={pl} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">{pl}</span>
            ))}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{prompt.title}</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">{prompt.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Variables */}
          <div className="space-y-5">
            {vars.length > 0 && (
              <div className="bg-white dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50">
                <h2 className="font-bold text-gray-900 dark:text-white mb-4">✏️ 填写变量</h2>
                <div className="space-y-4">
                  {vars.map(v => (
                    <div key={v}>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                        {varLabels[v] || v}
                      </label>
                      <input
                        type="text"
                        value={variables[v] || ""}
                        onChange={e => setVariables({ ...variables, [v]: e.target.value })}
                        placeholder={`输入${varLabels[v] || v}...`}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-purple-400 placeholder:text-gray-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {prompt.params && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/30">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 text-sm mb-2">⚙️ 参数说明</h3>
                <p className="text-sm text-purple-600 dark:text-purple-400">{prompt.params}</p>
              </div>
            )}

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800/30">
              <h3 className="font-bold text-amber-700 dark:text-amber-300 text-sm mb-2">💡 使用技巧</h3>
              <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1">
                <li>• Midjourney 使用英文版效果最好</li>
                <li>• 参数（如 --ar --v）放在提示词最后</li>
                <li>• 中文版可用于 通义万相、文心一格 等</li>
                <li>• 可根据需要自由增减描述词</li>
              </ul>
            </div>
          </div>

          {/* Right: Prompts */}
          <div className="space-y-4">
            {/* English prompt */}
            <div className="bg-white dark:bg-gray-800/60 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 sticky top-20">
              <h2 className="font-bold text-gray-900 dark:text-white mb-3">🇬🇧 英文提示词（推荐）</h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-3 max-h-48 overflow-y-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words font-mono leading-relaxed">{filledEn}</pre>
              </div>
              <button onClick={() => copy(filledEn, "en")} className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${copiedEn ? "bg-green-500 text-white" : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 shadow-lg shadow-purple-500/20"}`}>
                {copiedEn ? "✅ 已复制！" : "📋 复制英文提示词"}
              </button>

              <div className="border-t border-gray-100 dark:border-gray-700 my-5"></div>

              <h2 className="font-bold text-gray-900 dark:text-white mb-3">🇨🇳 中文提示词</h2>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-3 max-h-48 overflow-y-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words font-sans leading-relaxed">{filledCn}</pre>
              </div>
              <button onClick={() => copy(filledCn, "cn")} className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all ${copiedCn ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"}`}>
                {copiedCn ? "✅ 已复制！" : "📋 复制中文提示词"}
              </button>

              <div className="flex gap-2 mt-3">
                {prompt.platforms.map(pl => (
                  <span key={pl} className="flex-1 text-center text-xs py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">粘贴到 {pl}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">🔗 相关推荐</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map(p => (
                <Link key={p.id} href={`/image-prompt/${p.id}`} className="bg-white dark:bg-gray-800/60 rounded-xl p-4 border border-gray-100 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-700 hover:shadow-md transition-all">
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
