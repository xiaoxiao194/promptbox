"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  breadcrumbs?: { label: string; href?: string }[];
}

export default function Navbar({ breadcrumbs }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">📦</span>
            <span className="font-bold text-xl text-gray-900 dark:text-white">Prompt<span className="gradient-text">Box</span></span>
          </Link>
          {breadcrumbs && breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-3 min-w-0">
              <span className="text-gray-300 dark:text-gray-600">/</span>
              {b.href ? (
                <Link href={b.href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 truncate">{b.label}</Link>
              ) : (
                <span className="text-sm text-gray-600 dark:text-gray-300 truncate">{b.label}</span>
              )}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {!breadcrumbs && (
            <div className="hidden sm:flex items-center gap-3 text-sm mr-2">
              <Link href="/" className="text-indigo-600 dark:text-indigo-400 font-medium">文字提示词</Link>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-gray-400 cursor-not-allowed">图片提示词 (Soon)</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <Link href="/favorites" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">⭐ 收藏</Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
