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
import laucnhvideo from '@/public/grouprocket/laucnhvideo.mp4'
import merocketprelaunch from '@/public/grouprocket/merocketprelaunch.webp'
import rocketgroupme from '@/public/grouprocket/rocketgroupme.webp'
import rocketonpad from '@/public/grouprocket/rocketonpad.webp'

export const Route = createFileRoute('/uni/rocket')({
  component: RouteComponent,
})

const REQUIREMENTS: Spec[] = [
  {
    label: 'Apogee',
    value:
      '650ft or 198m above the launch site, with rockets that substantially overshoot penalised as much as ones that fall short',
  },
  {
    label: 'Payload',
    value:
      'Two altimeters and a VIFLY Finder 2 recovery buzzer, in a removable canister that keeps them intact and serviceable for reuse',
  },
  {
    label: 'Recovery',
    value: 'Tumble only, with parachutes explicitly not allowed',
  },
  { label: 'Stability', value: 'Between 0.7 and 1.8 calibres' },
  {
    label: 'Structure',
    value:
      'BT-80 lower tube, plywood bulkheads and couplers with no 3D printed parts in the load path, and a visible epoxy bead for inspection',
  },
  {
    label: 'Mass',
    value:
      'Not specified directly, but the altitude target puts a working rocket somewhere around 350 to 700g',
  },
]

const MOTOR: Spec[] = [
  { label: 'Motor', value: 'AeroTech Enerjet F44W-8, 24mm, single use' },
  { label: 'Impulse', value: '41.5 Ns total' },
  { label: 'Thrust', value: '44N average and 49.5N peak' },
  { label: 'Burn', value: '1.0 second, with an 8 second ejection delay' },
  { label: 'Mass', value: '49.8g loaded, of which 19.7g is propellant' },
]

const DESIGN: string[] = [
  'Rounded nose cone with the avionics bay built into it, held on with eight grub screws so the payload stays accessible',
  'Canards ahead of the centre of gravity to improve how the rocket behaves once it is tumbling',
  'Large slotted tail fins, sized to win back the stability the canards cost',
  'Plywood bulkheads and motor mount reinforced with epoxy, as required for the shock cord to be trusted at separation',
  'Removable payload canister carrying both altimeters, their batteries and the recovery buzzer',
]

const RESULTS: Spec[] = [
  { label: 'Predicted mass', value: '472.3g without the motor, at week 7' },
  { label: 'Delivered mass', value: '496.0g without the motor' },
  {
    label: 'Apogee',
    value:
      'Around 30m under the 198m target, with a flight around 10s shorter than predicted',
  },
  {
    label: 'Recovery',
    value: '100% of the payload recovered with the flight data intact',
  },
  { label: 'Cost', value: '£250.94 with the telemetry, £95.94 without it' },
]

const LESSONS: string[] = [
  'Refine the initial conditions in the model, since that is where most of the prediction error came from',
  'Slot the centering rings so the fins align themselves during assembly rather than being lined up by a jig',
  'Fully seal the upper bulkhead, so the ejection pressure wave cannot reach the barometer and corrupt the altitude data',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="Second year data collection model rocket"></PageHeader>
      <ProjectIntro>
        <p>
          This project took place in the second semester of my second year at
          uni. We were tasked with building and designing a model rocket, flying
          on an F44W-8 solid rocket motor, and carrying a flight altimeter
          payload.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={merocketprelaunch}
        alt="Me holding the rocket before the launch"
        caption="A picture of me holding the rocket fully assembled and ready before the launch"
        portrait
      />

      <ProjectSection title="The Brief">
        <p>
          The rocket was to carry two altimeters up to a set altitude and bring
          them back intact, as a way of collecting atmospheric data and proving
          the instruments. The interesting part of the brief is that the
          altitude was a target rather than a maximum. Going substantially over
          198m was penalised in the same way as falling short, so the job was to
          hit a number rather than to go as high as possible, and mass became
          the main way of tuning towards it. This is because in real life, we
          never just try to go high, but hit a fixed apogee, for orbit etc.
        </p>
        <p>
          The other constraint that shaped everything was recovery. Parachutes
          were banned outright, so the rocket had to come back down by tumbling.
          That makes how the vehicle behaves after separation a design problem
          rather than something a parachute takes care of.
        </p>
        <ProjectSpecs specs={REQUIREMENTS} />
      </ProjectSection>

      <ProjectSection title="The Motor">
        <p>
          Every group flew the same motor, which fixes the total impulse
          available and makes the altitude target purely a question of mass and
          drag. It burns for a single second and then coasts, so almost all of
          the flight is unpowered, and the eight second delay sets when the
          ejection charge fires and the rocket separates.
        </p>
        <ProjectSpecs specs={MOTOR} />
      </ProjectSection>

      <ProjectSection title="Design">
        <p>
          The design was done in OpenRocket, backed up with hand calculations,
          including the maximum g load under thrust, the delta V from the motor,
          the mass fraction, the drag on the way up and again during the tumble,
          and the altitude at separation. Having both meant each could be used
          to check the other.
        </p>
        <p>
          The nose cone carries the avionics bay inside it, held on with eight
          grub screws, which keeps the altimeters reachable without pulling the
          rocket apart. The canards were added to improve the tumble, since with
          no parachute the descent behaviour is entirely down to the geometry.
          They cost stability, because surface area ahead of the centre of
          gravity always does, so the tail fins were made larger and slotted to
          bring the margin back inside the 0.7 to 1.8 window we had to sit in.
        </p>
        <p>
          Aesthetics wise, we were given free rein, as long as it wasn't
          offensive, rude etc. Our group was called tung tung takeoff, as during
          the group meetings, there was a running joke about it, which helped us
          bond and work well as a team. Thus, our rocket was painted to resemble
          the fictional character.
        </p>
        <ProjectList items={DESIGN} />
      </ProjectSection>

      <ProjectSection title="Build">
        <p>
          Plywood was laser cut and the printed parts made through service
          manufacture, with the bulkheads and couplers having to be ply rather
          than printed since they carry the shock cord load at separation and
          force from the ejection charge. Those joints also had to show a
          visible fillet of epoxy for inspection, so the rocket could not be
          signed off for flight without it.
        </p>
        <p>
          One awkward part of the build was alignment, as we were using tail
          fins and canards, we had to make them align so that the rail buttons
          didn't get in the way. We also needed to use a jig to secure the fins
          in place when epoxying, as they needed to align with the fin slots.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={rocketonpad}
        alt="The rocket on the launch rail"
        caption="On the rail at the launch site, waiting to fly"
        portrait
      />

      <ProjectSection title="The Altimeter">
        <p>
          The altimeter for the rocket was from a separate module on our course.
          For this we worked in a group of 2 to code it given some basic
          libraries to code the altimeter in C. The rocket groups ended up being
          2 of these groups merged to form a group of 6.
        </p>
        <p>
          The coding consisted of us using partially prebuilt I2C, spi/SD,
          barometer and imu libraries. We were tasked with completing these
          libraries and then using them in the main to integrate them into a
          fully capable logging altimeter.
        </p>
        <p>
          While the requirements for the module were stricter requiring specific
          methods of coding and fixed logging rate of 10Hz. We were able to
          modify the code for launch, which allowed me to achieve 100Hz. While I
          did manage to get higher, I didn't want to push it due to the
          limitation of the hardware. For instance the SD card would stall the
          code every so often. Luckily I have had experience coding altimeters
          before in Seadream.
        </p>
      </ProjectSection>

      <ProjectSection title="Launch Day">
        <p>
          The launch was in a field out in the peak district in the middle of
          May, with motors and igniters only handed out on the day and three of
          us from the group allowed on site. The weather was against us with
          strong winds and rain, which turned out to matter to the result.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={laucnhvideo}
        alt="The rocket launching"
        caption="The launch, from ignition through to the rocket coming back down"
        video
        portrait
      />

      <ProjectSection title="How It Went">
        <p>
          It flew straight and stably, which validated the four fin
          configuration and the stability margin we had designed to, and every
          piece of the payload came back. Both altimeters, both batteries and
          the buzzer were recovered with the flight data fully preserved, which
          was the actual point of the exercise. However, there was a slight
          wobble during the first few milliseconds of flight, but it self
          corrected anyway.
        </p>
        <p>
          The altitude was less good. We came in around 30m under the target and
          the flight was about ten seconds shorter than predicted. Three things
          fed into that. The rocket was delivered 23.7g heavier than the mass we
          had predicted at week 7, the conditions on the day were poor, and the
          launch rail was angled, so some of the impulse went into horizontal
          distance rather than altitude.
        </p>
        <p>
          Worth noting on the cost, the two altimeters and their batteries came
          to £155 of a £250.94 build. The rocket itself was under a hundred
          pounds, and everything else was the instruments it existed to carry.
        </p>
        <ProjectSpecs specs={RESULTS} />
      </ProjectSection>

      <ProjectFigure
        src={rocketgroupme}
        alt="Me holding the recovered rocket after the flight"
        caption="The rocket back in one piece after the flight in the rain"
        portrait
      />

      <ProjectSection title="Lessons Learnt">
        <p>
          The most useful finding was in the data rather than the flight. The
          upper bulkhead was not fully sealed, so the pressure wave from the
          ejection charge reached the barometer and showed up in the altitude
          trace. It is a small detail that quietly damages the measurement the
          whole rocket exists to take.
        </p>
        <ProjectList items={LESSONS} />
        <ProjectStatus>
          The rocket flew stably, undershot the target altitude by around 30m,
          and returned the full payload and its flight data intact.
        </ProjectStatus>
      </ProjectSection>
    </div>
  )
}
