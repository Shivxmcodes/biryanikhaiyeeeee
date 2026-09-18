"use client"

import { useEffect, useState } from "react"
import { Users, Shield, Clock, Phone, MoreHorizontal } from "lucide-react"

type Staff = {
  id: string
  name: string
  role: string
  status: "ACTIVE" | "OFF_DUTY"
  createdAt: string
}

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/staff')
      .then(r => r.json())
      .then(data => {
        setStaff(data)
        setIsLoading(false)
      })
      .catch(console.error)
  }, [])

  if (isLoading) return <div className="flex h-full items-center justify-center pt-20"><div className="size-10 animate-spin rounded-full border-4 border-fuchsia-500 border-t-transparent" /></div>

  return (
    <div className="flex min-h-[calc(100vh-1rem)] flex-col p-6 pt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground">Staff Directory</h1>
          <p className="mt-1 text-muted-foreground">Manage waitstaff, chefs, and managers</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-fuchsia-500 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-fuchsia-400 active:scale-95">
          <Users className="size-4" /> Add Staff Member
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {staff.map(member => (
          <div key={member.id} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-fuchsia-500/10 blur-2xl" />
            
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-fuchsia-100 text-2xl font-black text-fuchsia-600 dark:bg-fuchsia-950">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{member.name}</h2>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
                    <Shield className="size-3.5" /> {member.role}
                  </div>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <MoreHorizontal className="size-5" />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-6">
              <div className="flex items-center gap-2">
                <span className="relative flex size-3">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${member.status === "ACTIVE" ? 'bg-emerald-400 animate-ping' : 'bg-neutral-400'}`} />
                  <span className={`relative inline-flex size-3 rounded-full ${member.status === "ACTIVE" ? 'bg-emerald-500' : 'bg-neutral-500'}`} />
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  {member.status === "ACTIVE" ? "On Duty" : "Off Duty"}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button className="flex size-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                  <Phone className="size-4" />
                </button>
                <button className="flex size-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                  <Clock className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}