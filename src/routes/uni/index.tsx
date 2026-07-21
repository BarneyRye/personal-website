import { createFileRoute } from '@tanstack/react-router'
import { SectionIndex } from '@/components/general/section-index'
import { sectionByPath } from '@/lib/nav'

export const Route = createFileRoute('/uni/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SectionIndex section={sectionByPath('/uni')} />
}
