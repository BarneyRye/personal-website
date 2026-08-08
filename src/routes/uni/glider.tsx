import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/page-header'
import {
  ProjectFigure,
  ProjectIntro,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  ProjectStatus,
  type Spec,
} from '@/components/project'
import glider_cad_backgrond from '@/public/glider/glider_cad.webp'
import glider_video_compressed from '@/public/glider/glider_video_compressed.mp4'

export const Route = createFileRoute('/uni/glider')({
  component: RouteComponent,
})

const MATERIALS: Spec[] = [
  { label: 'Plywood', value: 'One 300 x 300mm sheet at 3mm thick' },
  { label: 'Balsa', value: 'One 910 x 100mm sheet at 3.2mm thick' },
  { label: 'Carbon', value: 'One 500mm length of 4mm outer diameter tube' },
  {
    label: 'Propulsion',
    value:
      'Two 9g brushless motors and two propellers, one clockwise and one anticlockwise',
  },
  {
    label: 'Consumables',
    value: 'Covering film, tape, wire, piano wire, fixings and adhesive',
  },
  { label: '3D printing', value: 'A single 200 x 200mm platen' },
]

const REQUIREMENTS: string[] = [
  'Take off from the floor unassisted, with everyone stood outside the flying arc',
  'Fly at the height of the pole, keeping the tether roughly horizontal, for at least one full circuit',
  'Take all of its power down the tether, with no battery or radio link on board',
  'Be built from the issued material allowance and nothing else',
  'Be buildable inside two three hour workshop sessions',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="First year around the pole glider project"></PageHeader>
      <ProjectIntro>
        <p>
          This university project involved design, build and flying of a glider
          that is attached to a pole so will fly around it. We were split into a
          team of 5 to work on it.
        </p>
      </ProjectIntro>
      <ProjectFigure
        src={glider_cad_backgrond}
        alt="Glider CAD"
        caption="Snapshot of the glider CAD in Fusion 360"
        sheet
      />

      <ProjectSection title="The Brief">
        <p>
          A round the pole flyer is tethered to the top of a pole and flies laps
          around it, so it never flies in a straight line. Power comes down the
          tether itself from a variable supply outside the flight arc, which
          means there is no battery and no radio on board. Control comes
          strictly via a throttle that control the motor controller.
        </p>
        <p>
          That leaves very little to trim in flight, therefore everything has to
          be configured in the design. As there is no control surfaces, the
          glider must leave the ground by increasing its speed to it pulls on
          the tether enough to pick it up.
        </p>
        <ProjectList items={REQUIREMENTS} />
      </ProjectSection>

      <ProjectSection title="Materials">
        <p>
          The material allowance was fixed, and the design had to come out of it
          with nothing else added. That turned out to be the thing that shaped
          the aircraft more than any aerodynamic decision. The limitations of
          each material led to decisions such as spar and fuselage length etc.
        </p>
        <ProjectSpecs specs={MATERIALS} />
      </ProjectSection>

      <ProjectSection title="Design And Build">
        <p>
          The design was done in Fusion 360, which let us easily collaborate and
          work on our own components. It also provides suitable exports so we
          can easily manufacture after the design phase.
        </p>
        <p>
          We decided to stick to balsa, as it was lighter while still
          maintaining the rigidity we needed. We used it to laser cut out our
          wing ribs, fuselage and tailwing, providing the main structure to the
          glider. The wings were constructed with the carbon fibre rod, the
          balsa ribs and then wrapped the wings with film and attached it via a
          heating iron.
        </p>
        <p>
          We then designed and 3D printed a bracket to mount the wings and
          motors, which added a slight dihedral and sweep angle to the wing. We
          decided on both motors, as it allowed for greater thrust while adding
          proportionally less mass. It also helped balance out the torque around
          the central axis. We also 3d printed a arch and wheels for the front
          landing gear which connected with piano wire for the axle.
        </p>
        <p>
          For the build, we laser cut the balsa and 3D printed the
          brackets/wheels before even entering the workshop. Once they were
          ready, we moved into the workshop to glue up the wing ribs, tailwing
          and front wheel arch, before finally screwing the wings, motors and
          front wheel arch to the fuselage. Before it was ready we had to solder
          an extension cable for the motors, which after we were ready for
          flight.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={glider_video_compressed}
        alt="Glider flying around the pole"
        caption="Video of the glider flying on test day"
        video
      />

      <ProjectSection title="Flight Testing">
        <p>
          Testing was done in next to the workshop, with a pole and tether sat
          in the centre. The glider was attached using the tether and power
          lines. It took off from the floor under its own power and flew laps
          around the pole, which was what the brief asked for.
        </p>
        <ProjectStatus>
          The glider took off unassisted and completed circuits at pole height
          on test day, hitting its goal.
        </ProjectStatus>
      </ProjectSection>
    </div>
  )
}
