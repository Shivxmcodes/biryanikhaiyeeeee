import { Sidebar } from "@/components/rms/sidebar"
import { Header } from "@/components/rms/header"
import { Hero } from "@/components/rms/hero"
import { StatCards } from "@/components/rms/stat-cards"
import { OrderQueue } from "@/components/rms/order-queue"
import { QuickActions } from "@/components/rms/quick-actions"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <Hero />

          <div className="animate-rise [animation-delay:250ms]">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard Overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back, Admin. Here&apos;s what&apos;s happening at Biryani Ki Bahaar right now.
            </p>
          </div>

          <div className="animate-rise [animation-delay:400ms]">
            <StatCards />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="animate-rise lg:col-span-3 [animation-delay:550ms]">
              <OrderQueue />
            </div>
            <div className="animate-rise lg:col-span-2 [animation-delay:700ms]">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
