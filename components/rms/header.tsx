"use client"

import { useEffect, useState } from "react"
import { Search, Bell, ChevronDown } from "lucide-react"

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const now = useClock()
  const time = now
    ? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "--:--:--"
  const date = now
    ? now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : ""

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:gap-4 sm:px-6">
      <div className="relative flex-1 sm:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search orders, tables, menu…"
          aria-label="Search"
          className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
          <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{time}</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">{date}</span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`relative flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent ${isNotifOpen ? "bg-accent" : ""}`}
            aria-label="Notifications, 3 unread"
          >
            <Bell className="size-[18px]" />
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
              3
            </span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/50">
                <span className="text-sm font-semibold">Notifications</span>
                <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="flex flex-col max-h-64 overflow-y-auto">
                <div className="flex flex-col gap-1 px-3 py-2 border-b border-border/50 hover:bg-accent/50 cursor-pointer">
                  <span className="text-sm font-medium">New Table Reservation</span>
                  <span className="text-xs text-muted-foreground">Table T-12 booked for 8:00 PM</span>
                  <span className="text-[10px] text-muted-foreground mt-1">2 mins ago</span>
                </div>
                <div className="flex flex-col gap-1 px-3 py-2 border-b border-border/50 hover:bg-accent/50 cursor-pointer">
                  <span className="text-sm font-medium text-amber-500">Low Stock Alert</span>
                  <span className="text-xs text-muted-foreground">Saffron is below minimum level (5g left)</span>
                  <span className="text-[10px] text-muted-foreground mt-1">15 mins ago</span>
                </div>
                <div className="flex flex-col gap-1 px-3 py-2 hover:bg-accent/50 cursor-pointer">
                  <span className="text-sm font-medium">Order Completed</span>
                  <span className="text-xs text-muted-foreground">Order #1041 served successfully</span>
                  <span className="text-[10px] text-muted-foreground mt-1">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

    <div className="relative">
        <button
          type="button"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 rounded-lg border border-border bg-card py-1.5 pl-1.5 pr-2.5 transition-colors hover:bg-accent"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            AD
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-medium text-foreground">Admin</span>
            <span className="block text-xs text-muted-foreground">Manager</span>
          </span>
          <ChevronDown className={`size-4 text-muted-foreground transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in slide-in-from-top-2">
            <div className="px-2 py-1.5 text-sm font-semibold">My Account</div>
            <div className="h-px bg-border my-1" />
            <button className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
              Profile Settings
            </button>
            <button className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
              Restaurant Settings
            </button>
            <button className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
              Shift Management
            </button>
            <div className="h-px bg-border my-1" />
            <button className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-destructive hover:bg-destructive/10 hover:text-destructive">
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
    </header>
  )
}
