"use client"

import { useEffect, useState } from "react"
import { Users, Armchair } from "lucide-react"
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
      // Sort to ensure T-1, T-2 etc are in order
      data.sort((a: Table, b: Table) => {
        const aNum = parseInt(a.number.replace(/\D/g, '')) || 0
        const bNum = parseInt(b.number.replace(/\D/g, '')) || 0
        return aNum - bNum
      })
      setTables(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const getLocation = (table: Table) => {
    const num = parseInt(table.number.replace(/\D/g, '')) || 0
    if (num <= 3) return "INDOOR"
    if (num === 4 || num === 7) return "WINDOW VIEW"
    if (num === 5 || num === 6) return "OUTDOOR GARDEN"
    if (num >= 8 && num <= 10) return "ROOFTOP AC"
    return "FAMILY LOUNGE"
  }

  // Define a huge palette of extremely bright, solid colors for each table index
  const getCardColorStyles = (index: number, status: string) => {
    const isAvailable = status === "AVAILABLE";
    // Keep available tables interactive, make others slightly dimmer but still vibrant
    const baseState = isAvailable ? "hover:-translate-y-2 hover:scale-105" : "cursor-not-allowed opacity-75 grayscale-[30%]";
    
    const colors = [
      "bg-indigo-500 border-indigo-400 shadow-[0_10px_30px_rgba(99,102,241,0.5)] text-white", // 0
      "bg-fuchsia-500 border-fuchsia-400 shadow-[0_10px_30px_rgba(217,70,239,0.5)] text-white", // 1
      "bg-emerald-500 border-emerald-400 shadow-[0_10px_30px_rgba(16,185,129,0.5)] text-white", // 2
      "bg-amber-500 border-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.5)] text-white", // 3
      "bg-rose-500 border-rose-400 shadow-[0_10px_30px_rgba(244,63,94,0.5)] text-white", // 4
      "bg-cyan-500 border-cyan-400 shadow-[0_10px_30px_rgba(6,182,212,0.5)] text-white", // 5
      "bg-violet-500 border-violet-400 shadow-[0_10px_30px_rgba(139,92,246,0.5)] text-white", // 6
      "bg-pink-500 border-pink-400 shadow-[0_10px_30px_rgba(236,72,153,0.5)] text-white", // 7
      "bg-lime-500 border-lime-400 shadow-[0_10px_30px_rgba(132,204,22,0.5)] text-white", // 8
      "bg-blue-500 border-blue-400 shadow-[0_10px_30px_rgba(59,130,246,0.5)] text-white", // 9
      "bg-orange-500 border-orange-400 shadow-[0_10px_30px_rgba(249,115,22,0.5)] text-white", // 10
      "bg-teal-500 border-teal-400 shadow-[0_10px_30px_rgba(20,184,166,0.5)] text-white", // 11
    ]
    
    return `${baseState} ${colors[index % colors.length]}`;
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "AVAILABLE": return <span className="mt-2 rounded-full bg-black/20 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest text-white backdrop-blur-md border border-white/20">Available</span>
      case "OCCUPIED": return <span className="mt-2 rounded-full bg-black/20 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest text-white backdrop-blur-md border border-white/20">Occupied</span>
      case "RESERVED": return <span className="mt-2 rounded-full bg-black/20 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest text-white backdrop-blur-md border border-white/20">Reserved</span>
      default: return null
    }
  }

  if (isLoading) return <div className="flex h-full items-center justify-center pt-20"><div className="size-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>

  return (
    <div className="flex min-h-[calc(100vh-1rem)] flex-col p-6 pt-16 max-w-7xl mx-auto">
      
      {/* Header Container */}
      <div className="mb-10 rounded-[2rem] bg-white p-8 shadow-sm border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800 dark:text-neutral-100">
          Interactive Restaurant Floor Plan
        </h1>
        <p className="mt-2 text-neutral-500 font-medium">
          Select any available table from our diverse seating options to begin an order.
        </p>
      </div>

      {/* Grid Container */}
      <div className="rounded-[2.5rem] bg-white/50 backdrop-blur-md p-8 shadow-inner border border-neutral-200/60 dark:bg-black/20 dark:border-white/5">
        
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {tables.map((table, index) => {
            const isClickable = table.status === "AVAILABLE"
            const CardWrapper = isClickable ? Link : 'div'
            const linkProps = isClickable ? { href: `/pos?table=${table.id}` } : {}

            return (
              <CardWrapper
                key={table.id}
                {...linkProps}
                // Aspect-[3/4] ensures the vertical layout requested
                className={`group relative flex aspect-[3/4] flex-col items-center justify-between gap-3 rounded-[2rem] border-2 p-6 transition-all duration-300 backdrop-blur-sm ${getCardColorStyles(index, table.status)}`}
              >
                {/* Table Number */}
                <h2 className="text-3xl font-black tracking-tight">{table.number}</h2>
                
                <div className="flex flex-col items-center gap-1.5 opacity-80 mt-auto mb-2">
                  <Armchair className="size-5" />
                  <span className="text-xs font-bold">{table.capacity} Seats</span>
                </div>
                
                {/* Location */}
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 text-center">
                  {getLocation(table)}
                </div>

                {/* Status Indicator Badge */}
                {getStatusBadge(table.status)}
              </CardWrapper>
            )
          })}
        </div>
        
      </div>
    </div>
  )
}