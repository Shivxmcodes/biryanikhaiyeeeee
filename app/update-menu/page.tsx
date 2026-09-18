"use client"

import { useState } from "react"
import { BookOpenText, CheckCircle2, IndianRupee } from "lucide-react"
import Link from "next/link"

export default function UpdateMenuPage() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Starters")
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          category
        })
      })
      setSubmitted(true)
      setName("")
      setPrice("")
    } catch (error) {
      console.error(error)
      alert("Failed to add menu item.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-1rem)] items-center justify-center p-6 pt-16">
      <div className="w-full max-w-lg animate-rise overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl">
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-8 text-center text-white">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/20 shadow-inner">
            <BookOpenText className="size-8" />
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight">Update Menu</h1>
          <p className="mt-2 font-medium text-indigo-100">Add a new dish to the live POS</p>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
              <CheckCircle2 className="size-8" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Dish Added!</h2>
            <p className="mt-2 text-muted-foreground">The new item is now instantly available on the POS system and customer menu.</p>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => setSubmitted(false)}
                className="flex-1 rounded-xl bg-neutral-100 px-6 py-3 font-bold text-neutral-600 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                Add Another
              </button>
              <Link 
                href="/pos"
                className="flex-1 rounded-xl bg-indigo-500 px-6 py-3 font-bold text-white transition-colors hover:bg-indigo-600"
              >
                View POS
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">Dish Name</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Chicken Tikka Masala"
                  className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-bold text-foreground outline-none transition-colors focus:border-indigo-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-foreground">Price</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                    <input 
                      required 
                      type="number" 
                      min="1"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      placeholder="299"
                      className="w-full rounded-xl border-2 border-border bg-background py-3 pl-9 pr-4 font-bold text-foreground outline-none transition-colors focus:border-indigo-500" 
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-foreground">Category</label>
                  <select 
                    required 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-xl border-2 border-border bg-background px-4 py-3 font-bold text-foreground outline-none transition-colors focus:border-indigo-500"
                  >
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-6 w-full rounded-xl bg-indigo-500 py-4 font-bold text-white shadow-lg shadow-indigo-500/30 transition-all hover:bg-indigo-600 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add to Menu"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
