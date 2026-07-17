import { HomeButton } from '@/components/home-button'

export function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-48 text-center">
      <h1 className="-mb-6 flex font-bold text-9xl">404</h1>
      <h1 className="flex text-5xl">Page Not Found!</h1>
      <HomeButton />
    </div>
  )
}
