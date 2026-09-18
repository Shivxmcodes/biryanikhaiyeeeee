"use client"

import { useEffect, useState } from "react"
import { Clock, AlertTriangle, ChefHat, Check } from "lucide-react"

type Order = {
  id: string
  orderId: string
  table: { number: string } | null
  status: "Pending" | "Cooking" | "Ready" | "COMPLETED"
  elapsed: string
}

export default function KitchenDisplayPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 3000) // Fast poll for KDS
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      // KDS only cares about Pending and Cooking
      setOrders(data.filter((o: Order) => o.status === "Pending" || o.status === "Cooking"))
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      fetchOrders()
    } catch (e) {
      console.error(e)
    }
  }

  const isOverdue = (elapsed: string) => {
    const min = parseInt(elapsed) || 0
    return min > 20
  }

  if (isLoading) return <div className="flex h-full items-center justify-center pt-20"><div className="size-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>

  return (
    <div className="flex min-h-[calc(100vh-2rem)] flex-col bg-neutral-950 p-6 pt-16 text-white">
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-white">Kitchen Display</h1>
          <p className="mt-1 text-lg text-neutral-400">High-contrast active ticket view</p>
        </div>
        <div className="flex items-center gap-4 rounded-xl bg-white/5 px-6 py-3 border border-white/10 shadow-lg">
          <ChefHat className="size-8 text-emerald-400" />
          <div className="text-right">
            <div className="text-2xl font-bold">{orders.length}</div>
            <div className="text-sm font-medium uppercase tracking-wider text-emerald-400">Active Tickets</div>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-white/10">
          <div className="text-center">
            <Check className="mx-auto mb-4 size-16 text-neutral-600" />
            <h2 className="text-2xl font-bold text-neutral-400">All caught up!</h2>
            <p className="text-neutral-500">No active tickets.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {orders.map(order => {
            const overdue = isOverdue(order.elapsed)
            const isCooking = order.status === "Cooking"
            
            return (
              <div 
                key={order.id} 
                className={`flex flex-col justify-between overflow-hidden rounded-2xl border-2 ${
                  overdue ? 'border-red-500 bg-red-950/40' : 
                  isCooking ? 'border-amber-500 bg-amber-950/20' : 'border-white/10 bg-neutral-900'
                } shadow-xl transition-all`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xl font-black text-white/50">{order.orderId}</span>
                      <h3 className="mt-1 text-5xl font-black tracking-tighter text-white">
                        {order.table?.number || "TO-GO"}
                      </h3>
                    </div>
                    <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xl font-bold ${
                      overdue ? 'bg-red-500 text-white animate-pulse' : 'bg-white/10 text-white'
                    }`}>
                      <Clock className="size-5" />
                      {order.elapsed}
                    </div>
                  </div>
                  
                  {overdue && (
                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-2 text-sm font-bold text-red-400">
                      <AlertTriangle className="size-4" />
                      OVERDUE TICKET
                    </div>
                  )}

                  <div className="my-8">
                    {/* Placeholder for items, as current DB schema lacks detailed order items exposed yet */}
                    <ul className="space-y-3 text-2xl font-medium">
                      <li className="flex items-center gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded bg-white/10 text-lg font-bold">1x</span>
                        <span className="leading-tight">Hyderabadi Dum Biryani</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded bg-white/10 text-lg font-bold">2x</span>
                        <span className="leading-tight">Butter Naan</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-auto p-4 pt-0">
                  {order.status === "Pending" ? (
                    <button 
                      onClick={() => updateStatus(order.id, "Cooking")}
                      className="w-full rounded-xl bg-amber-500 py-6 text-2xl font-black text-amber-950 transition-all hover:bg-amber-400 active:scale-95"
                    >
                      START PREPARING
                    </button>
                  ) : (
                    <button 
                      onClick={() => updateStatus(order.id, "Ready")}
                      className="w-full rounded-xl bg-emerald-500 py-6 text-2xl font-black text-emerald-950 transition-all hover:bg-emerald-400 active:scale-95"
                    >
                      MARK READY
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}