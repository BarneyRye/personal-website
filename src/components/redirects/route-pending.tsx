export function RoutePending() {
  return (
    <div className="space-y-12" role="status" aria-label="Loading">
      <header className="space-y-3">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="h-8 w-full max-w-prose animate-pulse rounded bg-muted" />
      </header>
      <div className="space-y-3">
        <div className="h-4 w-full max-w-prose animate-pulse rounded bg-muted" />
        <div className="h-4 w-full max-w-prose animate-pulse rounded bg-muted" />
        <div className="h-4 w-2/3 max-w-prose animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}
