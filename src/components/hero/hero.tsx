import { company } from "@/content/site";
import { Marquee } from "@/components/ui/marquee";
import { InquiryLink } from "@/components/ui/inquiry-link";
import { CtaArrow } from "@/components/ui/button";
import { ArrowRight, WhatsApp } from "@/components/ui/icons";
import { TechLogo, techName, type TechId } from "@/components/tech/tech-logos";
import { IdeaMap } from "./idea-map";

const stack: TechId[] = ["nextjs", "react-native", "django", "nodejs", "aws", "llm", "python", "postgresql", "docker", "typescript"];

const stats = [
  { value: "8", label: "Service lines" },
  { value: "3", label: "Platforms: Web, iOS, Android" },
  { value: "5", label: "Stage delivery process" },
  { value: "1", label: "Team, idea to scale" },
];

/**
 * Hero: one idea, engineered into a product. The memorable element is the
 * idea map (brief → SSLC → what ships); everything else stays quiet.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="force-dark relative isolate overflow-hidden bg-black pt-16 text-white lg:pt-[76px]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-texture opacity-25 [mask-image:radial-gradient(70%_60%_at_50%_30%,#000,transparent)]" />
        <div className="absolute top-[38%] left-1/2 h-[520px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(92_60_255/0.32),transparent)]" />
      </div>

      <div className="container-x pt-16 pb-14 text-center sm:pt-20 lg:pt-24">
        <h1
          id="hero-title"
          className="mx-auto max-w-[17ch] animate-slide-up font-display text-[clamp(2.2rem,1rem+4vw,4.4rem)] leading-[1.06] font-medium tracking-[-0.03em]"
        >
          Your idea, engineered into software people use.
        </h1>
        <p className="mx-auto mt-6 max-w-[38rem] animate-rise text-[17px] leading-relaxed text-white/75 [animation-delay:120ms] sm:text-[18px]">
          SSLC designs, builds and launches web platforms, mobile apps and AI agents for startups and growing
          businesses — one team from first sketch to production.
        </p>

        <div className="mt-9 flex animate-rise flex-col items-center justify-center gap-3 [animation-delay:220ms] sm:flex-row">
          <InquiryLink variant="primary" size="lg" className="w-full bg-white text-black sm:w-auto">
            Start a project
            <CtaArrow>
              <ArrowRight size={16} />
            </CtaArrow>
          </InquiryLink>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[4px] border border-white/30 px-6 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/5 sm:w-auto"
          >
            <WhatsApp size={17} className="text-[#25d366]" /> Chat on WhatsApp
          </a>
        </div>
        <p className="mt-4 animate-rise text-[14px] text-white/55 [animation-delay:260ms]">Free consultation. No obligation.</p>

        <div className="mx-auto mt-14 max-w-5xl animate-rise text-left [animation-delay:320ms] lg:mt-16">
          <IdeaMap />
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <p className="text-[13px] text-white/50">Built with</p>
          <Marquee
            pauseOnHover
            repeat={3}
            className="mt-3 [--duration:34s] [--gap:0.75rem] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
          >
            {stack.map((id) => (
              <span key={id} className="flex h-11 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4">
                <TechLogo id={id} size={18} />
                <span className="text-[14.5px] font-medium whitespace-nowrap text-white/90">{techName[id]}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="container-x pb-16 lg:pb-20">
        <dl className="grid grid-cols-2 border-t border-white/12 pt-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col-reverse px-4 py-6 text-center",
                i % 2 === 1 ? "border-l border-white/12" : "",
                i >= 2 ? "border-t border-white/12 lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <dt className="mt-3 text-[15px] text-white/60">{s.label}</dt>
              <dd className="font-display text-[clamp(2.4rem,1.6rem+2.4vw,3.8rem)] leading-none font-medium text-white/85">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
