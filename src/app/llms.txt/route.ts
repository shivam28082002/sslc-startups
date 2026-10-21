import { caseStudies, company, engagementModels, faqs, seo, services, techGroups } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * /llms.txt — a plain-Markdown summary of the site for AI assistants and
 * answer engines (llmstxt.org). Generated from the same content as the page.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${company.name}`,
    "",
    `> ${seo.description}`,
    "",
    `${company.name} (also written ${seo.alternateNames.filter((n) => n !== company.name).join(", ")}) is a software development company based in ${company.location.label}. Website: ${siteUrl}/`,
    "",
    "## Contact",
    `- Email: ${company.email}`,
    `- WhatsApp / phone: ${company.phone} (${company.whatsappHref})`,
    `- Project form: ${siteUrl}/#contact`,
    ...company.social.filter((s) => s.href).map((s) => `- ${s.label}: ${s.href}`),
    "",
    "## Services",
    ...services.map((s) => `- **${s.name}**: ${s.outcome}`),
    "",
    "## Technology",
    ...techGroups.map((g) => `- ${g.title}: ${g.items.join(", ")}`),
    "",
    "## Ways to work together",
    ...engagementModels.map((m) => `- **${m.title}** (${m.tag}): ${m.detail} Best for: ${m.bestFor}.`),
    "",
    "## Solution blueprints",
    "Reference architectures for systems SSLC designs and builds (blueprints, not client case studies):",
    ...caseStudies.map((c) => `- **${c.name}**: ${c.solution} Stack: ${c.technology.join(", ")}.`),
    "",
    "## FAQ",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Pages",
    `- [Home](${siteUrl}/): services, work, technology, FAQ and contact`,
    `- [Privacy Policy](${siteUrl}/privacy)`,
    `- [Refund Policy](${siteUrl}/refund-policy)`,
    `- [Cookie Policy](${siteUrl}/cookie-policy)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
