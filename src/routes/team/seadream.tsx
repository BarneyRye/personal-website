import { createFileRoute } from '@tanstack/react-router'
import { FaInstagram, FaLinkedin } from 'react-icons/fa'
import { PageHeader } from '@/components/page-header'
import {
  ProjectIntro,
  ProjectLink,
  ProjectSection,
  ProjectSpecs,
  ProjectStatus,
  type Spec,
} from '@/components/project'
import { Projects } from '@/components/seadream/projects'
import seadreamlogo from '@/public/seadream/seadreamlogo.webp'

export const Route = createFileRoute('/team/seadream')({
  component: RouteComponent,
})

const INSTAGRAM = 'https://www.instagram.com/seadreamrocketry/'
const LINKEDIN = 'https://www.linkedin.com/company/seadream-rocketry/'

const TEAMS: Spec[] = [
  {
    label: 'Structures',
    value:
      'The frame and aerodynamics, split into sustainer and booster sub-teams',
  },
  {
    label: 'Avionics',
    value: 'The electronics and control of telemetry, control and deployment',
  },
]

const SUB_TEAMS: Spec[] = [
  {
    label: 'Sustainer',
    value:
      'Responsible for the upper stage, notably including the nosecone and main avionics bay.',
  },
  {
    label: 'Booster',
    value:
      'Responsible for the lower stage, with a focus on the interstage and separation',
  },
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="High-powered amateur rocketry team" />
      <ProjectIntro>
        <div className="flex flex-col gap-6 items-start sm:flex-row sm:gap-10">
          <div className="min-w-0 flex-1 space-y-4 [&>p]:max-w-prose">
            <p>
              Seadream Rocketry is a student-run high-powered rocketry team
              based in Sheffield. We design, build and fly our own rockets with
              the aim to develop our skills and hopefully break some records on
              the way.
            </p>
            <p>
              I am a part of the avionics team inside the group, which has a key
              focus on the separation, recovery and ignition electronics which
              allows our rockets to return safely and in one piece. We are also
              experimenting with custom PCBs for data logging, and now more
              ambitiously, a custom flight computer with roll control
              capabilities.
            </p>
            <ProjectStatus>
              Seadream Rocketry is moving into its second year of activity.
              While we are solely made up of University of Sheffield students,
              we are not affiliated with the uni in any way.
            </ProjectStatus>
          </div>
          <img
            src={seadreamlogo}
            alt="Seadream Rocketry logo"
            decoding="async"
            className="order-first w-full shrink-0 sm:order-last sm:w-64"
          />
        </div>
      </ProjectIntro>

      <ProjectSection title="Our Teams">
        <ProjectSpecs specs={TEAMS} />
        <ProjectSection title="Sub Teams">
          <ProjectSpecs specs={SUB_TEAMS} />
        </ProjectSection>
        <p>
          All are teams and sub team work tightly together to ensure a sturdy
          and complete final product. This is very important due to integration
          of components having a major impact on success. The interstage,
          avionics bay, overall stability are notable points of interaction,
          which have led to successful launches.
        </p>
      </ProjectSection>

      <ProjectSection title="Our Projects">
        <p>
          Over the last year, I have been involved in a couple projects as a
          part of Seadream, and we have ambitious goals looking forward. Here
          are some of our projects.
        </p>
        <Projects />
      </ProjectSection>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <ProjectLink href={INSTAGRAM} Icon={FaInstagram} label="Instagram" />
        <ProjectLink href={LINKEDIN} Icon={FaLinkedin} label="Linkedin" />
      </div>
    </div>
  )
}
