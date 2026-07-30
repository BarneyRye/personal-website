import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { AppFooter } from '@/components/general/footer'
import { AppNavbar } from '@/components/general/navbar'
import { HomeButton } from '@/components/home-button'

interface RouterContext {
  queryClient: QueryClient
}

function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <AppNavbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <Outlet />
      </main>
      <AppFooter />
      <div className="fixed right-4 bottom-6 z-50 print:hidden">
        <HomeButton text="Home" />
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
})
