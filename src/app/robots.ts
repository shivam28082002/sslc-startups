import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// AI search and assistant crawlers, named explicitly so answer engines
// (ChatGPT, Claude, Perplexity, Gemini, Copilot, Apple) can read and cite the site.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
];

const disallow = ["/api/", "/portal"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
