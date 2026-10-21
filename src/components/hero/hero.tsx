import { QuickForm } from "@/components/contact/quick-form";
import { Marquee } from "@/components/ui/marquee";
import { TechLogo, techName, type TechId } from "@/components/tech/tech-logos";

const stack: TechId[] = ["nextjs", "react-native", "django", "nodejs", "aws", "llm", "python", "postgresql", "docker", "typescript"];

const stats = [
  { value: "8", label: "Service lines" },
  { value: "3", label: "Platforms: Web, iOS, Android" },
  { value: "5", label: "Stage delivery process" },
  { value: "1", label: "Team, idea to scale" },
];

/** Wireframe "tunnel" behind the hero: perspective lines, nested frames and frames flying outward. */
function Tunnel() {
  const W = 1440;
  const H = 760;
  const I = { x: 600, y: 300, w: 240, h: 160 };
  // frame between the outer edge (t=0) and the inner rect (t=1)
  const frame = (t: number) => ({
    x: I.x * t,
    y: I.y * t,
    w: W - (W - I.w) * t,
    h: H - (H - I.h) * t,
  });
  const rays: [number, number, number, number][] = [
    [0, 0, I.x, I.y],
    [W, 0, I.x + I.w, I.y],
    [0, H, I.x, I.y + I.h],
    [W, H, I.x + I.w, I.y + I.h],
    [360, 0, I.x + 60, I.y],
    [1080, 0, I.x + I.w - 60, I.y],
    [360, H, I.x + 60, I.y + I.h],
    [1080, H, I.x + I.w - 60, I.y + I.h],
    [0, H / 2, I.x, I.y + I.h / 2],
    [W, H / 2, I.x + I.w, I.y + I.h / 2],
  ];
  return (
    <svg aria-hidden viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
      <defs>
        <linearGradient id="tunnel-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#19c4ff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#a855f7" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <g stroke="rgb(255 255 255 / 0.08)" strokeWidth="1" fill="none">
        {rays.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
        {[0.35, 0.62, 0.84, 1].map((t) => {
          const f = frame(t);
          return <rect key={t} x={f.x} y={f.y} width={f.w} height={f.h} />;
        })}
      </g>
      <g fill="none" stroke="url(#tunnel-stroke)" strokeWidth="1.2">
        {[0, 2, 4].map((d) => (
          <rect
            key={d}
            x={I.x - 80}
            y={I.y - 52}
            width={I.w + 160}
            height={I.h + 104}
            className="origin-center animate-[tunnel_6s_linear_infinite] [transform-box:fill-box]"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="force-dark relative isolate overflow-hidden bg-black pt-16 lg:pt-[76px]">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Tunnel />
        <div className="absolute inset-0 bg-[radial-gradient(75%_65%_at_30%_40%,transparent,rgb(0_0_0/0.7))]" />
      </div>

      <div className="container-x grid items-center gap-12 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-20">
        <div className="min-w-0">
          <h1
            id="hero-title"
            className="animate-slide-up font-display text-[clamp(1.85rem,0.9rem+2.3vw,2.95rem)] leading-[1.18] font-medium tracking-[-0.02em] text-white"
          >
            World-Class Software Development for <span className="text-brand">Startups &amp; Growing Businesses</span>
          </h1>
          <p className="mt-7 max-w-xl animate-rise text-[17px] leading-relaxed text-white/80 [animation-delay:150ms]">
            We partner with founders and product leaders to design, build and scale AI-powered software — web
            platforms, mobile apps and business systems that achieve real outcomes.
          </p>

          <div className="mt-10 animate-rise [animation-delay:260ms]">
            <p className="text-[13px] text-white/55">Built with</p>
            <Marquee pauseOnHover repeat={3} className="mt-3 [--duration:30s] [--gap:0.75rem] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
              {stack.map((id) => (
                <span key={id} className="flex h-11 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4">
                  <TechLogo id={id} size={18} />
                  <span className="text-[14.5px] font-medium whitespace-nowrap text-white/90">{techName[id]}</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>

        <div className="animate-rise border border-white/15 bg-[#141416]/95 p-6 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] [animation-delay:200ms] sm:p-8">
          <QuickForm />
        </div>
      </div>

      <div className="container-x pb-16 lg:pb-20">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "flex flex-col-reverse px-4 py-6 text-center",
                i % 2 === 1 ? "border-l border-white/15" : "",
                i >= 2 ? "border-t border-white/15 lg:border-t-0" : "",
                i === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <dt className="mt-3 text-[15px] text-white/60">{s.label}</dt>
              <dd className="font-display text-[clamp(2.6rem,1.6rem+2.8vw,4.4rem)] leading-none font-medium text-white/85">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
