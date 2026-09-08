import {
  ProjectIntro,
  ProjectList,
  ProjectSection,
  ProjectStatus,
} from '@/components/project'

export const title = 'Roll Control'
export const year = '2026 - Present'
export const start = '2026-07'
export const duration = 300

const DEVELOPMENT: string[] = [
  'Initial research, feasibilty and concepts [Complete]',
  'PCB component choices, schematic design and PCB layout, routing and review [Current]',
  'Firmware design in C using STM32 HAL',
  'PCB manafacture, verification and validation, with non-control test flights',
  'Rocket design and manafacture',
  'Flight testing',
]

export function Project() {
  return (
    <div className="space-y-12">
      <ProjectIntro>
        This project is primarily and avionics focus. The aim is to design a
        custom flight computer with roll control capabilities. This will be
        achieved by adding on 4x timer channels to the board, all set into PWM
        mode, so we can control all the servos, on top of the standard flight
        compuer logic, with data logging, and pyro channels. Currently, GPS and
        telemetry have been excluded for simplicity, but available by leaving a
        couple UART pads to connect up a seperate tracker board later.
      </ProjectIntro>

      <ProjectStatus>
        This project is fairly new and is currently in the PCB design stage.
        Research and feasibility have been done, but no physical construction or
        design of the actual rocket has been started.
      </ProjectStatus>

      <ProjectSection title="Development Plan">
        <p>
          The general plan for the following year to get it from idea to reality
          is as follows:
        </p>
        <ProjectList items={DEVELOPMENT} />
      </ProjectSection>

      <ProjectSection title="Firmware Advancements">
        <p>
          If everything goes well, the aim is to reach vertical stabalisation
          with roll, pitch and yaw. However this all assumes we are able to get
          the go ahead from the governing bodies (which will decide the
          direction of this project).
        </p>
        <p>
          With out initial flight testing, the roll control capabilites will not
          be put on full blast from the get go. We will test and restrict the
          movement of the servos, by setting saturation limits etc, to ensure we
          don't get/restrict dangerous behaviour on its first flight. We will
          aim to use simulations and flight tests to tune the control system.
        </p>
        <p className="italic">
          N.B. a ground station app is also potentially in the development path,
          for easy config uploads,telemetry and remote arming. Protoyping has
          been done using the open source Tauri framework (rust backend){' '}
          <a
            href="https://github.com/BarneyRye/ground-station"
            rel="noopener noreferror"
            target="_blank"
            className="font-bold hover:text-primary underline"
          >
            found here
          </a>
        </p>
      </ProjectSection>
    </div>
  )
}
