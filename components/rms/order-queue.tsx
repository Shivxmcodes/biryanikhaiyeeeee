import { cn } from "@/lib/utils"

type Status = "Cooking" | "Ready" | "Pending"

type Order = {
  id: string
  table: string
  waiter: string
  status: Status
  elapsed: string
}

const orders: Order[] = [
  { id: "#1042", table: "T-08", waiter: "Rahul S.", status: "Cooking", elapsed: "12 min" },
  { id: "#1041", table: "T-03", waiter: "Priya M.", status: "Ready", elapsed: "18 min" },
  { id: "#1040", table: "T-15", waiter: "Arjun K.", status: "Pending", elapsed: "3 min" },
  { id: "#1039", table: "T-21", waiter: "Sneha R.", status: "Cooking", elapsed: "9 min" },
  { id: "#1038", table: "T-06", waiter: "Vikram P.", status: "Ready", elapsed: "22 min" },
]

const statusStyles: Record<Status, string> = {
  Cooking: "bg-amber-100 text-amber-700 ring-amber-600/20",
  Ready: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  Pending: "bg-rose-100 text-rose-700 ring-rose-600/20",
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        statusStyles[status],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

export function OrderQueue() {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-foreground">Live Order Queue</h2>
          <p className="text-sm text-muted-foreground">Orders currently in service</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="px-5 py-3 font-medium">Order ID</th>
              <th scope="col" className="px-5 py-3 font-medium">Table</th>
              <th scope="col" className="px-5 py-3 font-medium">Waiter</th>
              <th scope="col" className="px-5 py-3 font-medium">Status</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Elapsed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/50"
              >
                <td className="px-5 py-4 font-semibold text-foreground">{order.id}</td>
                <td className="px-5 py-4 text-muted-foreground">{order.table}</td>
                <td className="px-5 py-4 text-foreground">{order.waiter}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums text-muted-foreground">
                  {order.elapsed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
