import Link from "next/link";
import { categories } from "@/data/prompts";
import { imageCategories } from "@/data/imagePrompts";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">✨</span>
              <span className="font-bold text-gray-900 dark:text-white">PromptBox</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              免费 AI 提示词百宝箱<br />
              填空式模板，一键复制<br />
              覆盖 ChatGPT / Claude / Midjourney
            </p>
          </div>

          {/* Text Categories */}
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">💬 文字提示词</h4>
            <ul className="space-y-1.5">
              {categories.map(c => (
                <li key={c.id}>
                  <Link href={`/category/${c.id}`} className="text-xs text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Categories */}
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">🎨 图片提示词</h4>
            <ul className="space-y-1.5">
              {imageCategories.map(c => (
                <li key={c.id}>
                  <Link href={`/image-category/${c.id}`} className="text-xs text-gray-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors">
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-3">🔗 快捷入口</h4>
            <ul className="space-y-1.5">
              <li><Link href="/" className="text-xs text-gray-400 hover:text-indigo-500 transition-colors">首页</Link></li>
              <li><Link href="/image" className="text-xs text-gray-400 hover:text-indigo-500 transition-colors">图片提示词</Link></li>
              <li><Link href="/favorites" className="text-xs text-gray-400 hover:text-indigo-500 transition-colors">我的收藏</Link></li>
            </ul>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mt-4 mb-3">🤖 支持平台</h4>
            <ul className="space-y-1.5">
              {["ChatGPT", "Claude", "Kimi", "Midjourney", "Stable Diffusion", "DALL·E"].map(p => (
                <li key={p}><span className="text-xs text-gray-400">{p}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} PromptBox. 所有提示词模板免费使用。</p>
          <p className="text-xs text-gray-400">Made with ❤️ for AI creators</p>
        </div>
      </div>
    </footer>
  );
}
