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
import WizESC_PCB_PNG from '@/public/wizesc/WizESC_PCB_PNG.webp'
import WizESC_PCB_TOP from '@/public/wizesc/WizESC_PCB_TOP.webp'
import WizESC_SCH_PNG from '@/public/wizesc/WizESC_SCH_PNG.webp'

export const Route = createFileRoute('/personal/esc')({
  component: RouteComponent,
})

const REPO = 'https://github.com/BarneyRye/WizESC'

const SPECS: Spec[] = [
  { label: 'MCU', value: 'STM32G431CBT6, Cortex-M4F at 160 MHz, LQFP48' },
  { label: 'Gate driver', value: 'TI DRV8300DPWR, 3-phase' },
  { label: 'Power stage', value: '6 x AOD4184A N-channel MOSFETs' },
  { label: 'Input', value: '3S LiPo nominal (11.1 V), up to 4S' },
  {
    label: 'Commutation',
    value: 'Sensorless BEMF on the internal comparators',
  },
  { label: 'Throttle', value: 'Bi-directional DSHOT-300 on PB4 (TIM3_CH1)' },
  {
    label: 'Firmware',
    value: 'AM32 2.20, stock g431 target plus one board target',
  },
  { label: 'PCB', value: '4-layer, 77.1 x 32.5 mm, Altium Designer' },
]

const MANUFACTURING = [
  'Gerbers and drill files as a single fabrication package for JLCPCB',
  'BOM with LCSC part numbers, so the JLCPCB can eaily find parts',
  'Pick-and-place file for the PCBA',
  'A 3D STEP model for mounting and housing modelling',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="My custom 3-phase brushless DC motor controller" />

      <ProjectIntro>
        <p>
          WizESC is a single-motor sensorless brushless speed controller I
          designed in Altium Designer ECAD. It is designed to utilise the
          open-source AM32 firmware on an STM32G431, switches six MOSFETs
          through a TI DRV8300 gate driver, and takes throttle over
          bi-directional DSHOT-300, so it can be used in a normal fixed-wing
          setup.
        </p>
        <p>
          The point of the project was to develop my PCB design skills from part
          choices and scheamtic design to PCB layout, rules and routing. The
          reason I chose an ESC for this, was it tied to my aerospace avionics
          enthusiasm, and a deviation from the sensor based flight computers I
          have worked on previously. It also serves as a base for any custom
          base for if i would like to come back and write my own c code using
          the STM32 HAL libraries.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={WizESC_PCB_TOP}
        alt="3D render of the assembled WizESC board, top side"
        caption="Top side of the board. Input pads on the left, MCU and small-signal circuitry in the middle, then the gate driver and the power stage out to the motor pads."
      />

      <ProjectStatus>
        This board is untested and unverified. It has been designed and routed
        in full, and the firmware target has been derived against upstream AM32,
        but it has not been manufactured or brought up. Everything here is a
        educational design project rather than a proven product.
      </ProjectStatus>

      <ProjectSpecs specs={SPECS} />

      <ProjectSection title="Power and gate drive">
        <p>
          The battery directly feeds the MOSFETs source pins and such power
          phases directly. As well as powering the DRV3800 GVDD, to ensure
          proper V_gs is supplied. It is then fed through a fixed 3.3V buck
          converter to power the MCU (through a ferrite bead for the analog
          VDDA).
        </p>
        <p>
          The DRV8300 drives all six FETs from the VBAT rail, with a 100 nF
          bootstrap capacitor per phase and 10 ohm series gate resistors. The
          values for the gate resistors and bootstrap capacitors have been
          derived using equations found in both the gate driver and MOSFET
          datasheets, and has been added to the repository in
          <span className="font-bold"> driver-component-calcs.md</span>
        </p>
      </ProjectSection>

      <ProjectSection title="Sensorless rotor position detection">
        <p>
          Sensorless commutation means inferring rotor position from the
          back-EMF on whichever phase is not being driven. Each phase is divided
          100k:18k into a comparator input on the STM32, and the virtual neutral
          point is formed by a three-by-10k star filtered with 1 nF. Phase A
          uses COMP2; phases B and C share COMP1.
        </p>
        <p>
          Alongside that, battery voltage comes in through a 100k:10k divider
          into ADC2_IN3, giving a divider ratio of eleven, and there is an NTC
          divider footprint on ADC1_IN12 for temperature. Current sensing has
          been left out for simplicity, but has been grounded, as required by
          the AM32 software.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={WizESC_SCH_PNG}
        alt="WizESC schematic sheet"
        caption="The full schematic: buck converter and protection, MCU and sensing dividers, gate driver and power stage."
        sheet
      />

      <ProjectSection title="Layout">
        <p>
          The board is four layers {'[ signal - ground - battery - signal ] '}
          with ground pours and stitching vias on both signal layers. At 77.1 by
          32.5 mm it is laid out as a straight left-to-right flow: input pads,
          then the MCU and its small-signal circuitry, then the gate driver,
          FETs and output pads. The six FETs are split across both sides of the
          board to keep board size down and trace loops short.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={WizESC_PCB_PNG}
        alt="WizESC top layer routing"
        caption="Top layer routing, showing the split between small-signal and power sections."
        sheet
      />

      <ProjectSection title="Firmware">
        <p>
          The board runs stock AM32 &mdash; no motor control code is modified.
          The only addition is a board target entry in the AM32 headers
          describing the pin map for this hardware. That was a deliberate
          choice: AM32 is a mature, well-tested project, and writing my own
          commutation loop would have made the hardware harder to test. However,
          after confirmation of successfuly rotation, custom firmware could be
          written and tested.
        </p>
        <p>
          Flashing is over SWD through a six-way JST connector carrying SWCLK,
          SWDIO, NRST and SWO plus power. There is a reset button on NRST and
          BOOT0 is pulled through a resistor for bootloader entry.
        </p>
      </ProjectSection>

      <ProjectSection title="Ready to manufacture">
        <p>
          Everything needed to actually order the board is checked into the
          repository, and parts were picked for availability and decent
          documentation over anything clever:
        </p>
        <ProjectList items={MANUFACTURING} />
      </ProjectSection>

      <RepoLink href={REPO} label="BarneyRye/WizESC" />
    </div>
  )
}
