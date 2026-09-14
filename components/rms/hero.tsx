import Image from "next/image"

export function Hero() {
  return (
    <section
      aria-label="Biryani Ki Bahaar"
      className="relative overflow-hidden rounded-3xl border border-border shadow-sm"
    >
      <div className="absolute inset-0">
        <Image
          src="/food/biryani-hero.png"
          alt="A lavish spread of biryani, tandoori dishes, curries, and breads"
          fill
          priority
          sizes="100vw"
          className="animate-kenburns object-cover"
        />
        {/* Warm overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.22_0.05_45_/_0.55)] via-[oklch(0.2_0.05_40_/_0.35)] to-[oklch(0.18_0.04_35_/_0.7)]" />
      </div>

      <div className="relative flex min-h-[380px] flex-col justify-between p-6 sm:min-h-[440px] sm:p-8 lg:min-h-[520px] lg:p-10">
        {/* Top corner labels */}
        <div className="flex items-start justify-between text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 sm:text-xs">
          <span className="animate-fade [animation-delay:200ms]">Designer — v0</span>
          <span className="animate-fade hidden text-center [animation-delay:300ms] sm:block">
            Restaurant Management
          </span>
          <span className="animate-fade [animation-delay:400ms]">2026</span>
        </div>

        {/* Centered wordmark */}
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <p className="animate-rise mb-3 text-xs font-medium uppercase tracking-[0.35em] text-white/70 [animation-delay:200ms] sm:text-sm">
            Authentic Indian Kitchen
          </p>
          <h1 className="font-display text-white">
            <span className="animate-rise block text-5xl leading-[0.95] tracking-tight [animation-delay:350ms] sm:text-7xl lg:text-8xl">
              BIRYANI
            </span>
            <span className="animate-rise block text-5xl leading-[0.95] tracking-tight [animation-delay:500ms] sm:text-7xl lg:text-8xl">
              KI BAHAAR
            </span>
          </h1>
        </div>

        {/* Bottom meta */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-5 text-white/80 sm:flex-row">
          <p className="animate-fade text-sm [animation-delay:650ms]">
            Serving royal Hyderabadi flavors since 2012
          </p>
          <div className="animate-fade flex items-center gap-2 text-xs font-medium uppercase tracking-widest [animation-delay:750ms]">
            <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
            Kitchen Open
          </div>
        </div>
      </div>
    </section>
  )
}
