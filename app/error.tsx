"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("App boundary error caught:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="size-16 rounded-full bg-rose-500/10 p-4 text-rose-500 mb-4">
        <AlertCircle className="size-full" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We encountered an error loading this section. You can try refreshing or continuing to browse.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <RefreshCw className="size-4" />
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          Reload Page
        </button>
      </div>
    </div>
  )
}
