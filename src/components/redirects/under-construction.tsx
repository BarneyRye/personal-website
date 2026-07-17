import { HomeButton } from '@/components/home-button'

export function UnderConstruction() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-48 text-center">
      <h1 className="-mb-6 flex font-bold text-9xl">204</h1>
      <h1 className="flex text-5xl">Page Under Construction!</h1>
      <p className="text-muted-foreground text-lg">
        Check back later for when I complete this project!
      </p>
      <HomeButton />
    </div>
  )
}
