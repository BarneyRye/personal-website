import { createFileRoute } from '@tanstack/react-router'
import { Fragment } from 'react'
import { PageHeader } from '@/components/page-header'

export const Route = createFileRoute('/home/education')({
  component: RouteComponent,
})

interface Grade {
  level: string
  grade: string
}

interface Education {
  org: string
  course?: string
  period: string
  grades: Grade[]
  academic_extra?: string[]
  other_extra?: string[]
}

const EDUCATIONS: Education[] = [
  {
    org: 'University of Sheffield',
    course: 'MEng Aerospace Engineering',
    period: 'September 2024 - Current',
    grades: [
      { level: 'Year 1', grade: 'First' },
      { level: 'Year 2', grade: 'First' },
    ],
    academic_extra: ['Seadream Rocketry', 'Solotron', 'iForge'],
    other_extra: ['AeroSoc football'],
  },
  {
    org: "Sir Thomas Rich's School",
    period: 'September 2017 - July 2024',
    grades: [
      {
        level: 'GCSE',
        grade: '9s in A-Level subjects, 6-9 across the rest',
      },
      { level: 'A-Level', grade: 'A*A*A*' },
    ],
    academic_extra: ['Physics Olympiad'],
    other_extra: ['Rugby union'],
  },
]

function ExtraList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <p className="label-mono">{label}</p>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item} className="flex max-w-prose gap-3">
            <span className="text-primary">&mdash;</span>
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="My educational background" />

      <p className="max-w-prose text-muted-foreground">
        I am partway through an MEng in Aerospace Engineering at the University
        of Sheffield, having come from Sir Thomas Rich&apos;s School in
        Gloucester. Here is where I have studied and what I did alongside it.
      </p>

      <ul className="border-t">
        {EDUCATIONS.map((education) => (
          <li
            key={education.org}
            className="grid gap-2 border-b py-6 sm:grid-cols-[10rem_1fr] sm:gap-6"
          >
            <p className="label-mono pt-1">{education.period}</p>
            <div className="min-w-0 space-y-4">
              <div className="space-y-1">
                <h2 className="text-lg">{education.org}</h2>
                {education.course && (
                  <p className="text-muted-foreground text-sm">
                    {education.course}
                  </p>
                )}
              </div>

              <dl className="grid max-w-prose gap-x-6 gap-y-1 text-sm sm:grid-cols-[7rem_1fr]">
                {education.grades.map((grade) => (
                  <Fragment key={grade.level}>
                    <dt>{grade.level}</dt>
                    <dd className="text-muted-foreground">{grade.grade}</dd>
                  </Fragment>
                ))}
              </dl>

              {education.academic_extra && (
                <ExtraList label="Academic" items={education.academic_extra} />
              )}
              {education.other_extra && (
                <ExtraList label="Other" items={education.other_extra} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
