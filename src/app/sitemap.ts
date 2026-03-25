import { MetadataRoute } from "next";
import { prompts, categories } from "@/data/prompts";
import { imagePrompts, imageCategories } from "@/data/imagePrompts";

const BASE = "https://promptbox.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE}/image`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/favorites`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 },
  ];

  const categoryPages = categories.map(c => ({
    url: `${BASE}/category/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const promptPages = prompts.map(p => ({
    url: `${BASE}/prompt/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const imageCategoryPages = imageCategories.map(c => ({
    url: `${BASE}/image-category/${c.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const imagePromptPages = imagePrompts.map(p => ({
    url: `${BASE}/image-prompt/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...promptPages, ...imageCategoryPages, ...imagePromptPages];
}
