import { HomeButton } from '@/components/home-button'

export function UnderConstruction() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-48 text-center">
      <h1 className="-mb-6 font-bold text-9xl">204</h1>
      <h1 className="text-5xl">Page Under Construction!</h1>
      <p className="max-w-prose text-muted-foreground text-lg">
        Check back later for when I complete this project!
      </p>
      <HomeButton />
    </div>
  )
}
