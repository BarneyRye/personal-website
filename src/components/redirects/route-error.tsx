import type { ErrorComponentProps } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function RouteError({ error }: ErrorComponentProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-48 text-center">
      <h1 className="-mb-6 flex font-bold text-9xl">500</h1>
      <h1 className="flex text-5xl">Something Went Wrong</h1>
      <pre className="max-w-full overflow-x-auto rounded-md bg-muted p-4 text-left text-sm">
        {error.message}
      </pre>
      <Button asChild>
        <Link to="/">Return back to home</Link>
      </Button>
    </div>
  )
}
