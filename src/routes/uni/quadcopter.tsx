import { createFileRoute } from '@tanstack/react-router'
import { UnderConstruction } from '@/components/redirects/under-construction'

export const Route = createFileRoute('/uni/quadcopter')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UnderConstruction />
}
