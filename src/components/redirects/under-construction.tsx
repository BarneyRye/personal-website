import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export function UnderConstruction() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-48 text-center">
      <h1 className="-mb-6 flex font-bold text-9xl">204</h1>
      <h1 className="flex text-5xl">Page Under Construction!</h1>
      <Button asChild>
        <Link to="/">Return back to home</Link>
      </Button>
    </div>
  )
}
