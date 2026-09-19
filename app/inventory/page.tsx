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
    if (status === "OK") return <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-300"><CheckCircle2 className="size-3" /> Healthy</span>
    if (status === "LOW STOCK") return <span className="inline-flex items-center gap-1.5 rounded-sm bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-300"><AlertTriangle className="size-3" /> Low Stock</span>
    return <span className="inline-flex items-center gap-1.5 rounded-sm bg-red-100 px-2 py-0.5 text-xs font-bold text-red-700 border border-red-300"><AlertCircle className="size-3" /> Critical</span>
  }

  const filteredInventory = inventory.filter(i => i.item.toLowerCase().includes(search.toLowerCase()))

  if (isLoading) return <div className="flex h-[calc(100vh-1rem)] items-center justify-center bg-white"><div className="size-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" /></div>

  return (
    <div className="flex min-h-[calc(100vh-1rem)] flex-col bg-slate-100 p-6 pt-16">
      
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto w-full">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-slate-600 font-medium">Standard table view of stock levels</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-64 rounded-md border border-slate-300 bg-white py-2 pl-9 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700">
            <Plus className="size-4" /> Add Item
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full overflow-x-auto bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <table className="w-full text-left text-sm whitespace-nowrap border-collapse border border-slate-300">
          <thead className="bg-slate-200">
            <tr>
              <th scope="col" className="border border-slate-300 px-4 py-3 font-bold text-slate-800">Item Name</th>
              <th scope="col" className="border border-slate-300 px-4 py-3 font-bold text-slate-800 text-center">Status</th>
              <th scope="col" className="border border-slate-300 px-4 py-3 font-bold text-slate-800 text-center">Quantity</th>
              <th scope="col" className="border border-slate-300 px-4 py-3 font-bold text-slate-800 text-center">Reorder Level</th>
              <th scope="col" className="border border-slate-300 px-4 py-3 font-bold text-slate-800 text-center">Update Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-slate-50 hover:bg-slate-100"}>
                <td className="border border-slate-300 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Package className="size-4 text-slate-400" />
                    <span className="font-semibold text-slate-900">{item.item}</span>
                  </div>
                </td>
                <td className="border border-slate-300 px-4 py-2.5 text-center">
                  {getStatusBadge(item.status)}
                </td>
                <td className="border border-slate-300 px-4 py-2.5 text-center">
                  <span className="text-base font-bold text-slate-900">{item.quantity}</span>
                  <span className="ml-1 text-xs text-slate-500">{item.unit}</span>
                </td>
                <td className="border border-slate-300 px-4 py-2.5 text-center text-slate-600 font-medium">
                  {item.minLevel} {item.unit}
                </td>
                <td className="border border-slate-300 px-4 py-2.5">
                  <div className="flex justify-center gap-1.5">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-100 font-bold"
                    >
                      -1
                    </button>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 5)}
                      className="flex h-7 w-8 items-center justify-center rounded border border-blue-300 bg-blue-50 text-blue-700 shadow-sm hover:bg-blue-100 font-bold"
                    >
                      +5
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredInventory.length === 0 && (
              <tr>
                <td colSpan={5} className="border border-slate-300 py-10 text-center">
                  <Package className="mx-auto mb-2 size-8 text-slate-300" />
                  <p className="text-sm font-medium text-slate-500">No inventory items found.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}