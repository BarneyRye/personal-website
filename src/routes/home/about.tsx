import { createFileRoute } from '@tanstack/react-router'
import { UnderConstruction } from '@/components/redirects/under-construction'

export const Route = createFileRoute('/home/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UnderConstruction />
}
