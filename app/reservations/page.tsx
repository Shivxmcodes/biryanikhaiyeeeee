"use client"

import { useState } from "react"
import { CalendarHeart, Users, Clock, Calendar as CalendarIcon } from "lucide-react"

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-violet-50 p-6">
      <div className="w-full max-w-lg animate-rise overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-violet-900/10">
        <div className="bg-gradient-to-br from-violet-400 to-purple-600 p-8 text-center text-white">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/20 shadow-inner">
            <CalendarHeart className="size-8" />
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight">Reserve a Table</h1>
          <p className="mt-2 font-medium text-violet-100">Book your premium dining experience</p>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-violet-100 text-violet-500">
              <span className="text-3xl">✨</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800">Reservation Confirmed!</h2>
            <p className="mt-2 text-neutral-500">We look forward to hosting you at Biryani Ki Bahaar.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700">Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-3 size-5 text-neutral-400" />
                    <input required type="date" className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 font-bold text-neutral-700 outline-none focus:border-violet-400 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-neutral-700">Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 size-5 text-neutral-400" />
                    <input required type="time" className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 font-bold text-neutral-700 outline-none focus:border-violet-400 focus:bg-white" />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 size-5 text-neutral-400" />
                  <select required className="w-full appearance-none rounded-xl border-2 border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 font-bold text-neutral-700 outline-none focus:border-violet-400 focus:bg-white">
                    {[1,2,3,4,5,6,7,8,"9+"].map(n => <option key={n} value={n}>{n} People</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700">Guest Name</label>
                <input required type="text" className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 font-medium outline-none focus:border-violet-400 focus:bg-white" placeholder="John Doe" />
              </div>

              <button type="submit" className="mt-4 w-full rounded-xl bg-violet-500 py-4 font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:bg-violet-600 active:scale-95">
                Book Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}