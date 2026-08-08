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
import dronecad from '@/public/drone/dronecad.webp'
import dronecrashed from '@/public/drone/dronecrashed.webp'
import dronefloor from '@/public/drone/dronefloor.webp'
import dronepostflight from '@/public/drone/dronepostflight.webp'

export const Route = createFileRoute('/uni/quadcopter')({
  component: RouteComponent,
})

const REQUIREMENTS: Spec[] = [
  {
    label: 'Endurance',
    value:
      'At least 7 minutes on one charge, covering take off, a run through obstacles, a hover to film a target, and the return and landing',
  },
  {
    label: 'Envelope',
    value: 'No more than 300mm in length or width, propellers included',
  },
  {
    label: 'Mass',
    value: '400g or under, excluding the battery and the GoPro',
  },
  {
    label: 'Manufacture',
    value:
      'All printed frame parts onto a single 223 x 223mm build plate in one build, in under 24 hours of print time',
  },
  {
    label: 'Payload',
    value:
      'Carry a GoPro to film the inspection target, and log flight data to an SD card as a black box',
  },
  {
    label: 'Safety',
    value:
      'Manual motor cut from the controller and an automatic cut on loss of signal, both demonstrated before any flight',
  },
  { label: 'Budget', value: '£300 per team, with bids expected well under it' },
]

const HARDWARE: string[] = [
  'SpeedyBee F405 V3 flight controller stacked with a BLS 50A 4in1 ESC',
  'FrSky XM Plus receiver running SBUS to the flight controller',
  'Four iFlight XING E-Pro 2207 2450KV motors, fixed for every team',
  'A choice of four 3S LiPos, from 850mAh up to 2200mAh',
  'A choice of 5 inch propellers in bi, tri and quad blade at a range of pitches',
  'Addressable WS2812B LEDs, optional, to make the orientation readable in the air',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="Second year unmanned air system group design project" />
      <ProjectIntro>
        <p>
          This project was to design/optimise an inspection drone, for the
          fictional company AeroMAP, set out by their statement of requirement.
          We were split into a team of six, with each of us taking a lead role
          covering project management, structures, propulsion, performance,
          control and integration, in which I focused on the control.
        </p>
        <p>
          The motors, flight controller and receiver was all fixed, components
          giving us the choice of batteries, propellers and design of the
          airframe, to achieve the desired goal of flying for at least 7 minutes
          and minimising weight.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={dronefloor}
        alt="Quadcopter hovering in the sports hall"
        caption="The finished drone hovering during the flight test day, with the GoPro mounted on top"
      />

      <ProjectSection title="The Requirement">
        <p>
          Alongside the endurance target of 7 minutes, there was a size, mass
          and manufacturing limit with a set of safety requirements that had to
          be demonstrated before anyone was allowed to fly. Nothing could be
          bought outside the supplied components list, and everything spent had
          to be tracked against the budget as the project ran.
        </p>
        <ProjectSpecs specs={REQUIREMENTS} />
      </ProjectSection>

      <ProjectSection title="Supplied Hardware">
        <p>
          The majority of the hardware was fixed: flight controller/esc, motors,
          receiver, with choices for: propellers, battery and frame material. So
          the majority of our job was to incorporate and design around these
          constraints and pick adequate components from the choice list.
        </p>
        <ProjectList items={HARDWARE} />
      </ProjectSection>

      <ProjectSection title="Frame Design">
        <p>
          The frame was designed using 2 materials, 3mm MDF for the upper
          mounting plate, and a 3D printed PLA for the complex lower frame. We
          decided on this as by using MDF it provided a key base, while not the
          strongest, it massively reduced printing time/mass and provided
          mounting points for the whole airframe.
        </p>
        <p>
          The Frame was designed in Fusion 360 as it allows for easy
          collaboration and iteration between team members. The main design was
          split into 3 parts: the MDF top plate, the lower PLA frame and the PLA
          Go-Pro/flight controller mount on top.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={dronecad}
        alt="Quadcopter CAD from Fusion 360"
        caption="The final quadcopter CAD for the frame of MDF and PLA"
      />

      <ProjectSection title="Propulsion and Power">
        <p>
          With the motors fixed, the endurance for our drone would be decided by
          the battery and propellers. The manufacturing data tables gave us
          thrust and current draw against throttle, which was used to calculate
          the average current draw. Using this data we were able to decide on
          the batteries and propellers.
        </p>
        <p>
          We decided to go with the middle pitch (4&deg;) and tri-blade for its
          balance of thrust and efficiency. This allowed us to get the final
          value for current draw, allowing us to pick a suitable battery. As the
          battery capacity increases, so does the mass, therefore we went for
          the middle of the range, as it gave us the required endurance with a
          suitable margin, without increasing weight too much.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={dronepostflight}
        alt="Quadcopter on the bench after flight"
        caption="Back on the bench after the flight, with the broken arm sat alongside it and the motor still attached"
      />

      <ProjectSection title="Certification and Flight Test">
        <p>
          Nothing flew until it had been through a flight test. This included an
          physical inspection, to check structural integrity, correct wiring of
          electronics and ensuring no loose wires. It was then placed in a net
          cage, where it was shown to be able to arm and disarm, before a final
          first takeoff. Our pilot was new so it was a bit shaky, hitting the
          net a few times, but overall it went well and onto the final flight.
        </p>
        <p>
          The flight test day itself was in a squash court, with a flight arena
          set up and a series of challenges to fly. Only staff were allowed
          inside the arena, so the aircraft was handed over and flown from the
          gallery, and any adjustments had to happen in the preparation area
          beforehand.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={dronecrashed}
        alt="Quadcopter upside down on the sports hall floor"
        caption="The end of the flight, upside down on the hall floor with a landing leg broken off"
      />

      <ProjectSection title="How It Went">
        <p>
          To put it bluntly the flight day didn't go so well. The pilot managed
          to takeoff, move slowly across the ground and land again. However, on
          the next attempt to fly it through the obstacles is were it went
          wrong. The drone itself has a bit of natural drift, which needed to be
          trimmed out, however being inexperienced like everyone else on the
          team, the was some over-compensation on the throttle and movement
          sticks. This led it to going up, then suddenly down, and finally
          hitting the floor, where a couple of its legs snapped.
        </p>
        <p>
          While not the ending we were hoping for, the team and I still managed
          to successfully design an airframe that was able to fly. Maybe with a
          little bit of trimming and more flight practice, it might have made it
          out alive.
        </p>
        <ProjectStatus>
          The drone was built, certified and flown at the demonstration day, and
          was damaged in a crash caused primarily by pilot error rather than by
          the airframe.{' '}
          <span className="font-semibold">
            (No blame on the pilot, he was the best in the team)
          </span>
        </ProjectStatus>
      </ProjectSection>
    </div>
  )
}
