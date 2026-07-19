import type { QueryClient } from '@tanstack/react-query'
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { FileDown, PlaneTakeoff } from 'lucide-react'
import { AppFooter } from '@/components/general/footer'
import { AppSidebar } from '@/components/general/sidebar'
import { NotFound } from '@/components/redirects/not-found'
import { RouteError } from '@/components/redirects/route-error'
import { Button } from '@/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const cvUrl = `${import.meta.env.BASE_URL}cv.pdf`

interface RouterContext {
  queryClient: QueryClient
}

function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 sm:gap-8">
          <SidebarTrigger />
          <Link
            to="/"
            className="flex items-center gap-3 px-2 py-4 text-primary font-display hover:opacity-80"
          >
            <PlaneTakeoff className="size-6 shrink-0 sm:size-8 md:size-10 lg:size-12" />
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                Barnaby Rye
              </span>
              <span className="text-muted-foreground text-xs sm:text-sm md:text-base">
                Aerospace engineering student at the University of Sheffield
              </span>
            </span>
          </Link>
          {__HAS_CV__ && (
            <Button asChild variant="outline" className="ml-auto shrink-0">
              <a href={cvUrl} download="Barnaby-Rye-CV.pdf">
                <FileDown className="size-4" />
                <span className="hidden sm:inline">Download CV</span>
                <span className="sr-only sm:hidden">Download CV</span>
              </a>
            </Button>
          )}
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
  errorComponent: RouteError,
})
