"use client"

import { useEffect, useState } from "react"
import { Grid3x3, Users, Clock, Coffee } from "lucide-react"
import Link from "next/link"

type Table = {
  id: string
  number: string
  capacity: number
  status: "AVAILABLE" | "OCCUPIED" | "RESERVED"
}

export default function TableMapPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTables()
    const interval = setInterval(fetchTables, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchTables = async () => {
    try {
      const res = await fetch('/api/tables')
      const data = await res.json()
      setTables(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE": return "bg-emerald-100 text-emerald-700 border-emerald-300 ring-emerald-500/30"
      case "OCCUPIED": return "bg-amber-100 text-amber-700 border-amber-300 ring-amber-500/30"
      case "RESERVED": return "bg-neutral-100 text-neutral-500 border-neutral-300 ring-neutral-500/30"
      default: return "bg-slate-100 text-slate-700 border-slate-300 ring-slate-500/30"
    }
  }

  if (isLoading) return <div className="flex h-full items-center justify-center pt-20"><div className="size-10 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" /></div>

  return (
    <div className="flex min-h-[calc(100vh-1rem)] flex-col p-6 pt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Floor Plan</h1>
          <p className="mt-1 text-muted-foreground">Manage seating and table statuses</p>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <span className="size-3 rounded-full bg-emerald-500" /> Available
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
            <span className="size-3 rounded-full bg-amber-500" /> Occupied
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
            <span className="size-3 rounded-full bg-neutral-400" /> Reserved
          </div>
        </div>
      </div>

      <div className="relative flex-1 rounded-3xl border-2 border-dashed border-border/60 bg-neutral-50/50 p-8 dark:bg-neutral-900/20">
        
        {/* Decorative Floor Plan Elements */}
        <div className="absolute inset-x-12 bottom-12 top-12 rounded-[3rem] border border-border/30 bg-white/40 shadow-inner dark:bg-black/20" />
        
        {/* Table Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {tables.map(table => (
            <Link 
              href={`/pos?table=${table.id}`} // Links to POS to start order
              key={table.id}
              className={`group relative flex aspect-square flex-col items-center justify-center gap-2 rounded-full border-4 shadow-xl transition-all hover:scale-105 active:scale-95 ${getStatusColor(table.status)}`}
            >
              <div className="absolute inset-0 rounded-full ring-4 opacity-0 transition-opacity group-hover:opacity-100" />
              
              <h2 className="text-3xl font-black">{table.number}</h2>
              
              <div className="flex items-center gap-1 text-sm font-bold opacity-80">
                <Users className="size-4" />
                {table.capacity} Seats
              </div>
              
              {table.status === "OCCUPIED" && (
                <div className="absolute -bottom-2 -right-2 flex size-10 items-center justify-center rounded-full bg-white text-amber-500 shadow-md ring-2 ring-amber-100 dark:bg-neutral-800">
                  <Coffee className="size-5" />
                </div>
              )}
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  )
}