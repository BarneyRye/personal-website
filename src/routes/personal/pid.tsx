import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/page-header'
import {
  ProjectFigure,
  ProjectIntro,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  ProjectStatus,
  RepoLink,
  type Spec,
} from '@/components/project'
import simulink_model from '@/public/simulink_model.webp'

export const Route = createFileRoute('/personal/pid')({
  component: RouteComponent,
})

const REPO = 'https://github.com/BarneyRye/PID-Balance-Beam'

const SPECS: Spec[] = [
  {
    label: 'Plant',
    value: 'Propeller on a beam, free to rotate about a pivot',
  },
  { label: 'Open loop', value: 'G(s) = 32.7 / s², a pure double integrator' },
  { label: 'Feedback', value: 'Rotary potentiometer across 0-270 degrees' },
  { label: 'Controller', value: 'PID, Kp = 50, Ki = 0, Kd = 10 in simulation' },
  { label: 'Actuator', value: 'Brushed DC motor, 0-6 V, 3 V hover point' },
  { label: 'Saturation', value: '±3 V either side of hover' },
  { label: 'Simulation', value: 'MATLAB and Simulink, PID_Balancer.slx' },
  {
    label: 'Hardware',
    value: 'STM32F446RET6 Nucleo using STM32CubeMX and HAL',
  },
]

const ASSUMPTIONS = [
  'Drag and friction are neglected',
  'The beam itself is massless, and the motor is a point mass',
  'Thrust is proportional to the square of the applied voltage',
  'The motor accelerates instantly, so it adds no lag of its own',
  'Small angle approximation, so cos(theta) is taken as one',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="Closed-loop control of a propeller balance beam" />

      <ProjectIntro>
        <p>
          This project was a chance for me to put my academic learning into
          practice, while developing my MatLab skills. The system is a propeller
          on the end of a horizontal beam, pivoted on a bearing, with a rotary
          potentiometer on the pivot measuring the angle. The controller has to
          hold the beam at a commanded angle by varying the motor voltage, and
          such the thrust.
        </p>
        <p>
          I derived the plant model by hand in the Laplace domain, simulated the
          closed loop in Simulink, checked the stability margins in MATLAB, and
          then wrote the same controller in C for an STM32F446 Nucleo board.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={simulink_model}
        alt="Simulink block diagram of the balance beam control loop, with the scope output alongside"
        caption="The closed loop model. A 30 degree setpoint feeds the PID block through a saturation limit into the plant, with a pulse generator injecting disturbances. On the right, the beam overshoots to roughly 42 degrees before settling, and each disturbance pulse is driven back to the setpoint within a few seconds."
        sheet
      />

      <ProjectStatus>
        The model, the stability analysis and the firmware are all written, but
        the physical beam has not been built, so the gains have only been proven
        in simulation. The hardware gains are a starting point, not a tuned
        result.
      </ProjectStatus>

      <ProjectSpecs specs={SPECS} />

      <ProjectSection title="Deriving the plant">
        <p>
          Thrust from a propeller goes with the square of the applied voltage,
          so the net force on the beam is the thrust minus the component of the
          weight, and that force acting at a distance from the pivot gives an
          angular acceleration. Integrating twice gives the angle as a function
          of time, which is quadratic.
        </p>
        <p>
          Linearising the thrust term about the hover voltage, where the thrust
          exactly cancels the weight, turns the squared relationship into a
          gain. What is left is a double integrator:{' '}
          <span className="font-bold">G(s) = a/s&sup2;</span>, where{' '}
          <span className="font-bold">a = 2kV&#8320;/mx</span>. Putting in a 100
          g mass at 200 mm from the pivot, hovering at 3 V on a 6 V motor, gives
          a of about 32.7 rad/s&sup2; per volt.
        </p>
        <p>
          The derivation, along with the assumptions it rests on, is written up
          in <span className="font-bold">Theory.md</span> in the repository:
        </p>
        <ProjectList items={ASSUMPTIONS} />
      </ProjectSection>

      <ProjectSection title="Why derivative action is doing the work">
        <p>
          Both poles of the plant sit at the origin, which means the system has
          no natural damping at all. Proportional control on its own puts the
          closed loop poles on the imaginary axis, so the beam would oscillate
          forever without ever settling. The derivative term is what pulls those
          poles into the left half plane and makes the loop stable, so it is not
          optional here in the way it often is.
        </p>
        <p>
          Integral action is the opposite case. Two integrators in the plant
          already mean there is no steady state error to remove, so a third one
          only adds phase lag and pushes the loop closer to instability. Ki is
          left at zero in the simulation for that reason.
        </p>
      </ProjectSection>

      <ProjectSection title="Simulation and stability">
        <p>
          The Simulink model closes the loop around 32.7/s&sup2; with a PID
          block, saturated to plus or minus 3 V to represent the usable range
          either side of the hover point. A pulse generator injects disturbances
          into the plant input so the rejection behaviour can be seen alongside
          the initial step response.
        </p>
        <p>
          Alongside that, <span className="font-bold">Stability_Plots.m</span>{' '}
          builds the same open loop in MATLAB and plots the pole-zero map, the
          root locus and the gain and phase margins for the tuned gains. The
          root locus is the clearest illustration of the point above: it shows
          the two poles leaving the origin and the zero introduced by the
          derivative term bending them away from the imaginary axis.
        </p>
      </ProjectSection>

      <ProjectSection title="Firmware">
        <p>
          The STM32CubeMX project targets the F446RE Nucleo and keeps the
          control loop deliberately plain: read, compute, actuate. ADC1 on PA0
          samples the potentiometer at 12 bits and the count is mapped across
          the pot&rsquo;s 0 to 270 degrees of travel. TIM1 channel 1 on PA8
          drives the motor at 10 kHz, and USART2 carries debug output.
        </p>
        <p>
          The PID itself lives in a struct holding the gains, the error history
          and the output limits, with dt timed from{' '}
          <span className="font-bold">HAL_GetTick()</span> rather than assumed
          fixed. Its output is clamped to plus or minus 3 V and then mapped onto
          the 0 to 6 V motor range as a 0 to 999 compare value, so zero
          correction sits at fifty percent duty and the controller can push the
          beam in both directions (on downwards, gravity &gt; Thrust).
        </p>
      </ProjectSection>

      <RepoLink href={REPO} label="BarneyRye/PID-Balance-Beam" />
    </div>
  )
}
