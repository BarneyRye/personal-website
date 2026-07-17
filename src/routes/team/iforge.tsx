import { createFileRoute } from '@tanstack/react-router'
import { UnderConstruction } from '@/components/redirects/under-construction'

export const Route = createFileRoute('/team/iforge')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UnderConstruction />
}
