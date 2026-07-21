import { createFileRoute } from '@tanstack/react-router'
import { SectionIndex } from '@/components/general/section-index'
import { sections } from '@/lib/nav'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SectionIndex section={sections[0]} />
}
