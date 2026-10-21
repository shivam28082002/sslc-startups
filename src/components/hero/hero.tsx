import { company } from "@/content/site";
import { Marquee } from "@/components/ui/marquee";
import { CtaArrow, buttonClass } from "@/components/ui/button";
import { ArrowRight, WhatsApp } from "@/components/ui/icons";
import { TechLogo, techName, type TechId } from "@/components/tech/tech-logos";
import { AiPhone } from "./ai-phone";
import { QuickForm } from "@/components/contact/quick-form";

const stack: TechId[] = ["nextjs", "react-native", "django", "nodejs", "aws", "llm", "python", "postgresql", "docker", "typescript"];
const disciplines = ["AI", "Web", "Mobile", "Cloud"];

const stats = [
  { value: "8", label: "Service lines" },
  { value: "3", label: "Platforms: Web, iOS, Android" },
  { value: "5", label: "Stage delivery process" },
  { value: "1", label: "Team, idea to scale" },
];

/**
 * Hero: black stage with a glowing brand-colour horizon (one planet-like arc),
 * centred headline, and an AI-assistant phone rising out of the glow.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="force-dark relative isolate overflow-hidden bg-black pt-16 text-white lg:pt-[76px]">
      {/* Horizon glow */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[78%]">
        {/* wide colour wash */}
        <div className="absolute bottom-[-10%] left-1/2 h-[90%] w-[160%] -translate-x-1/2 bg-[radial-gradient(50%_60%_at_50%_100%,rgb(61_107_255/0.55),rgb(138_61_255/0.35)_40%,rgb(224_59_255/0.12)_62%,transparent_75%)]" />
        {/* the planet: a huge dark disc whose rim catches the light */}
        <div className="absolute top-[50%] left-1/2 aspect-square w-[5200px] -translate-x-1/2 rounded-full bg-black shadow-[0_-2px_0_0_rgb(205_185_255/0.95),0_-24px_80px_8px_rgb(130_95_255/0.6),0_-140px_260px_60px_rgb(61_107_255/0.4)] max-sm:top-[54%] max-sm:w-[2200px]" />
      </div>

      <div className="container-x relative pt-14 text-center sm:pt-20 lg:pt-24">
        <ul aria-label="What we do" className="flex animate-rise items-center justify-center gap-2.5 text-[14px] font-medium">
          {disciplines.map((d, i) => (
            <li key={d} className="flex items-center gap-2.5">
              {i > 0 ? <span aria-hidden className="size-1 rounded-full bg-white/35" /> : null}
              <span className="text-[#8fb0ff]">{d}</span>
            </li>
          ))}
        </ul>

        <h1
          id="hero-title"
          className="mx-auto mt-6 max-w-[16ch] animate-slide-up font-display text-[clamp(2.3rem,1rem+4.2vw,4.6rem)] leading-[1.05] font-medium tracking-[-0.03em] [animation-delay:60ms]"
        >
          Software that moves your business forward
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] animate-rise text-[17px] leading-relaxed text-white/75 [animation-delay:140ms] sm:text-[18px]">
          Sharp strategy, precise engineering. We build AI agents, web platforms and mobile apps for startups and
          growing businesses.
        </p>

        <div className="mt-9 flex animate-rise flex-col items-center justify-center gap-3 [animation-delay:220ms] sm:flex-row">
          <a href="#quote" className={buttonClass("primary", "lg", "w-full bg-white text-black sm:w-auto")}>
            Get a free estimate
            <CtaArrow>
              <ArrowRight size={16} />
            </CtaArrow>
          </a>
          <a
            href={company.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[4px] border border-white/30 px-6 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/5 sm:w-auto"
          >
            <WhatsApp size={17} className="text-[#25d366]" /> Chat on WhatsApp
          </a>
        </div>

        {/* Phone + quick form, rising out of the horizon */}
        <div className="relative mx-auto mt-14 grid max-w-5xl items-end gap-8 text-left sm:mt-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="relative hidden h-[470px] animate-rise justify-center overflow-hidden [animation-delay:320ms] [mask-image:linear-gradient(to_bottom,#000_72%,transparent)] md:flex">
            <AiPhone />
          </div>
          <div
            id="quote"
            className="relative mb-10 scroll-mt-28 animate-rise rounded-2xl border border-white/15 bg-[#121117]/95 p-6 shadow-[0_30px_90px_-30px_rgb(92_60_255/0.7)] backdrop-blur [animation-delay:260ms] sm:p-8"
          >
            <h2 className="font-display text-[20px] font-medium text-white">Get a free project estimate</h2>
            <p className="mt-1.5 mb-6 text-[14px] text-white/60">Tell us what you&apos;re building — we reply with next steps.</p>
            <QuickForm />
          </div>
        </div>

        {/* Built with — over the glow, like a logo bar */}
        <div className="relative mx-auto max-w-5xl pb-10">
          <Marquee
            pauseOnHover
            repeat={3}
            className="[--duration:36s] [--gap:2.5rem] [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
          >
            {stack.map((id) => (
              <span key={id} className="flex items-center gap-2.5 py-2 text-white/90">
                <TechLogo id={id} size={22} />
                <span className="text-[16px] font-semibold whitespace-nowrap">{techName[id]}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>

      <div className="relative container-x pb-14 lg:pb-16">
        <dl className="grid grid-cols-2 border-t border-white/12 pt-2 lg:grid-cols-4">
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
              <dt className="mt-3 text-[15px] text-white/65">{s.label}</dt>
              <dd className="font-display text-[clamp(2.2rem,1.5rem+2.2vw,3.4rem)] leading-none font-medium text-white/90">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
