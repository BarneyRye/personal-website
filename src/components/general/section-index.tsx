import { Link } from '@tanstack/react-router'
import type { Section } from '../../lib/nav'

export function SectionIndex({ section }: { section: Section }) {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="label-mono">{section.name}</p>
        <h1 className="max-w-prose text-balance text-3xl">{section.blurb}</h1>
      </header>
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
        <ul className="min-w-0 flex-1 border-t">
          {section.projects.map((project, index) => (
            <li key={project.name} className="border-b">
              <Link
                to={project.to}
                className="group grid grid-cols-[2rem_1fr] gap-4 py-5 sm:grid-cols-[3rem_1fr]"
              >
                <span className="pt-1 font-mono text-muted-foreground text-sm tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="space-y-1">
                  <h2 className="text-lg group-hover:text-primary">
                    {project.name}
                  </h2>
                  <p className="max-w-prose text-muted-foreground text-sm">
                    {project.blurb}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {section.image && (
          <img
            src={section.image}
            alt=""
            className="order-first w-full shrink-0 rounded-lg sm:order-last sm:w-52"
          />
        )}
      </div>
    </div>
  )
}
