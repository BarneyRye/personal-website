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
import buck_spice_out from '@/public/spice/buck_spice_out.webp'
import buck_spice_sch from '@/public/spice/buck_spice_sch.webp'

export const Route = createFileRoute('/personal/buck_spice')({
  component: RouteComponent,
})

const SPECS: Spec[] = [
  { label: 'Input', value: '11 V, roughly the nominal voltage of a 3S LiPo' },
  { label: 'Output', value: '3.3 V target, into a constant 2 A load' },
  { label: 'MOSFET', value: 'IRF7406 P-channel, as the high side switch' },
  {
    label: 'Diode',
    value: 'MBR745 Schottky, freewheeling when the switch is off',
  },
  {
    label: 'Capacitors',
    value:
      '10 µF on the input and 47 µF on the output to smooth voltage ripple',
  },
  { label: 'Inductor', value: '46 µH to smooth the current ripple' },
  {
    label: 'Gate drive',
    value: 'Pulse source, 100 kHz at 33.5% duty',
  },
  { label: 'Simulation', value: 'LTspice transient, 12 ms with a 10 ns step' },
]

const SIMPLIFICATIONS = [
  'There is no feedback, so the duty cycle is fixed and the output drifts with input voltage and load',
  'The gate is driven straight from an ideal pulse source rather than a gate driver',
  'The load is an ideal current source, which draws 2 A even before the output has come up',
  'There is no soft start, so the converter is switched on into empty capacitors at full duty',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="SPICE simulation of a fixed frequency buck converter" />

      <ProjectIntro>
        <p>
          The aim of this project was to understand why SPICE simulations are
          used for electrical circuits, and to build my skills with them. It was
          done in LTspice, the free simulator from Analog Devices.
        </p>
        <p>
          A buck converter was a good first circuit. It is small enough to size
          by hand, but it switches fast enough that its behaviour is hard to
          picture without a simulation. The circuit steps an 11 V supply, about
          what a 3S LiPo gives, down to 3.3 V for a logic rail drawing 2 A.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={buck_spice_sch}
        alt="LTspice schematic of a buck converter with a P-channel MOSFET, Schottky diode, 46 µH inductor, 47 µF output capacitor and 2 A current load"
        caption="The schematic. V2 drives the gate of the IRF7406 high side switch at 100 kHz, D1 carries the inductor current while the switch is off, and L1 with C2 filter the switched node down to a steady output for the 2 A load I1."
        sheet
      />

      <ProjectStatus>
        This is an open loop design. The duty cycle is set by hand and there is
        no controller holding the output at 3.3 V, so it only shows a passive
        response.
      </ProjectStatus>

      <ProjectSpecs specs={SPECS} />

      <ProjectSection title="Sizing the components">
        <p>
          In an ideal buck converter, the output voltage is the input voltage
          multiplied by the duty cycle, so 3.3 V from 11 V needs 30%. In
          practice the switch and the diode each drop some voltage, and the duty
          cycle has to rise to make up for it. 33.5% puts the settled output at
          about 3.4 V.
        </p>
        <p>
          The inductor sets the current ripple. At 100 kHz, 46 µH gives a peak
          to peak ripple of roughly 0.55 A, or around a quarter of the 2 A load.
          The 47 µF output capacitor then has to absorb that ripple current,
          which leaves a voltage ripple on the order of 15 mV. The 10 µF on the
          input supplies the pulsed current the switch draws, so the battery
          does not have to.
        </p>
        <p>
          The switch is a P-channel MOSFET, so its source sits on the 11 V rail
          and the gate is pulled down to turn it on. The pulse source holds the
          gate at 11 V to keep it off, then drops it to 2 V, which gives a
          gate-source voltage of -9 V to switch it fully on. That avoids needing
          a bootstrapped gate driver, which an N-channel high side switch would
          require. The trade-off is higher on-resistance.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={buck_spice_out}
        alt="LTspice plot of output voltage against time, overshooting to about 7 V and ringing down to settle near 3.4 V after about 10 ms"
        caption="Output voltage at start up. It overshoots to about 7 V, rings at around 3.4 kHz, and takes roughly 10 ms to settle at about 3.4 V."
        sheet
      />

      <ProjectSection title="The start up transient">
        <p>
          At the start of the simualtion, we can see the voltage spike up to
          roughly 7 V. This is an issue, as it is nearly double to required
          output, so would destroy whatever it was attached to like and MCU pin.
          This is a real issue, and is why simualtions like these are key.
        </p>
      </ProjectSection>

      <ProjectSection title="What the model leaves out">
        <p>
          The circuit was kept deliberately simple so the power stage could be
          understood on its own. This leaves out some things a real converter
          would need:
        </p>
        <ProjectList items={SIMPLIFICATIONS} />
      </ProjectSection>
    </div>
  )
}
