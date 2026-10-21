import {
  siCelery,
  siClaude,
  siDjango,
  siDocker,
  siExpo,
  siFlutter,
  siGithubactions,
  siGooglegemini,
  siGraphql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import { cn } from "@/lib/utils";

/* Brand marks from Simple Icons (CC0). Trademarks belong to their owners; shown
   only to name the technologies SSLC builds with. AWS and OpenAI marks are not
   distributed by Simple Icons, so AWS is set as a wordmark and "LLM APIs" as a
   neutral glyph. */

type SimpleIcon = { title: string; path: string; hex: string };

export type TechId =
  | "nextjs"
  | "react-native"
  | "django"
  | "nodejs"
  | "aws"
  | "llm"
  | "python"
  | "typescript"
  | "postgresql"
  | "redis"
  | "docker"
  | "tailwind"
  | "expo"
  | "flutter"
  | "celery"
  | "graphql"
  | "github-actions"
  | "claude"
  | "gemini";

const simple: Partial<Record<TechId, SimpleIcon>> = {
  nextjs: siNextdotjs,
  "react-native": siReact,
  django: siDjango,
  nodejs: siNodedotjs,
  python: siPython,
  typescript: siTypescript,
  postgresql: siPostgresql,
  redis: siRedis,
  docker: siDocker,
  tailwind: siTailwindcss,
  expo: siExpo,
  flutter: siFlutter,
  celery: siCelery,
  graphql: siGraphql,
  "github-actions": siGithubactions,
  claude: siClaude,
  gemini: siGooglegemini,
};

export const techName: Record<TechId, string> = {
  nextjs: "Next.js",
  "react-native": "React Native",
  django: "Django",
  nodejs: "Node.js",
  aws: "AWS",
  llm: "LLM APIs",
  python: "Python",
  typescript: "TypeScript",
  postgresql: "PostgreSQL",
  redis: "Redis",
  docker: "Docker",
  tailwind: "Tailwind CSS",
  expo: "Expo",
  flutter: "Flutter",
  celery: "Celery",
  graphql: "GraphQL",
  "github-actions": "GitHub Actions",
  claude: "Claude",
  gemini: "Gemini",
};

/** Very dark brand colours are drawn white so they stay visible on the dark stage. */
function onDark(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.28 ? "#ffffff" : `#${hex}`;
}

export function TechLogo({
  id,
  size = 24,
  mono = false,
  className,
}: {
  id: TechId;
  size?: number;
  /** Render in currentColor instead of the brand colour. */
  mono?: boolean;
  className?: string;
}) {
  if (id === "aws") {
    return (
      <svg viewBox="0 0 48 30" width={size * 1.25} height={size} aria-hidden className={className}>
        <text x="24" y="17" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="17" fill={mono ? "currentColor" : "#ffffff"}>
          aws
        </text>
        <path d="M9 22.5c9 5 21 5 30 0" fill="none" stroke={mono ? "currentColor" : "#FF9900"} strokeWidth="2.4" strokeLinecap="round" />
        <path d="m35.5 20.4 4 1.9-1.9 3.6" fill="none" stroke={mono ? "currentColor" : "#FF9900"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "llm") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={className} fill="none">
        <defs>
          <linearGradient id="llm-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#19c4ff" />
            <stop offset="1" stopColor="#c04dff" />
          </linearGradient>
        </defs>
        <path
          d="M12 2.5c.6 3.9 2.1 6.4 4.6 7.6 1.2.6 2.6.9 4.9 1.4-3.9.6-6.4 2.1-7.6 4.6-.6 1.2-.9 2.6-1.4 4.9-.6-3.9-2.1-6.4-4.6-7.6-1.2-.6-2.6-.9-4.9-1.4 3.9-.6 6.4-2.1 7.6-4.6.6-1.2.9-2.6 1.4-4.9Z"
          fill={mono ? "currentColor" : "url(#llm-g)"}
        />
        <circle cx="19" cy="4.5" r="1.6" fill={mono ? "currentColor" : "#c04dff"} />
      </svg>
    );
  }
  const icon = simple[id];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={cn("shrink-0", className)}>
      <path d={icon.path} fill={mono ? "currentColor" : onDark(icon.hex)} />
    </svg>
  );
}
