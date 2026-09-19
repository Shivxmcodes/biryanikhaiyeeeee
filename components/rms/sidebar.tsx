"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  Monitor,
  Bell,
  Grid3x3,
  ChefHat,
  Package,
  Users,
  UtensilsCrossed,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

type NavItem = {
  label: string
  icon: typeof Home
  badge?: number
  from: string
  to: string
  glow: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: Home, from: "from-amber-400", to: "to-orange-600", glow: "rgba(251,146,60,0.6)" },
  { label: "POS", href: "/pos", icon: Monitor, from: "from-sky-400", to: "to-blue-600", glow: "rgba(56,189,248,0.6)" },
  { label: "Kitchen & Live Orders", href: "/live-orders", icon: ChefHat, badge: 3, from: "from-rose-400", to: "to-red-600", glow: "rgba(244,63,94,0.6)" },
  { label: "Table Map", href: "/table-map", icon: Grid3x3, from: "from-violet-400", to: "to-purple-600", glow: "rgba(167,139,250,0.6)" },
  { label: "Inventory", href: "/inventory", icon: Package, from: "from-teal-400", to: "to-cyan-600", glow: "rgba(45,212,191,0.6)" },
  { label: "Staff", href: "/staff", icon: Users, from: "from-fuchsia-400", to: "to-pink-600", glow: "rgba(232,121,249,0.6)" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="relative flex h-full w-64 shrink-0 flex-col overflow-hidden bg-neutral-950 text-sidebar-foreground">
      {/* ambient aurora glow */}
      <div
        aria-hidden
        className="animate-aurora pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-orange-500/40 via-amber-400/20 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="animate-aurora pointer-events-none absolute -right-20 bottom-24 h-72 w-72 rounded-full bg-gradient-to-tr from-fuchsia-600/30 via-violet-500/20 to-transparent blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
      {/* gradient hairline on the right edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"
      />

      <div className="relative flex items-center gap-3 px-6 py-6">
        <div className="relative">
          <div
            aria-hidden
            className="animate-spin-slow absolute -inset-1 rounded-2xl bg-[conic-gradient(from_0deg,#f59e0b,#f43f5e,#a855f7,#38bdf8,#f59e0b)] opacity-70 blur-[6px]"
          />
          <div className="relative flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600 text-white shadow-lg shadow-orange-900/40 ring-1 ring-white/20">
            <UtensilsCrossed className="size-5 drop-shadow" />
          </div>
        </div>
        <div className="leading-tight">
          <p
            className="text-shimmer font-display text-lg font-semibold tracking-tight"
            style={{ ["--rms-shimmer-accent" as string]: "#ffb877" }}
          >
            Biryani Ki Bahaar
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange-300/70">Restaurant OS</p>
        </div>
      </div>

      <nav className="relative flex-1 space-y-1.5 px-3 py-2" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/")
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              style={{ ["--rms-glow" as string]: item.glow }}
              className={cn(
                "group relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300",
                isActive
                  ? "text-white shadow-lg"
                  : "text-sidebar-foreground/70 hover:translate-x-0.5 hover:text-white",
              )}
            >
              {/* active gradient fill */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 transition-opacity duration-300",
                  item.from,
                  item.to,
                  isActive ? "opacity-100" : "group-hover:opacity-10",
                )}
              />
              {/* active glowing left indicator */}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 rounded-r-full bg-white transition-all duration-300",
                  isActive ? "animate-glow-pulse h-7" : "group-hover:h-4 group-hover:bg-white/50",
                )}
              />
              {/* icon tile */}
              <span
                className={cn(
                  "relative flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-white/20 text-white shadow-inner"
                    : cn(
                        "bg-white/5 text-sidebar-foreground/70 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:text-white",
                        item.from,
                        item.to,
                      ),
                )}
              >
                <item.icon className="size-[18px]" />
              </span>
              <span className="relative flex-1 text-left tracking-wide">{item.label}</span>
              {item.badge ? (
                <span className="relative flex size-5 items-center justify-center">
                  {!isActive && (
                    <span
                      aria-hidden
                      className="animate-badge-ping absolute inset-0 rounded-full bg-rose-500"
                    />
                  )}
                  <span
                    className={cn(
                      "relative flex size-5 items-center justify-center rounded-full text-[11px] font-bold",
                      isActive ? "bg-white/25 text-white" : "bg-gradient-to-br from-rose-400 to-red-600 text-white shadow",
                    )}
                  >
                    {item.badge}
                  </span>
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      <div className="relative mx-3 mb-4 mt-2">
        {/* mini live status card */}
        <div className="mb-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="animate-badge-ping absolute inline-flex size-2 rounded-full bg-emerald-400" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            <p className="text-xs font-semibold text-white">Kitchen Live</p>
          </div>
          <p className="mt-1 text-[11px] text-sidebar-foreground/60">12 orders cooking now</p>
        </div>

        <button
          type="button"
          className="group flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-all duration-300 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-white"
        >
          <LogOut className="size-[18px] transition-transform duration-300 group-hover:-translate-x-0.5" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
