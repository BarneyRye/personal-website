import { createFileRoute, Link, type LinkProps } from '@tanstack/react-router'

export const Route = createFileRoute('/home/experiences')({
  component: RouteComponent,
})

interface Experience {
  role: string
  org: string
  period: string
  blurb: string
  highlights: string[]
  to?: LinkProps['to']
}

const PROJECT_EXPERIENCES: Experience[] = [
  {
    role: 'Rep and 3D printing team member',
    org: 'iForge, University of Sheffield',
    period: 'March 2026 - Current',
    blurb:
      'Supervising users in the makerspace, advising on manufacturing, and full-stack work on the iForge website.',
    highlights: [
      'Using and maintaining workshop tools, both hand and machine, across a range of techniques',
      'Supervising users to keep the space safe and advise on how to make things',
      'Building a 3D printing print queue for the iForge website',
    ],
    to: '/team/iforge',
  },
  {
    role: 'Combustion chamber team member',
    org: 'Solotron',
    period: 'March 2026 - Current',
    blurb:
      'Research into piston engines running on hydrogen combustion for aircraft.',
    highlights: [
      'Hydrogen fuel injection into the combustion chamber, designing for good mixing and no leakage',
    ],
    to: '/team/solotron',
  },
  {
    role: 'Avionics',
    org: 'Seadream Rocketry',
    period: 'September 2025 - Current',
    blurb:
      'Design, build and testing of high-powered model rockets, with a focus on the avionics.',
    highlights: [
      'A custom flight data recorder that doubles as a separation camera logger',
      'A two-stage high-powered rocket',
    ],
    to: '/team/seadream',
  },
]

const WORK_EXPERIENCES: Experience[] = [
  {
    role: 'Receptionist',
    org: 'Cheltenham Lido',
    period: 'March 2024 - Current',
    blurb: 'Admissions on site, handling queries and general administration.',
    highlights: [
      'Managing admissions and ticketing for a busy public site',
      'Answering customer queries in person and over the phone',
      'General administration alongside the front-of-house team',
    ],
  },
  {
    role: 'Work experience',
    org: 'Schlumberger',
    period: 'July 2023',
    blurb: 'A week of insight into the working life of an everyday engineer.',
    highlights: [
      'How the company sets its goals and measures success',
      'How engineering work is organised and run day to day',
      'Hands-on CAD work designing a custom turbine',
    ],
  },
  {
    role: 'Summer internship',
    org: 'Ultra Precion Control Systems',
    period: 'July 2022',
    blurb:
      'A week-long internship with a group of seven, introducing engineering practice and teamwork through talks with employees and a group design project.',
    highlights: [
      'Designed mechanical parts of a robot arm intended for a remote-controlled vehicle working in hazardous areas',
      'Focused on the gripper, integrating it with the electronics and software the rest of the group were building',
      'Worked to a brief as a team, with each member owning a different part of the design',
    ],
  },
]

function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <ul className="border-t">
      {experiences.map((experience) => (
        <li
          key={`${experience.org}-${experience.role}`}
          className="grid gap-2 border-b py-6 sm:grid-cols-[10rem_1fr] sm:gap-6"
        >
          <p className="label-mono pt-1">{experience.period}</p>
          <div className="min-w-0 space-y-3">
            <div className="space-y-1">
              <h3 className="text-lg">{experience.role}</h3>
              <p className="text-muted-foreground text-sm">{experience.org}</p>
            </div>
            <p className="max-w-prose text-muted-foreground">
              {experience.blurb}
            </p>
            <ul className="space-y-2 text-sm">
              {experience.highlights.map((highlight) => (
                <li key={highlight} className="flex max-w-prose gap-3">
                  <span className="text-primary">&mdash;</span>
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
            {experience.to && (
              <Link
                to={experience.to}
                className="inline-block text-primary text-sm hover:underline"
              >
                Read more
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

function RouteComponent() {
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="label-mono">About</p>
        <h1 className="max-w-prose text-balance text-3xl -mb-6">
          My experiences
        </h1>
      </header>

      <p className="max-w-prose text-muted-foreground">
        Alongside my degree I work with student teams and the university
        makerspace, which is where most of my hands-on engineering happens. I
        have also worked both in and out of the engineering sector. Here is what
        I have been involved in.
      </p>

      <section className="space-y-4">
        <h2 className="label-mono">Teams and societies</h2>
        <ExperienceList experiences={PROJECT_EXPERIENCES} />
      </section>

      <section className="space-y-4">
        <h2 className="label-mono">Work experience</h2>
        <ExperienceList experiences={WORK_EXPERIENCES} />
      </section>
    </div>
  )
}
