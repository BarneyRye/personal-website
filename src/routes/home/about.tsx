import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/page-header'
import meskiing from '@/public/meskiing-sm.webp'
import polome from '@/public/polome-sm.webp'

export const Route = createFileRoute('/home/about')({
  component: RouteComponent,
})

const FOCUS_AREAS = [
  'PCB design with Altium Designer',
  'Embedded firmware in C',
  'STM32 microcontrollers',
  'Brushless motor control & BEMF sensing',
  'Flight avionics & data logging',
  'High-powered model rocketry',
  'Full-Stack web design',
  'Hydrogen combustion chamber design',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="Aerospace engineer with a fondness for avionics and control" />

      <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
        <div className="min-w-0 flex-1 space-y-4 text-muted-foreground [&>p]:max-w-prose">
          <p>
            Hi, I&apos;m Barney, a second-year MEng Aerospace Engineering
            student at the University of Sheffield. The degree gives me the
            broad picture of aerodynamics, structures, control and management,
            but in my own time I gravitate towards PCB and embedded design.
          </p>
          <p>
            I have spent time learning the tools industry actually uses, from
            Altium Designer for PCB layout to STM32 microcontrollers and the C
            firmware that runs on them. That lets me take a project the whole
            way through, from schematic and custom board to working hardware,
            which is how I built a brushless motor controller, an STM32
            development board and a benchtop oscilloscope.
          </p>
          <p>
            Outside of coursework I work with Seadream Rocketry on high-powered
            model rockets and their avionics, and spend time in the university
            makerspace, iForge.
          </p>
        </div>
        <img
          src={polome}
          alt="Barnaby Rye"
          decoding="async"
          className="order-first w-full shrink-0 rounded-lg sm:order-last sm:w-52"
        />
      </div>

      <section className="space-y-4">
        <h2 className="label-mono">What I&apos;ve worked with</h2>
        <ul className="grid gap-x-10 gap-y-2 text-sm sm:grid-cols-2">
          {FOCUS_AREAS.map((item) => (
            <li key={item} className="flex gap-3 border-b py-2">
              <span className="text-primary">&mdash;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
        <div className="min-w-0 flex-1 space-y-4 text-muted-foreground [&>p]:max-w-prose">
          <h2 className="label-mono">Away from the bench</h2>
          <p>
            When I&apos;m not working on anything engineering, I spend my time
            skiing or cooking. Both are a welcome break from a screen and a
            soldering iron, though the same habit of fussing over the details
            tends to follow me into the kitchen.
          </p>
        </div>
        <img
          src={meskiing}
          alt="Barnaby Rye skiing"
          loading="lazy"
          decoding="async"
          className="order-first w-full shrink-0 rounded-lg sm:w-52"
        />
      </section>
    </div>
  )
}
