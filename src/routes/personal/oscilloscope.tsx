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
import OSC_PCB_PNG from '@/public/oscilloscope/OSC_PCB_PNG.webp'
import OSC_SCH_1_PNG from '@/public/oscilloscope/OSC_SCH_1_PNG.webp'
import OSC_SCH_2_PNG from '@/public/oscilloscope/OSC_SCH_2_PNG.webp'

export const Route = createFileRoute('/personal/oscilloscope')({
  component: RouteComponent,
})

const REPO = 'https://github.com/BarneyRye/DIY-Oscilloscope'

const SPECS: Spec[] = [
  { label: 'MCU', value: 'STM32F405RGT6, Cortex-M4F at 168 MHz' },
  {
    label: 'Input',
    value: '2 channels, +/-20 V, 40 Vpp, one displayed at a time',
  },
  {
    label: 'Front end',
    value: '51:1 divider, 1.65 V bias, OPA350 with a gain of 4',
  },
  {
    label: 'Sampling',
    value: '12-bit ADC into a 4096-sample DMA buffer, clocked by TIM3',
  },
  {
    label: 'Trigger',
    value: 'ADC analogue watchdog, level adjustable in 10 mV steps',
  },
  { label: 'Timebase', value: '2 us/div to 10 ms/div across 20 divisions' },
  { label: 'Vertical', value: '0.01 V/div to 2 V/div across +/-10 divisions' },
  { label: 'Display', value: '240x320 ILI9341 TFT over SPI' },
  {
    label: 'Controls',
    value: 'Two rotary encoders, pause, channel select, axis select',
  },
  { label: 'Tools', value: 'KiCad for the PCB, STM32CubeIDE for the firmware' },
]

const CONTROLS = [
  'One encoder sets time/div or volts/div, depending on the axis-select switch',
  'The other sets the trigger level in 10 mV steps, and zeroes it when pressed',
  'Pressing the first encoder auto-scales the vertical axis to the measured peak-to-peak',
  'Pause freezes the trace on screen while sampling carries on underneath',
  'Channel select swaps inputs and re-points the analogue watchdog at the new channel',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="A benchtop oscilloscope built from scratch" />

      <ProjectIntro>
        <p>
          A two-channel oscilloscope on a custom KiCad board, with the analogue
          front end, the sampling and the display all built from scratch. It
          takes up to 40 Vpp, samples on an STM32F405 running at 168 MHz, and
          draws the waveform on a 240 by 320 ILI9341 TFT. Both channels are
          sampled continuously; one is displayed at a time.
        </p>
        <p>
          The microcontroller was never the interesting part. What made this
          worth building was getting a plus or minus 20 V signal into a 0 to 3.3
          V ADC without damage or incorrect readings, and then making the
          timebase, trigger and scaling behave the way a real scope does rather
          than just plotting whatever happened to be in the buffer.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={OSC_PCB_PNG}
        alt="Oscilloscope PCB layout"
        caption="The PCB layout. The STM32, front end and power sit on the board; the display, encoders, buttons and microSD all break out to 2.54 mm headers around the edge."
      />

      <ProjectSpecs specs={SPECS} />

      <ProjectSection title="Getting 40vpp into a 3.3 volt ADC">
        <p>
          For this project I wanted to keep the BOM relatively light, so decided
          on using the internal MCU ADC pins rather than an external ADC, which
          would of made it more accurate. The in-built ADC has its limitations
          though: 1. IT can only accept in the range of 0-Vref (3.3V) 2. It
          can't accept negative voltages 3. Smaller 12bit Resolution.
        </p>
        <p>
          Each channel starts with five 10 megaohm resistors in series rather
          than one part. Splitting the chain means no single resistor sees the
          full input voltage, which keeps every part inside its rating, and the
          50 megohms of series resistance keeps the input impedance high enough
          not to load whatever is being measured.
        </p>
        <p>
          That chain forms roughly a 51:1 divider into a 1.65 V bias, so any
          value within the 40vpp gets reduced and then shifted to fit in the
          0-3.3V range, rather than cliping or causing damage. An OPA350
          rail-to-rail op-amp then applies a fixed gain of four to bring up to
          increase resolution but keeping in the range (due to limitations of
          the op-amp), with a BAT54S clamping its output to the supply rails and
          a 100 ohm resistor and 47 pF cap filtering into the ADC pin.
        </p>
        <p>
          The firmware undoes the chain in software, scaling each sample back by
          the attenuation factor and the op-amp gain. The bias point is not
          assumed: at boot the code averages the entire ADC buffer with no input
          connected and uses that as the zero reference, so resistor tolerance
          and regulator offset are calibrated out rather than designed around.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={OSC_SCH_2_PNG}
        alt="Oscilloscope analogue front end schematic"
        caption="The front end: the series resistor chain, the bias network, the OPA350 gain stage and the clamp into the ADC."
        sheet
      />

      <ProjectSection title="Sampling and triggering">
        <p>
          TIM3 clocks the ADC, which means the sample rate follows the timebase
          instead of being fixed. Turning the time/div encoder recalculates the
          sample period from the total window and the buffer length, then
          reloads the timer&apos;s auto-reload register on the fly. Samples land
          in a 4096-entry buffer over DMA without the CPU touching them.
        </p>
        <p>
          Triggering uses the ADC&apos;s analogue watchdog. When the selected
          channel crosses the trigger level the watchdog raises an interrupt,
          the firmware snapshots where DMA had got to, converts that slice of
          the buffer to volts, and restarts the transfer. It then holds off for
          one and a half times the displayed window before re-arming, so the
          scope is not retriggering on the trace it is still drawing.
        </p>
        <p>
          The captured buffer is searched for the first rising edge past the
          trigger voltage, and plotting starts from there. That is what stops
          the waveform sliding across the screen, and it is the difference
          between a plot of some samples and something you can actually read a
          period off.
        </p>
      </ProjectSection>

      <ProjectSection title="Display and controls">
        <p>
          The ILI9341 runs over SPI behind a driver written for this project,
          down to a 5 by 7 bitmap font for the readout. Redrawing the whole
          screen every frame would be far too slow, so the code clears and
          redraws only the waveform region, leaving the axes and the readout
          alone until a setting actually changes and a flag says so.
        </p>
        <p>Everything else is on physical controls rather than a menu:</p>
        <ProjectList items={CONTROLS} />
      </ProjectSection>

      <ProjectSection title="The board">
        <p>
          The PCB is a carrier rather than a finished instrument. The STM32, the
          analogue front end, the regulator and the USB-C connector are on the
          board; the display, the encoders, the buttons and the microSD slot all
          come out on 2.54 mm headers, so the components can be wired
          seperately, into a case for prototyping.
        </p>
        <p>
          USB-C provides power and a data path out, protected by a USBLC6-2SC6
          on the data lines, with an AMS1117 dropping 5 V to 3.3 V and a ferrite
          bead splitting off a separate analogue rail for the front end and the
          ADC. There is a 24 MHz crystal for the PLL, a boot-select switch, a
          reset button and an SWD header for programming.
        </p>
      </ProjectSection>

      <ProjectFigure
        src={OSC_SCH_1_PNG}
        alt="Oscilloscope main schematic sheet"
        caption="The main sheet: microcontroller, crystal and decoupling, USB-C with ESD protection and regulation, and the headers that everything else hangs off."
        sheet
      />

      <RepoLink href={REPO} label="BarneyRye/DIY-Oscilloscope" />
    </div>
  )
}
