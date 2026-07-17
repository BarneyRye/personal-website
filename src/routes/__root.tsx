import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { FileCog } from 'lucide-react'
import { AppFooter } from '@/components/general/footer'
import { AppSidebar } from '@/components/general/sidebar'
import { NotFound } from '@/components/redirects/not-found'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

interface RouterContext {
  queryClient: QueryClient
}

function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-4 border-b px-4 sm:gap-8 lg:gap-12">
          <SidebarTrigger />
          <Link
            to="/"
            className="flex items-center gap-2 px-2 py-4 font-semibold text-xl text-primary font-display sm:text-2xl md:text-3xl lg:text-5xl"
          >
            <FileCog className="size-6 shrink-0 text-primary sm:size-8 md:size-10 lg:size-15" />
            <span>A website to show off my skills</span>
          </Link>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
})
