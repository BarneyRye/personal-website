import {
  ProjectFigure,
  ProjectIntro,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  ProjectStatus,
  type Spec,
} from '@/components/project'
import firstsustainerdd from '@/public/seadream/firstsustainerdd.mp4'
import seadreamrocketfirst from '@/public/seadream/seadreamrocketfirst.webp'
import seadreamtwostagelaunch from '@/public/seadream/seadreamtwostagelaunch.mp4'

export const title = 'Two Stage'
export const year = '2025 - 2026'
export const start = '2025-11'
export const duration = 500

const SPEC: Spec[] = [
  { label: 'Stages', value: 'Currently has 2, but can have more' },
  {
    label: 'Avionics',
    value: 'Selection of boards for dual deploy, logging and video footage',
  },
  {
    label: 'Dimensions',
    value:
      '161cm long as a full stack, 7.92cm maximum body diameter, 2842g dry and 3318g with both motors loaded',
  },
  {
    label: 'Motors',
    value:
      'I175 in the booster staging to a G80 in the sustainer, with the sustainer also flying on its own on G and H class motors',
  },
]

const AVIONICS: string[] = [
  'Fluctus, COTS board with 3 pyro channels, GPS and telemetry',
  'Blue Raven, COTS board with 3 pyro channels and bluetooth for coding/short range telemetry',
  'Custom logger, to log pressure, temperature, acceleration, gyro and humidity',
  'RunCam, camera that points out horizontally to record flight footage',
]

const SIM: Spec[] = [
  { label: 'Configuration', value: 'I175 booster staging to a G80 sustainer' },
  { label: 'Apogee', value: '876m' },
  { label: 'Max velocity', value: '109 m/s, Mach 0.324' },
  { label: 'Max acceleration', value: '66.7 m/s2' },
  {
    label: 'Stability',
    value: 'CG at 90.5cm and CP at 117cm, giving 3.3 calibres at Mach 0.3',
  },
]

export function Project() {
  return (
    <div className="space-y-12">
      <ProjectIntro>
        <p>
          This is Seadream's first two stage rocket, and was fundamental in
          exploring and learning about the design and build process as a whole.
          We didn't go head first but first designing and testing each phase
          first. Sustainer on single deploy, sustainer on dual deploy then two
          stage finally.
        </p>
        <p>
          The design is modular to allow us to fit different avionics bays and
          also add more stages where we see fit. The robust airframe allows us
          to fly on a range of high powered motors.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={seadreamrocketfirst}
        alt="First two-stage sustainer"
        caption="Seadream Rocketry's first two stage sustainer on the launch pad at MRC"
        portrait
      />

      <ProjectSection title="Airframe">
        <p>
          The full stack is 161cm long with a maximum body diameter of 7.92cm,
          and weighs 2842g dry or 3318g with both motors loaded. The sustainer
          carries the nose cone, the avionics and the upper motor mount, with
          the booster below it carrying the larger motor and its own fin set.
        </p>
        <p>
          The nose cone holds a 3D printed tip and is a hand layup using
          fibreglass. The coupler which holds the avionics bay sits between it
          and the body tubes. The motor mount runs down an inner tube held by
          four centering rings, which also carries the load from the motor into
          the airframe rather than into the fins. The body tube is made of
          carbon fibre tube for its strength-to-weight ratio.
        </p>
        <ProjectSpecs specs={SPEC} />
      </ProjectSection>

      <ProjectSection title="Avionics">
        <p>
          The avionics bay is sized so we can have more than one board at a
          time. It is there to house 2 COTS boards for redundancy, our custom
          logger and anything else we would like to house, e.g. a camera, with
          the required batteries.
        </p>
        <ProjectList items={AVIONICS} />
      </ProjectSection>

      <ProjectFigure
        src={firstsustainerdd}
        alt="Seadream first sustainer dual deploy video"
        caption="Seadream's first sustainer launching with dual deploy for the first time"
        video
        portrait
      />

      <ProjectSection title="Flight History">
        <p>
          The first flight was the sustainer on its own on a G80, flying single
          deploy off the motor ejection charge. The aim was simply to prove the
          airframe and successfully recover, before adding anything else to it.
          The flight was successful.
        </p>
        <p>
          The second flight moved the sustainer up to an H motor and switched to
          dual deploy, with a drogue at apogee and the main held back until
          lower down. This was the first flight where the recovery was under the
          control of the avionics rather than the motor, so it was also the
          first real test of the pyro channels and the altimeters.
          Unfortunately, our shear pins were not strong enough, so the main came
          out early, but we still recovered successfully. We also found that the
          coupler was blocking the GPS signal, therefore we needed to make some
          adjustments for the next flight.
        </p>
        <p>
          Our latest flight was the full stack flight, with an I175 in the
          booster and G80 in the sustainer. The flight was a bit unstable at
          launch causing it to tilt straight of the pad before lining up, which
          could have been solved with a longer rod. However, we did not reach
          the lockout angle of the sustainer ignition, which allowed for our
          sustainer to reach an altitude of 657m as opposed to the simulated
          apogee of 876m. That being said, we had successful recover, with the
          booster and sustainer drogue/main parachutes deploying.
        </p>

        <ProjectSection title="Simulated Flight Data">
          <ProjectSpecs specs={SIM} />
        </ProjectSection>

        <ProjectFigure
          src={seadreamtwostagelaunch}
          alt="Seadream two stage launch video"
          caption="Seadream's first two-stage rocket launching for the first time"
          video
          portrait
        />

        <ProjectStatus>
          This project is now complete, with a successful two stage launch.
          However, there were a few issues with the design and build stages,
          with rushing and inconsistencies, which will be improved upon in the
          following years.
        </ProjectStatus>
      </ProjectSection>
    </div>
  )
}
