/**
 * Phone showing an AI assistant conversation — illustrates the kind of
 * AI-powered app SSLC builds (example content, not a client product).
 */
export function AiPhone() {
  return (
    <div aria-hidden className="relative w-[300px] rounded-[44px] border border-white/15 bg-[#07060c] p-2.5 shadow-[0_40px_120px_-30px_rgb(120_80_255/0.65)] sm:w-[330px]">
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-b from-[#141226] to-[#0b0a14] px-4 pt-3 pb-6">
        {/* status bar + notch */}
        <div className="flex items-center justify-between px-2 text-[11px] font-medium text-white/80">
          <span>9:41</span>
          <span className="h-6 w-24 rounded-full bg-black" />
          <span className="flex gap-1">
            <span className="h-2.5 w-4 rounded-sm bg-white/70" />
          </span>
        </div>

        {/* app header */}
        <div className="mt-4 flex items-center gap-2.5 border-b border-white/10 pb-3">
          <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-[#19c4ff] via-[#3d6bff] to-[#a855f7] text-[11px] font-bold text-white">AI</span>
          <span className="leading-tight">
            <span className="block text-[14px] font-semibold text-white">Booking assistant</span>
            <span className="flex items-center gap-1.5 text-[11.5px] text-[#2ee6a8]">
              <span className="size-1.5 rounded-full bg-[#2ee6a8]" /> Online
            </span>
          </span>
        </div>

        {/* conversation */}
        <div className="mt-4 space-y-3 text-[13px] leading-snug">
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-[#2f55e0] px-3.5 py-2 text-white">
            Can I book a table for 4 tomorrow at 8 pm?
          </p>
          <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-2.5 text-white/90">
            Done — tomorrow, 8:00 pm, table for 4. Want me to add a birthday cake?
            <div className="mt-2.5 flex gap-2">
              <span className="rounded-full border border-white/20 px-2.5 py-1 text-[11.5px]">Yes, add it</span>
              <span className="rounded-full border border-white/20 px-2.5 py-1 text-[11.5px]">No thanks</span>
            </div>
          </div>
          <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-[#2f55e0] px-3.5 py-2 text-white">Yes please</p>
          <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/[0.07] px-3.5 py-3">
            <span className="size-1.5 animate-pulse rounded-full bg-white/60" />
            <span className="size-1.5 animate-pulse rounded-full bg-white/60 [animation-delay:150ms]" />
            <span className="size-1.5 animate-pulse rounded-full bg-white/60 [animation-delay:300ms]" />
          </div>
        </div>

        {/* composer */}
        <div className="mt-5 flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] py-2 pr-2 pl-4">
          <span className="flex-1 text-[12.5px] text-white/40">Ask anything…</span>
          <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-[#3d6bff] to-[#a855f7] text-white">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
