"use client"

import { useEffect, useState } from "react"
import { UtensilsCrossed, Star } from "lucide-react"

type MenuItem = {
  id: string
  name: string
  category: string
  price: number
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  
  useEffect(() => {
    fetch('/api/menu').then(r => r.json()).then(setMenu)
  }, [])

  const categories = ["Starters", "Main Course", "Drinks", "Dessert"]

  return (
    <div className="min-h-screen bg-[#FFF9F2] pb-24 text-neutral-900">
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-16 text-center text-white">
        <div className="absolute inset-0 bg-[url('/food/dum-biryani.png')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <UtensilsCrossed className="mx-auto mb-4 size-12 opacity-80" />
        <h1 className="relative font-display text-5xl font-black uppercase tracking-tight shadow-black/10 drop-shadow-lg">
          Dine-In Menu
        </h1>
        <p className="relative mt-2 text-lg font-medium text-amber-100">Experience the Royal Flavors of Hyderabad</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-16 px-6 pt-16">
        {categories.map((cat, i) => {
          const items = menu.filter(m => m.category === cat)
          if (items.length === 0) return null
          
          const colors = [
            "from-rose-400 to-rose-600",
            "from-amber-400 to-orange-500",
            "from-sky-400 to-blue-500",
            "from-violet-400 to-purple-500"
          ]
          
          return (
            <section key={cat} className="animate-rise" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="mb-8 flex items-center gap-4">
                <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${colors[i]} opacity-20`} />
                <h2 className={`bg-gradient-to-r ${colors[i]} bg-clip-text font-display text-4xl font-black uppercase tracking-tight text-transparent`}>
                  {cat}
                </h2>
                <div className={`h-1 flex-1 rounded-full bg-gradient-to-l ${colors[i]} opacity-20`} />
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2">
                {items.map(item => (
                  <div key={item.id} className="group relative flex items-center justify-between rounded-3xl border border-amber-900/5 bg-white p-6 shadow-xl shadow-amber-900/5 transition-transform hover:-translate-y-1">
                    <div className="pr-4">
                      <h3 className="text-xl font-bold text-neutral-800">{item.name}</h3>
                      <div className="mt-2 flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="size-3.5 fill-amber-500" /> Chef's Special
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-2xl font-black text-amber-600">₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}