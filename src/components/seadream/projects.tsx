import { ChevronDown } from 'lucide-react'
import type { ComponentType, CSSProperties } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

interface ProjectModule {
  title: string
  year: string
  start: string
  duration?: number
  Project: ComponentType
}

const modules = import.meta.glob<ProjectModule>('./projects/*', { eager: true })

const projects = Object.entries(modules)
  .map(([path, module]) => ({
    id: path.slice('./projects/'.length, -'.tsx'.length),
    title: module.title,
    year: module.year,
    start: module.start,
    duration: module.duration ?? 300,
    Project: module.Project,
  }))
  .sort((a, b) => a.start.localeCompare(b.start) || b.id.localeCompare(a.id))

export function Projects() {
  return (
    <div className="border-t">
      {projects.map(({ id, title, year, duration, Project }) => (
        <Collapsible
          key={id}
          className="border-b"
          style={{ '--project-duration': `${duration}ms` } as CSSProperties}
        >
          <CollapsibleTrigger className="group flex w-full items-center gap-4 py-4 text-left text-foreground hover:text-primary">
            <span className="min-w-0 flex-1 text-lg">{title}</span>
            <span className="label-mono shrink-0">{year}</span>
            <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-(--project-duration) group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="text-muted-foreground duration-(--project-duration)">
            <div className="space-y-4 pb-6">
              <Project />
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
