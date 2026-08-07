import {
  ProjectFigure,
  ProjectIntro,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  ProjectStatus,
  type Spec,
} from '@/components/project'
import seadreamrocketfirst from '@/public/seadream/seadreamrocketfirst.webp'

export const title = 'Two Stage'
export const year = '2025 - 2026'
export const start = '2025-10'
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
  'Custom logger, to log pressure, temperature, acceleration , gyro and humidity',
  'RunCam, camera that points out horizontally to record flight footage',
]

const SIM: Spec[] = [
  { label: 'Configuration', value: 'I175 booster staging to a G80 sustainer' },
  { label: 'Apogee', value: '876m' },
  { label: 'Max velocity', value: '109 m/s, Mach 0.324' },
  { label: 'Max acceleration', value: '66.7 m/s2' },
  {
    label: 'Stability',
    value: 'CG at 90.5cm and CP at 117cm, giving 3.3 calibers at Mach 0.3',
  },
]

export function Project() {
  return (
    <div className="space-y-12">
      <ProjectIntro>
        <p>
          This is Seadream's first two stage rocket, and was fundamental in
          explortin and learning about the design and build process as a whole.
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
          fibregalss. The coupler which holds the avioncis bay sits betyween it
          and the body tubs. The motor mount runs down an inner tube held by
          four centering rings, which also carries the load from the motor into
          the airframe rather than into the fins. The body tube is bade of
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
          first real test of the pyro channels and the altimeters. Unfortunatly,
          our shear pins were not strong enough, so the main came out early, but
          we still recovered successfully. We also found that the coupler was
          blocking the GPS signal, therefore we needed to make some adjustements
          for the next flight.
        </p>
        <p>
          The next flight is the full two stage, with an I175 in the booster
          staging to the G80 in the sustainer. Simulated in OpenRocket, that
          configuration gets to 876m with a maximum velocity of 109 m/s, a
          maximum acceleration of 66.7 m/s2, and a stability margin of 3.3
          calibers.
        </p>
        <ProjectSpecs specs={SIM} />
        <ProjectStatus>
          The sustainer has flown successfully on both the single deploy G80 and
          the dual deploy H flights. The full two stage stack is built and
          simulated, and is currently waiting on a launch, as the July launches
          were cancelled due to lack of moisture fro mthe heatwave..
        </ProjectStatus>
      </ProjectSection>
    </div>
  )
}
