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
import seadreamloggerpcb from '@/public/seadream/seadreamloggerpcb.webp'
import seadreamloggersch from '@/public/seadream/seadreamloggersch.webp'

export const title = 'Custom Data Logger'
export const year = '2025 - 2026'
export const start = '2025-11'
export const duration = 500

const REPOV1 = 'https://github.com/BarneyRye/Seadream-Rocketry-Avionics.git'
const REPOV2 = 'https://github.com/BarneyRye/Seadream-Rocketry-Avionics-V2.git'

const HARDWARE: Spec[] = [
  {
    label: 'MCU',
    value:
      'ESP32-S3-MINI-1U-N8, dual core at 240MHz with 8MB flash and 512kB SRAM',
  },
  {
    label: 'IMU',
    value:
      'LSM6DSO32 accelerometer and gyroscope over I2C, run at +/-32g and 2000dps',
  },
  {
    label: 'Barometer',
    value: 'BMP280 for pressure and derived altitude, also over I2C',
  },
  {
    label: 'Temp / Humidity',
    value: 'SHT40-AD1B for ambient temperature and relative humidity',
  },
  {
    label: 'Storage',
    value: 'microSD card on SPI, written as plain CSV or binary',
  },
  {
    label: 'Audio',
    value: 'MAX98357A I2S amplifier driving a speaker on a JST header',
  },
  {
    label: 'Power',
    value:
      'USB-C or JST battery input, dropped to 3.3V by an LD1117 and an LD39200 LDO',
  },
]

const FIRMWARE: string[] = [
  'Two FreeRTOS tasks pinned to separate cores, one reading sensors and one writing to the SD card',
  'Double buffering with a queue between the tasks, so a slow SD write never stalls a sensor read',
  'Variable logging rates to avoid logging too much on descent',
  'Flight state detection for takeoff, apogee and landing, worked out from altitude changes over time',
  'Log files auto-increment, so a new flight never overwrites the last one',
  'Per-sensor connection flags, so a missing sensor logs zeros instead of stalling the whole board',
]

export function Project() {
  return (
    <div className="space-y-12">
      <ProjectIntro>
        <p>
          This project was Seadream's first attempt at a custom PCB. The main
          aim was to understand the system that go into a custom flight
          computer. The boards was strictly for logging data to an micro-SD and
          playing a song through an inbuilt amplifier. This project had a few
          technical faults, but provided a base into learning PCB and rocket
          flight computer design.
        </p>
      </ProjectIntro>

      <ProjectFigure
        src={seadreamloggersch}
        alt="Seadream logger schematic"
        caption="Schematic for the Seadream Rocketry Logger, including all from the MCU to sensors to power stages."
        sheet
      />

      <ProjectSection title="Components and Schematic">
        <p>
          The board centralises around an ESP32-S3-MINI-1U-N8, chosen for its
          speed and ease of use. The module comes equipped with 2 cores running
          at 240MHz, 8MB flash and 512kB SRAM, which is overkill for a board
          thats only function is logging sensor data. That being said, we were
          able to leverage the 2 cores using freeRTOS, one for sensor data and
          the other for logging to the SD. In combination with the high clock
          speeds and large SRAM, we were able to achieve high logging rates up
          to 1kHz, using a double buffer. It was also programmed via USB type-C,
          through its inbuilt USB dp and dm pins.
        </p>
        <p>
          All three sensors of the sensors were connected via I2C for its
          simplicity, requiring only 2 PCB traces to connect all the sensors up
          to the MCU. While not the fastest choice, it was simple to implement
          in hardware and software, with a wide range of library support in the
          Arduino ecosystem. The amplifier was connected using I2S protocol to
          the MCU, to allow us to stream media from our SD card for finding it
          after landing.
        </p>
        <p>
          The power phase meant we could power with either USB or battery, but
          not both at the same time. This was due to not having schottky diodes
          protecting each power line. In retrospect, the use of 2 LDOs was not
          needed, as we could of had 1 connected to both. The reason we didn't
          implement a schottky diode, was that we wanted to power it via a 1S
          LiPo, so the voltage drop would of been too large through a diode and
          then LDO.
        </p>
        <ProjectSpecs specs={HARDWARE} />
      </ProjectSection>

      <ProjectFigure
        src={seadreamloggerpcb}
        alt="Seadream logger PCB"
        caption="PCB layout and routing for the Seadream Rocketry Logger, showing both signal and ground layers."
      />

      <ProjectSection title="PCB Stackup, Layout And Routing">
        <p>
          The board is 26 x 63mm on a standard two layer 1.6mm FR4 stackup. The
          aim was to keep it narrow, to allow it to fit in a small inner
          diameter body tube. The stackup consists of 2 layers, a signal and
          ground plane. This kept the board simple, and cheaper/easier to
          manufacture.
        </p>
        <p>
          The front copper carries the bulk of the signal and power routes, as
          well as all of the component. The signal routes run at 0.2mm width and
          power at 4mm width. There are 0.3mm/0.6mm vias (hole/pad diameters)
          that carry the ground pins down or allows signals to be routed
          underneath on the bottom layer.
        </p>
        <p>
          Everything was ordered through JLCPCB, with the fabrication toolkit
          exporting gerbers, the BOM and the pick and place files straight out
          of KiCad. The design rules at the beginning of the PCB routing was set
          due to the capabilities of JLCPCB to account for this.
        </p>
      </ProjectSection>

      <ProjectSection title="Coding The Logger">
        <p>
          The firmware is written in C/C++ using the Platform IO IDE and Arduino
          framework. This made it simple and quick to get a first iteration of
          firmware, while being reliable. We used prebuilt sensor libraries to
          speed up the development, which allowed us to get into testing of the
          board more quickly.
        </p>
        <p>
          The firmware includes two FreeRTOS tasks pinned to separate cores. One
          reads the sensors on a fixed schedule and fills a buffer, and when
          that buffer is full it pushes a flag onto a queue and immediately
          starts filling the second one. The other core waits on that queue and
          writes whichever buffer has just been handed over. The sensor timing
          is then completely independent of how long the card write takes.
        </p>
        <ProjectList items={FIRMWARE} />
        <p>
          The second revision changed how the board is armed and what happens
          before launch. V1 started logging as soon as it powered up, which
          meant long files full of the rocket sitting on the pad. V2 adds
          Bluetooth through NimBLE, so the board advertises as an altimeter, a
          phone connects and gets a live status line telling you which sensors
          came up, and only then does it arm. From that point it fills a small
          circular buffer and watches the accelerometer, and when it triggers it
          dumps that buffer to the card first, so the log includes the moments
          before the launch was detected rather than starting a fraction of a
          second late. It also drops the advertising and disconnects the phone
          the instant it launches, and reports altitude relative to the pad
          rather than sea level.
        </p>
        <p>
          The other change worth mentioning is less exciting but caused more
          trouble. The barometer would occasionally come up on a different I2C
          address, so V2 probes both, and re-checks the sensor once a second in
          flight so a connection lost to vibration can be picked back up rather
          than leaving a hole in the altitude data. this was due to an incorrect
          pin connection, which left the I2C address pin floating, which meant
          it would switch the last bit of its address.
        </p>
        <ProjectStatus>
          The board has been tested on both versions of the code, but achieving
          a higher success and logging rate on the V2.
        </ProjectStatus>
      </ProjectSection>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <RepoLink href={REPOV1} label="GitHub - PCB and V1 Code" />
        <RepoLink href={REPOV2} label="Github - V2 Code" />
      </div>
    </div>
  )
}
