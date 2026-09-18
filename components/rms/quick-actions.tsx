"use client"

import Link from "next/link"
import Image from "next/image"
import { Plus, CalendarPlus, BookOpenText } from "lucide-react"

const actions = [
  { label: "New Order", href: "/pos", icon: Plus, primary: true },
  { label: "Reserve Table", href: "/reservations", icon: CalendarPlus, primary: false },
  { label: "Update Menu", href: "/update-menu", icon: BookOpenText, primary: false },
]

const trending = [
  { name: "Hyderabadi Dum Biryani", orders: 128, image: "/food/dum-biryani.png", rank: "bg-amber-500" },
  { name: "Butter Chicken", orders: 96, image: "/food/butter-chicken.png", rank: "bg-rose-500" },
  { name: "Gulab Jamun & Kulfi", orders: 74, image: "/food/gulab-jamun.png", rank: "bg-violet-500" },
]

export function QuickActions() {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Jump into common tasks</p>
        <div className="mt-4 flex flex-col gap-2.5">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={
                action.primary
                  ? "flex items-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
                  : "flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-all hover:bg-accent active:scale-[0.98]"
              }
            >
              <span
                className={
                  action.primary
                    ? "flex size-8 items-center justify-center rounded-lg bg-white/20"
                    : "flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground"
                }
              >
                <action.icon className="size-4" />
              </span>
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h2 className="text-base font-semibold text-foreground">Trending Today</h2>
          <span className="text-xs font-medium text-muted-foreground">Top sellers</span>
        </div>
        <ul className="mt-4 space-y-3">
          {trending.map((item, index) => (
            <li key={item.name} className="flex items-center gap-3">
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white tabular-nums ${item.rank}`}
              >
                {index + 1}
              </span>
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.orders} ordered today</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
