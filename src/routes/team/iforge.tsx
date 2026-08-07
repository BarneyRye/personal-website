import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/page-header'
import {
  ProjectIntro,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  RepoLink,
  type Spec,
} from '@/components/project'
import iforgelight from '@/public/iforge/iforge.webp'
import iforgedark from '@/public/iforge/iforge-dark.webp'

const REPO = 'https://github.com/iforge-uos/ignis'

const RESPONSIBILITIES: Spec[] = [
  { label: 'Support', value: 'Help users with queries and suggestions' },
  {
    label: 'Safety',
    value: 'Ensure users are following Health and Safety requirements',
  },
  {
    label: 'Operations',
    value: 'Keep the iForge systems running on and off shifts',
  },
  { label: 'Team', value: 'Keep the 3D printers running and functional' },
]

const REQUIREMENTS: string[] = [
  'Users bring in a STL file for a rep to slice and submit',
  'Reps are able to reject, submit or put under review for a 3DP rep to check',
  'The submission allows for choosing filament, colour, priority etc based of the current printers installed filament',
  'The STL and gcode get stored in our object storage and meta data in the database',
  'An API exposes the queue and other stats for reps to check or edit',
  'Using the API the reps can send, pause/resume, cancel and finish prints based on the current queue',
  'Live print and printer status is uploaded directly to the website for users to view',
  'Maintenance and downtime can be scheduled so a printer can be disabled for a set scheduled time',
  'Users get live emails about the print status and when its ready to collect',
  'Users are able to see stats, history and livestreams all from the website',
]

export const Route = createFileRoute('/team/iforge')({
  component: RouteComponent,
})

function RouteComponent() {
  const isDark = document.documentElement.classList.contains('dark')

  return (
    <div className="space-y-12">
      <PageHeader text="The University of Sheffield student-led makerspace" />

      <ProjectIntro>
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
          <div className="min-w-0 flex-1 space-y-4 [&>p]:max-w-prose">
            <p>
              The iForge is the UK&apos;s first student-led makerspace, free to
              use for anyone at the University of Sheffield. It runs across two
              spaces: the Mainspace where most of are heavier machinery is, and
              the Heartspace in the Engineering Heartspace for crafts, textiles
              and vinyl cutting.
            </p>
            <p>
              The iForge is run and supervised by student volunteers called
              reps, like me, with oversight and advisory from some academic
              staff. All the reps are split into teams, of which I am apart of
              the 3D printing team, which oversees the operation and maintenance
              of the 3D printers and queue system.
            </p>
          </div>
          <img
            src={isDark ? iforgedark : iforgelight}
            alt="iForge Logo"
            decoding="async"
            className="order-first w-full shrink-0 sm:order-last sm:w-98"
          />
        </div>
      </ProjectIntro>

      <ProjectSpecs specs={RESPONSIBILITIES} />

      <ProjectSection title="3D print team">
        <p>
          The 3DP team looks after our printers which can be found in both the
          Mainspace and Heartspace. We have a range of printers, primarly
          consiting of Prusa Core-Ones and MK4s, an an additional Bambu H2D with
          AMS. Are printing capabilites offer PLA, PETG, TPU and now more
          recently mixed using the H2D with AMS and multi nozzle.
        </p>
      </ProjectSection>

      <ProjectSection title="The print queue">
        <p>
          I am currently working on a print queue which will integrate into
          ignis, the iForge&apos;s own website and sign-in system, to replace
          the old standalone system. The aim is that a print goes from
          submission to a running machine without a rep carrying files around,
          while still keeping a person in the loop to approve what gets printed.
          The bonus of integrating into the website, is it allows reps to submit
          from home, and users can get live information about their queued
          prints.
        </p>
        <ProjectList items={REQUIREMENTS} />
      </ProjectSection>

      <ProjectSection title="Talking to the printers">
        <p>
          The website is primarily written in typescript using prebuilt packages
          and frameworks. To talk to the printers depends on the printer
          manafacturer and model. For instance the Prusa talk via PrusaLink api
          or OctoPrint and Bambu talk via MQTTs or FTP. Therefore, all the
          printers are managed via a singleton, with driver classes using Object
          Oriented Programmng (OOP) techniques for streamlining the proccess.
        </p>
        <p>
          Files, timelapses and the history behind them are stored separately,
          with the queue itself modelled in the database alongside the rest of
          ignis. Material, mass and duration are held against each job, which is
          what makes the per-user and per-printer statistics possible.
        </p>
      </ProjectSection>

      <ProjectSection title="Where it is now">
        <p>
          The base code is currently waiting in a pull request before it gets
          implemented. While the code has been run and simulated locally on
          localhost, it has not yet been integration tested, which im sure we
          will find some bugs.
        </p>
      </ProjectSection>

      <RepoLink href={REPO} label="iforge-uos/ignis" />
    </div>
  )
}
