import { DollarSign, ClipboardList, Users, Armchair, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

type Stat = {
  label: string
  value: string
  icon: typeof DollarSign
  trend?: { value: string; up: boolean }
  hint?: string
}

const stats: Stat[] = [
  {
    label: "Today's Revenue",
    value: "$8,420",
    icon: DollarSign,
    trend: { value: "12.5%", up: true },
  },
  {
    label: "Active Orders",
    value: "24",
    icon: ClipboardList,
    hint: "6 awaiting kitchen",
  },
  {
    label: "Total Guests",
    value: "142",
    icon: Users,
    trend: { value: "8.2%", up: true },
  },
  {
    label: "Available Tables",
    value: "9 / 32",
    icon: Armchair,
    trend: { value: "3 fewer", up: false },
  },
]

export function StatCards() {
  return (
    <section aria-label="Summary statistics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <stat.icon className="size-5" />
            </span>
            {stat.trend ? (
              <span
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                  stat.trend.up
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700",
                )}
              >
                {stat.trend.up ? (
                  <TrendingUp className="size-3.5" />
                ) : (
                  <TrendingDown className="size-3.5" />
                )}
                {stat.trend.value}
              </span>
            ) : null}
          </div>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{stat.value}</p>
          <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
          {stat.hint ? <p className="mt-2 text-xs text-muted-foreground/80">{stat.hint}</p> : null}
        </div>
      ))}
    </section>
  )
}
