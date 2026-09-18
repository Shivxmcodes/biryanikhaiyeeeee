"use client"

import { useState } from "react"
import { Truck, MapPin } from "lucide-react"

export default function DeliveryPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 p-6">
      <div className="w-full max-w-lg animate-rise overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-emerald-900/10">
        <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-8 text-center text-white">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/20 shadow-inner">
            <Truck className="size-8" />
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight">Delivery Setup</h1>
          <p className="mt-2 font-medium text-emerald-100">Hot Biryani delivered to your doorstep</p>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
              <span className="text-3xl">🛵</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800">Rider Assigned!</h2>
            <p className="mt-2 text-neutral-500">Your delivery details have been saved. Your order will be on its way soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700">Full Name</label>
                <input required type="text" className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:bg-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700">Phone Number</label>
                <input required type="tel" className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 font-medium outline-none focus:border-emerald-400 focus:bg-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700">Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 size-5 text-neutral-400" />
                  <textarea required rows={3} className="w-full resize-none rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-12 pr-4 font-medium outline-none focus:border-emerald-400 focus:bg-white" placeholder="Street, Apartment, City, Pincode" />
                </div>
              </div>
              
              <button type="submit" className="mt-4 w-full rounded-xl bg-emerald-500 py-4 font-bold text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-600 active:scale-95">
                Confirm Delivery Address
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}