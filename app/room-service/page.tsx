"use client"

import { useState } from "react"
import { ConciergeBell, Send } from "lucide-react"

export default function RoomServicePage() {
  const [room, setRoom] = useState("")
  const [notes, setNotes] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 p-6">
      <div className="w-full max-w-md animate-rise overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-rose-900/10">
        <div className="bg-gradient-to-br from-rose-400 to-pink-600 p-8 text-center text-white">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/20 shadow-inner">
            <ConciergeBell className="size-8" />
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight">Room Service</h1>
          <p className="mt-2 font-medium text-rose-100">Dine in the comfort of your suite</p>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-500">
              <span className="text-3xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-800">Order Confirmed</h2>
            <p className="mt-2 text-neutral-500">Your food is being prepared and will be delivered to Room {room} shortly.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 rounded-xl bg-neutral-100 px-6 py-3 font-bold text-neutral-600 transition-colors hover:bg-neutral-200"
            >
              Order Something Else
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700">Room Number</label>
                <input 
                  type="text" 
                  required
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                  placeholder="e.g. 402"
                  className="w-full rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 font-bold text-neutral-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-neutral-700">Special Instructions</label>
                <textarea 
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Any dietary requirements or specific requests?"
                  className="w-full resize-none rounded-xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 font-medium text-neutral-800 outline-none transition-colors focus:border-rose-400 focus:bg-white"
                />
              </div>
              <button 
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 py-4 font-bold text-white shadow-lg shadow-rose-500/30 transition-all hover:bg-rose-600 active:scale-95"
              >
                <Send className="size-5" /> Request Room Service
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
