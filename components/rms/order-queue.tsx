"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Trash2 } from "lucide-react"

type Status = "Cooking" | "Ready" | "Pending" | "COMPLETED"

type Order = {
  id: string
  orderId: string
  table: { number: string }
  waiter: { name: string }
  status: Status
  elapsed: string
}

const statusStyles: Record<string, string> = {
  Cooking: "bg-amber-100 text-amber-700 ring-amber-600/20",
  Ready: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
  Pending: "bg-rose-100 text-rose-700 ring-rose-600/20",
  COMPLETED: "bg-blue-100 text-blue-700 ring-blue-600/20",
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        statusStyles[status] || statusStyles.Pending,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}

export function OrderQueue() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchOrders = () => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pending order?")) return;
    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' })
      setOrders(orders.filter(o => o.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

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
            {isLoading ? (
              <tr><td colSpan={5} className="px-5 py-4 text-center text-muted-foreground">Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-4 text-center text-muted-foreground">No active orders</td></tr>
            ) : orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/50"
              >
                <td className="px-5 py-4 font-semibold text-foreground">{order.orderId}</td>
                <td className="px-5 py-4 text-muted-foreground">{order.table?.number || 'N/A'}</td>
                <td className="px-5 py-4 text-foreground">{order.waiter?.name || 'Unassigned'}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4 text-right font-mono tabular-nums text-muted-foreground">
                  <div className="flex items-center justify-end gap-3">
                    {order.elapsed}
                    {order.status === "Pending" ? (
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="text-rose-400 hover:text-rose-600 transition-colors"
                        title="Delete pending order"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    ) : (
                      <div className="w-4" /> // placeholder for alignment
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
