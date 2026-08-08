import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/page-header'
import {
  ProjectFigure,
  ProjectIntro,
  ProjectList,
  ProjectSection,
  ProjectSpecs,
  RepoLink,
  type Spec,
} from '@/components/project'
import wizboardpcbcolour from '@/public/wizboard/wizboardpcbcolour.webp'
import wizboardsch from '@/public/wizboard/wizboardsch.webp'

export const Route = createFileRoute('/personal/devboard')({
  component: RouteComponent,
})

const REPO = 'https://github.com/BarneyRye/WizBoard'

const SPECS: Spec[] = [
  { label: 'MCU', value: 'STM32G474CBT6, Cortex-M4F at 170 MHz, LQFP48' },
  { label: 'Clock', value: '8 MHz crystal, multiplied to 170 MHz by the PLL' },
  { label: 'Power', value: 'USB-C 5 V into an LDL1117S33 3.3 V regulator' },
  { label: 'Protection', value: 'P-channel MOSFET for reverse polarity' },
  { label: 'Breakout', value: 'Two 16-way headers on 2.54 mm pitch' },
  { label: 'USB', value: 'USB full-speed on PA11/PA12, 5.1k CC resistors' },
  { label: 'Debug', value: '6-way JST for SWDIO, SWCLK, NRST and SWO' },
  { label: 'PCB', value: '4-layer, Altium Designer' },
]

const TEMPLATE = [
  'Full pinout for used pins',
  'Clock tree already solved for 170 MHz off the 8 MHz crystal',
  'USB full-speed enabled with the 48 MHz clock sourced from HSI48',
  'The user LED on PB10 set up as an open-drain output',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="A breadboard-friendly STM32G4 development board" />

      <ProjectIntro>
        <p>
          WizBoard is a development board built around the STM32G474CBT6. The
          reason for the project was to design a custom devboard that can be
          used for more advanced prototyping, while keeping a small form factor.
        </p>
        <p>
          The board has been designed to use hand soldered parts, so uses 0804
          or higher resistor and capacitor footprints and lqfp mcu footprint.
          This reduces cost, as PCBA is not required. The header pins are also a
          multiple of 2.54mm spaced, so are compatible with most breadboards.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={wizboardpcbcolour}
        alt="WizBoard PCB layout showing both copper layers"
        caption="Both copper layers of the layout. The MCU sits centrally between the two header rows, with the crystal, debug connector and reset button at one end and the USB-C connector and regulator at the other."
        sheet
        portrait
      />

      <ProjectSpecs specs={SPECS} />

      <ProjectSection title="Why the G4">
        <p>
          The STM32G4 is the same family I used for the brushless motor
          controller, and it carries hardware most general-purpose parts do not:
          a CORDIC accelerator for trigonometry, an FMAC unit for filters, and
          high-resolution timers aimed squarely at motor and power conversion
          work. It also provided a clock speed higher than most off-the-shelf
          devboards while maintaining a rich peripheral set. By having a
          breadboard-friendly one means I could try prototype easily, without
          wasting time and money on a broken board.
        </p>
      </ProjectSection>

      <ProjectSection title="Power and protection">
        <p>
          Power comes in over USB-C with a pair of 5.1k CC pulldowns, so the
          host or charger provided 5V. That feeds a P-channel MOSFET routed as
          reverse-polarity protection, which drops the voltage far less than the
          diode you would use, and then an LDL1117S33 linear regulator for the
          3.3 V rail.
        </p>
        <p>
          The analogue supply is split off behind a ferrite bead with its own
          decoupling, as on other VDD pin on the MCU. A linear regulator is not
          the most efficient choice, but it keeps the BOM and board size low,
          while reducing input noise to the MCU.
        </p>
      </ProjectSection>

      <ProjectSection title="Debug and programming">
        <p>
          Debug is over SWD on a six-way JST connector carrying SWDIO, SWCLK,
          NRST and SWO plus power. It is the same connector and pinout I used on
          the motor controller, so one ST-LINK cable works across both boards
          without rewiring anything (a 6 pin jst cable to female dupont allows
          me to connect to my Nucleo board external SWD pins). A reset button
          sits on NRST and BOOT0 is pulled through a resistor for bootloader
          entry.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={wizboardsch}
        alt="WizBoard SCH layout"
        caption="Full WizBoard schematic with MCU, power, debug and connectors. Including a short description in the top left."
        sheet
      />

      <ProjectSection title="A template to start from">
        <p>
          The project also includes a template which includes the relevant
          pinouts so, you don't need to go around digging for them:
        </p>
        <ProjectList items={TEMPLATE} />
        <p>
          Open the file, generate, and the board is running at full speed with a
          blinkable LED. The BOM, gerbers and Altium source are all checked in
          as well, so the board can be ordered as it stands.
        </p>
      </ProjectSection>

      <RepoLink href={REPO} label="BarneyRye/WizBoard" />
    </div>
  )
}
