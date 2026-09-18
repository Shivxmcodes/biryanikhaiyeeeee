import Image from "next/image"
import Link from "next/link"
import { Truck, UtensilsCrossed, CalendarHeart, ConciergeBell } from "lucide-react"

const highlights = [
  { icon: UtensilsCrossed, label: "Dine-In Menu", href: "/menu", color: "text-amber-600", bg: "bg-amber-100" },
  { icon: ConciergeBell, label: "Room Service", href: "/room-service", color: "text-rose-600", bg: "bg-rose-100" },
  { icon: Truck, label: "Delivery", href: "/delivery", color: "text-emerald-600", bg: "bg-emerald-100" },
  { icon: CalendarHeart, label: "Reservations", href: "/reservations", color: "text-violet-600", bg: "bg-violet-100" },
]

export function OverviewFeature() {
  return (
    <section
      aria-labelledby="overview-heading"
      className="animate-rise overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[oklch(0.97_0.02_70)] to-[oklch(0.94_0.04_45)] shadow-sm [animation-delay:200ms]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: text */}
        <div className="flex flex-col justify-center gap-6 p-8 sm:p-10 lg:p-12">
          <div className="flex items-center gap-2">
            <span className="size-2.5 animate-pulse rounded-full bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Project Overview
            </span>
          </div>

          <h2
            id="overview-heading"
            className="font-display text-3xl uppercase leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Designing a refined digital experience for a premium biryani house
          </h2>

          <p className="max-w-prose text-sm leading-relaxed text-neutral-700 sm:text-base">
            A dedicated management hub for Biryani Ki Bahaar in Hyderabad, designed to convey the warmth
            of authentic dum-cooked flavors while guiding staff through key services — from menu and
            table reservations to room service, delivery, and private events.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:max-w-md">
            {highlights.map((h) => (
              <Link
                key={h.label}
                href={h.href}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/70 px-3 py-2.5 backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:bg-white/80"
              >
                <span className={`flex size-9 items-center justify-center rounded-lg ${h.bg}`}>
                  <h.icon className={`size-5 ${h.color}`} />
                </span>
                <span className="text-sm font-medium text-foreground">{h.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: image */}
        <div className="relative min-h-[280px] lg:min-h-full">
          <Image
            src="/food/waiter-serving.png"
            alt="A waiter presenting a plated biryani dish in an upscale dining room"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.22_0.05_45_/_0.25)] to-transparent lg:bg-gradient-to-r lg:from-[oklch(0.94_0.04_45_/_0.6)] lg:to-transparent" />
        </div>
      </div>
    </section>
  )
}
