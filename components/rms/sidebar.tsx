"use client"

import { useState } from "react"
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

const navItems = [
  { label: "Dashboard", icon: Home },
  { label: "POS", icon: Monitor },
  { label: "Live Orders", icon: Bell, badge: 3 },
  { label: "Table Map", icon: Grid3x3 },
  { label: "Kitchen Display", icon: ChefHat },
  { label: "Inventory", icon: Package },
  { label: "Staff", icon: Users },
]

export function Sidebar() {
  const [active, setActive] = useState("Dashboard")

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-lg">
          <UtensilsCrossed className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-lg font-semibold tracking-tight text-white">GourmetOS</p>
          <p className="text-xs text-sidebar-foreground/60">Restaurant OS</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(item.label)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="size-[18px] shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge ? (
                <span
                  className={cn(
                    "flex size-5 items-center justify-center rounded-full text-[11px] font-semibold",
                    isActive ? "bg-white/25 text-white" : "bg-primary text-primary-foreground",
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="size-[18px]" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
