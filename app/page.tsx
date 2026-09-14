import { Sidebar } from "@/components/rms/sidebar"
import { Header } from "@/components/rms/header"
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
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back, Admin. Here&apos;s what&apos;s happening in your restaurant right now.
            </p>
          </div>

          <StatCards />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <OrderQueue />
            </div>
            <div className="lg:col-span-2">
              <QuickActions />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
