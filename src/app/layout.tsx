import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import { company, faqs, seo, services, techGroups } from "@/content/site";
import { siteUrl } from "@/lib/site-url";
import { Analytics } from "@vercel/analytics/next";
import { MotionProvider } from "@/components/layout/motion-provider";
import { CookieBanner } from "@/components/marketing/cookie-banner";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// "optional": no late swap repaint of the hero headline (protects LCP); cached for later visits.
const display = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "optional" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: seo.title, template: `%s | ${company.name}` },
  description: seo.description,
  applicationName: company.name,
  keywords: seo.keywords,
  authors: [{ name: company.name, url: siteUrl }],
  creator: company.name,
  publisher: company.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  formatDetection: { telephone: true, email: true },
  // Paste the code from Google Search Console / Bing Webmaster here (or set the env vars).
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "dark light",
};

/** Structured data: WebSite (site name in Google), Organization (logo, contacts), services, FAQ. */
const orgId = `${siteUrl}/#organization`;
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: company.name,
      alternateName: seo.alternateNames,
      publisher: { "@id": orgId },
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": orgId,
      name: company.name,
      alternateName: seo.alternateNames,
      url: `${siteUrl}/`,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png`, width: 512, height: 512 },
      image: `${siteUrl}/opengraph-image.png`,
      description: seo.description,
      disambiguatingDescription:
        "SSLC Startup is a software development company in Noida, India (website sslctstartup.com) that builds AI agents, web platforms and mobile apps. Not related to the SSLC school examination.",
      email: company.email,
      telephone: company.phoneHref.replace("tel:", ""),
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: company.email,
          telephone: company.phoneHref.replace("tel:", ""),
          availableLanguage: ["English", "Hindi"],
        },
      ],
      foundingDate: company.registration.founded,
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Udyam Registration Number (MSME, Government of India)",
        value: company.registration.number,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: company.location.locality,
        addressRegion: company.location.region,
        addressCountry: company.location.country,
      },
      knowsAbout: [...services.map((s) => s.name), ...techGroups.flatMap((g) => g.items)],
      sameAs: company.social.map((s) => s.href).filter(Boolean),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.outcome, provider: { "@id": orgId } },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

const themeScript = `try{var t=localStorage.getItem("sslc-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" className={`${geist.variable} ${geistMono.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint (no flash). */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <CookieBanner />
        <div aria-hidden className="grain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
