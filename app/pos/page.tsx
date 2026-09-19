"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, ShoppingCart, UtensilsCrossed, CheckCircle2 } from "lucide-react"

type MenuItem = {
  id: string
  name: string
  category: string
  price: number
}

type Table = {
  id: string
  number: string
}

type CartItem = MenuItem & { quantity: number }

export default function POSPage() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [tables, setTables] = useState<Table[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedTable, setSelectedTable] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [isOrdering, setIsOrdering] = useState(false)

  // Hardcoded categories based on prompt since DB might not have all variations yet
  const categories = ["All", "Starters", "Main Course", "Drinks", "Dessert"]
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    Promise.all([
      fetch('/api/menu').then(r => r.json()),
      fetch('/api/tables').then(r => r.json())
    ]).then(([menuData, tablesData]) => {
      setMenu(menuData)
      setTables(tablesData)
      if (tablesData.length > 0) setSelectedTable(tablesData[0].id)
      setIsLoading(false)
    }).catch(console.error)
  }, [])

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQ = i.quantity + delta
        return newQ > 0 ? { ...i, quantity: newQ } : i
      }
      return i
    }).filter(i => i.quantity > 0))
  }

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return alert("Cart is empty!")
    setIsOrdering(true)
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId: selectedTable,
          status: 'Pending', // Sends to Kitchen
          total: subtotal + tax
        })
      })
      setCart([])
      alert("Order Placed Successfully! It is now visible in the Kitchen and Live Orders.")
    } catch (e) {
      console.error(e)
    } finally {
      setIsOrdering(false)
    }
  }

  const filteredMenu = activeCategory === "All" ? menu : menu.filter(m => m.category === activeCategory)
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.05 // 5% GST

  if (isLoading) return <div className="flex h-full items-center justify-center pt-20"><div className="size-10 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" /></div>

  return (
    <div className="flex h-[calc(100vh-1rem)] gap-4 p-4 pt-16">
      
      {/* Left Panel: Categories */}
      <div className="flex w-32 flex-col gap-3 rounded-3xl bg-neutral-100 p-3 shadow-inner dark:bg-neutral-900/60">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex flex-col items-center justify-center rounded-2xl p-4 text-sm font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/40 scale-105' 
                : 'bg-white text-neutral-500 hover:bg-orange-50 dark:bg-neutral-800 dark:hover:bg-neutral-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Middle Panel: Menu Items */}
      <div className="flex-1 overflow-y-auto rounded-3xl bg-neutral-100 p-6 shadow-inner dark:bg-neutral-900/60">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-foreground">Menu Items</h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-muted-foreground">Table:</span>
            <select 
              value={selectedTable} 
              onChange={e => setSelectedTable(e.target.value)}
              className="rounded-xl border-none bg-white px-4 py-2 font-bold text-orange-600 shadow-sm outline-none dark:bg-neutral-800"
            >
              {tables.map(t => <option key={t.id} value={t.id}>{t.number}</option>)}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMenu.map(item => (
            <div key={item.id} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-neutral-800">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-orange-100 text-orange-500 dark:bg-orange-500/20">
                <UtensilsCrossed className="size-6" />
              </div>
              <div>
                <h3 className="font-bold leading-tight text-neutral-900 dark:text-white">{item.name}</h3>
                <p className="mt-1 text-sm font-semibold text-orange-500">₹{item.price}</p>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-100 py-2.5 font-bold text-neutral-700 transition-colors hover:bg-orange-500 hover:text-white dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-orange-500"
              >
                <Plus className="size-4" /> Add
              </button>
            </div>
          ))}
          {filteredMenu.length === 0 && (
            <div className="col-span-full py-10 text-center font-medium text-muted-foreground">No items found in this category.</div>
          )}
        </div>
      </div>

      {/* Right Panel: Cart */}
      <div className="flex w-96 flex-col overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-neutral-800">
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-white">
          <ShoppingCart className="size-6" />
          <h2 className="text-xl font-bold tracking-wide">Current Order</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingCart className="mb-3 size-12 opacity-20" />
              <p className="font-medium">Cart is empty</p>
              <p className="text-sm">Add items from the menu</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex-1 pr-2">
                    <h4 className="font-semibold text-foreground line-clamp-1">{item.name}</h4>
                    <p className="text-sm font-medium text-muted-foreground">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
                    <button onClick={() => updateQuantity(item.id, -1)} className="flex size-7 items-center justify-center rounded-md bg-white text-neutral-600 shadow-sm active:scale-95 dark:bg-neutral-700 dark:text-neutral-200"><Minus className="size-3" /></button>
                    <span className="w-4 text-center font-bold text-foreground">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="flex size-7 items-center justify-center rounded-md bg-orange-500 text-white shadow-sm active:scale-95"><Plus className="size-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-neutral-50 p-6 dark:bg-neutral-900">
          <div className="mb-2 flex justify-between text-sm font-medium text-muted-foreground">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="mb-4 flex justify-between text-sm font-medium text-muted-foreground">
            <span>GST (5%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="mb-6 flex justify-between text-xl font-black text-foreground">
            <span>Total</span>
            <span className="text-orange-500">₹{(subtotal + tax).toFixed(2)}</span>
          </div>
          <button 
            onClick={handlePlaceOrder}
            disabled={cart.length === 0 || isOrdering}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            {isOrdering ? <span className="animate-spin text-2xl">↻</span> : <CheckCircle2 className="size-5" />}
            PLACE ORDER
          </button>
        </div>
      </div>

    </div>
  )
}