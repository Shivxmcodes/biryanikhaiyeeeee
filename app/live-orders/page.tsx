"use client"

import { useEffect, useState } from "react"
import { Clock, ChefHat, CheckCircle2, MoreHorizontal } from "lucide-react"

type Order = {
  id: string
  orderId: string
  table: { number: string } | null
  waiter: { name: string } | null
  status: "Pending" | "Cooking" | "Ready" | "COMPLETED"
  elapsed: string
}

export default function LiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000) // Poll every 5s
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      const data = await res.json()
      setOrders(data)
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

  const getTimerColor = (elapsed: string) => {
    const min = parseInt(elapsed) || 0
    if (min < 10) return "bg-emerald-500 text-white"
    if (min < 20) return "bg-amber-500 text-white"
    return "bg-rose-500 text-white animate-pulse"
  }

  const Column = ({ title, status, icon: Icon, color, ordersList }: any) => (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-neutral-100/50 p-4 shadow-inner dark:bg-neutral-900/50">
      <div className={`mb-4 flex items-center gap-2 rounded-xl bg-gradient-to-r ${color} p-3 text-white shadow-sm`}>
        <Icon className="size-5" />
        <h2 className="font-bold tracking-wide">{title}</h2>
        <span className="ml-auto rounded-full bg-white/20 px-2.5 py-0.5 text-sm font-semibold backdrop-blur-sm">
          {ordersList.length}
        </span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {ordersList.map((order: Order) => (
          <div key={order.id} className="group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b opacity-70 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center justify-between">
              <span className="font-bold text-foreground">{order.orderId}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold shadow-sm ${getTimerColor(order.elapsed)}`}>
                {order.elapsed}
              </span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Table: <span className="font-semibold text-foreground">{order.table?.number || "N/A"}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Waiter: <span className="font-medium">{order.waiter?.name || "None"}</span>
            </div>
            
            {/* Quick Actions instead of drag drop for now */}
            <div className="mt-4 flex gap-2">
              {status === "Pending" && (
                <button onClick={() => updateStatus(order.id, "Cooking")} className="w-full rounded-lg bg-amber-100 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-200">Start Cooking</button>
              )}
              {status === "Cooking" && (
                <button onClick={() => updateStatus(order.id, "Ready")} className="w-full rounded-lg bg-emerald-100 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-200">Mark Ready</button>
              )}
              {status === "Ready" && (
                <button onClick={() => updateStatus(order.id, "COMPLETED")} className="w-full rounded-lg bg-blue-100 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-200">Serve</button>
              )}
            </div>
          </div>
        ))}
        {ordersList.length === 0 && (
          <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-border/60 text-sm text-muted-foreground">
            No orders in this stage
          </div>
        )}
      </div>
    </div>
  )

  if (isLoading) return <div className="flex h-full items-center justify-center pt-20"><div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col p-6 pt-16">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Live Orders Kanban</h1>
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500"></span>
          </span>
          Live Sync Active
        </div>
      </div>
      
      <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
        <Column 
          title="New (Pending)" 
          status="Pending"
          icon={Clock} 
          color="from-rose-500 to-pink-600" 
          ordersList={orders.filter(o => o.status === "Pending")} 
        />
        <Column 
          title="Preparing (Cooking)" 
          status="Cooking"
          icon={ChefHat} 
          color="from-amber-400 to-orange-500" 
          ordersList={orders.filter(o => o.status === "Cooking")} 
        />
        <Column 
          title="Ready to Serve" 
          status="Ready"
          icon={CheckCircle2} 
          color="from-emerald-400 to-teal-500" 
          ordersList={orders.filter(o => o.status === "Ready")} 
        />
      </div>
    </div>
  )
}