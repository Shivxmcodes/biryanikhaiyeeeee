"use client"

import { useEffect, useState } from "react"
import { Package, Search, Plus, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

type InventoryItem = {
  id: string
  item: string
  quantity: number
  unit: string
  minLevel: number
  status: "OK" | "LOW STOCK" | "CRITICAL"
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const res = await fetch('/api/inventory')
      let data = await res.json()
      
      // Calculate derived status based on minLevel dynamically
      data = data.map((i: any) => ({
        ...i,
        status: i.quantity === 0 ? "CRITICAL" : i.quantity <= i.minLevel ? "LOW STOCK" : "OK"
      }))
      
      setInventory(data)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (id: string, newQuantity: number) => {
    try {
      await fetch(`/api/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: Math.max(0, newQuantity) })
      })
      fetchInventory()
    } catch (e) {
      console.error(e)
    }
  }

  const getStatusBadge = (status: string) => {
    if (status === "OK") return <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20"><CheckCircle2 className="size-3.5" /> Healthy</span>
    if (status === "LOW STOCK") return <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20"><AlertTriangle className="size-3.5" /> Low Stock</span>
    return <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/20"><AlertCircle className="size-3.5" /> Critical</span>
  }

  const filteredInventory = inventory.filter(i => i.item.toLowerCase().includes(search.toLowerCase()))

  if (isLoading) return <div className="flex h-full items-center justify-center pt-20"><div className="size-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" /></div>

  return (
    <div className="flex h-[calc(100vh-1rem)] flex-col p-6 pt-16">
      
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Inventory</h1>
          <p className="mt-1 text-muted-foreground">Manage stock levels and ingredients</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm font-medium shadow-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-cyan-400 active:scale-95">
            <Plus className="size-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 dark:bg-neutral-900/50">
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th scope="col" className="px-6 py-4 font-semibold">Item Name</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold">Quantity</th>
                <th scope="col" className="px-6 py-4 font-semibold">Reorder Level</th>
                <th scope="col" className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInventory.map(item => (
                <tr key={item.id} className="transition-colors hover:bg-muted/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-950`}>
                        <Package className="size-5" />
                      </div>
                      <span className="font-bold text-foreground">{item.item}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-foreground">{item.quantity}</span>
                      <span className="font-medium text-muted-foreground">{item.unit}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-medium">
                    {item.minLevel} {item.unit}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex size-8 items-center justify-center rounded-lg border border-border bg-white text-neutral-600 hover:bg-neutral-100 active:scale-95 dark:bg-neutral-800"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 5)}
                        className="flex size-8 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700 hover:bg-cyan-200 active:scale-95 dark:bg-cyan-900"
                      >
                        +5
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <Package className="mx-auto mb-3 size-12 opacity-20" />
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}