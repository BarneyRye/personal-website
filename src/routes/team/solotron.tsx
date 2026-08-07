import { createFileRoute } from '@tanstack/react-router'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { SiLinktree } from 'react-icons/si'
import { PageHeader } from '@/components/page-header'
import {
  ProjectFigure,
  ProjectIntro,
  ProjectLink,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  ProjectStatus,
  type Spec,
} from '@/components/project'
import solotronlogo from '@/public/solotron.webp'

export const Route = createFileRoute('/team/solotron')({
  component: RouteComponent,
})

const LINKTREE = 'https://linktr.ee/project.solotron'
const LINKEDIN = 'https://www.linkedin.com/company/project.solotron'
const INSTAGRAM = 'https://www.instagram.com/project.solotron'

const TEAMS: Spec[] = [
  { label: 'Hydrogen', value: 'How hydrogen is stored for later use' },
  {
    label: 'Fuel Pump',
    value: 'The movement of hydrogen from storage to combustion',
  },
  {
    label: 'Combustion Chamber',
    value: 'Injection and combustion of hydrogen to produce rotation',
  },
  {
    label: 'TurboCharger',
    value: 'Exhaust turbine and inlet air compression',
  },
]

const GOALS: string[] = [
  'Research and feasibility testing of converting a piston engine to run on hyrdrogen',
  'Design a hydrogen-powered piston engine suitable for light aircraft',
  'Design a safe testing system to run and instrument that engine on the ground',
  'Split the problem across sub-teams covering storage, delivery, combustion and forced induction',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="A research project into hydrogen combustion engines for aircraft" />

      <ProjectIntro>
        <p>
          Project Solotron is a University of Sheffield student-led engineering
          project designing a hydrogen aircraft engine for light aircraft. We
          are researching the feasibility of converting an existing piston
          aircraft engine to run on hydrogen, with the eventual goal of a
          hydrogen-powered piston engine and a safe test system to run it on.
        </p>
        <p>
          Like the other co-curricular engineering projects at Sheffield, the
          team is made up of students across year groups and disciplines, with
          academic staff advising rather than running it. The work is split
          across sub-teams so each part of the design from storage to exhaust
          has its own group of students working on it.
        </p>
      </ProjectIntro>

      <ProjectStatus>
        Currently it is purely in the research and design stage. No
        manufacturing or testing has been done.
      </ProjectStatus>

      <ProjectFigure
        src={solotronlogo}
        alt="Solotron Logo"
        caption="Project Solotron, a University of Sheffield student-led project."
      />

      <ProjectSection title="Our Aim">
        <ProjectList items={GOALS} />
      </ProjectSection>

      <ProjectSection title="Our Teams">
        <ProjectSpecs specs={TEAMS} />
      </ProjectSection>

      <ProjectSection title="Combustion Chamber team">
        <p>
          I am apart of the Combustion Chamber Team, whos purpose it to research
          and design the main engine chambers, crankshaft, injection and
          exhaust. Hydrogen behaves very differently to petrol here. It burns
          far faster, ignites at different temperatures, has a much more
          explosive combustion. As well as thew difficulties in the chamber, we
          also have to deal with mixing and injection. As hydrogen is alot
          smaller it can find its way through gaps more easily, and due to
          releasing more energy on combustion, it is a more lean mixture.
        </p>
      </ProjectSection>

      <ProjectSection title="My Responsibilities">
        <p>
          Within the combustion chamber team I focus on the injection and proper
          mixing of the hydrogen and air. I look at previous petrol design and
          hydrogen research to decide on the next steps. I need to consider how
          to inject and properly mix, what pressures and state should it be at,
          and any geometry and alteratrions need to be made.
        </p>
      </ProjectSection>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <ProjectLink href={LINKTREE} Icon={SiLinktree} label="Linktree" />
        <ProjectLink href={LINKEDIN} Icon={FaLinkedin} label="LinkedIn" />
        <ProjectLink href={INSTAGRAM} Icon={FaInstagram} label="Instagram" />
      </div>
    </div>
  )
}
