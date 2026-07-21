import type { LinkProps } from '@tanstack/react-router'
import merocketpostlaunch from '@/public/grouprocket/merocketpostlaunch.webp'
import takeoff from '@/public/grouprocket/takeoff.webp'
import seadreamrocketfirst from '@/public/seadream/seadreamrocketfirst.webp'
import wizboardpcbgray from '@/public/wizboard/wizboardpcbgray.webp'

export interface Project {
  name: string
  to: LinkProps['to']
  blurb: string
}

export interface Section {
  name: string
  to: LinkProps['to']
  blurb: string
  image?: string
  projects: Project[]
}

export function isSectionActive(section: Section, path: string): boolean {
  if (section.to === '/') return path === '/' || path.startsWith('/home')
  return path.startsWith(section.to ?? '')
}

export function findSection(path: string): Section | undefined {
  return sections.find((section) => isSectionActive(section, path))
}

export function sectionByPath(path: LinkProps['to']): Section {
  const section = sections.find((item) => item.to === path)
  if (!section) throw new Error(`No section registered for ${path}`)
  return section
}

export const sections: Section[] = [
  {
    name: 'About',
    to: '/',
    blurb: 'My past, present and future.',
    image: merocketpostlaunch,
    projects: [
      {
        name: 'About me',
        to: '/home/about',
        blurb: 'Background, interests and what I am up to.',
      },
      {
        name: 'Experience',
        to: '/home/experiences',
        blurb: 'Placements, part-time work and volunteering.',
      },
      {
        name: 'Education',
        to: '/home/education',
        blurb: 'Aerospace engineering at the University of Sheffield.',
      },
    ],
  },
  {
    name: 'Personal',
    to: '/personal',
    blurb: 'Engineering projects I have built in my free time.',
    image: wizboardpcbgray,
    projects: [
      {
        name: 'Custom ESC',
        to: '/personal/esc',
        blurb: 'A simple brushless DC motor controller PCB from scratch.',
      },
      {
        name: 'DIY Oscilloscope',
        to: '/personal/oscilloscope',
        blurb: 'A simple, low-cost benchtop scope built on a microcontroller.',
      },
      {
        name: 'STM32 DevBoard',
        to: '/personal/devboard',
        blurb: 'A small formfactor custom STM32G4 development board.',
      },
      {
        name: 'PID Control',
        to: '/personal/pid',
        blurb: 'Closed-loop control and simulation on MatLab.',
      },
    ],
  },
  {
    name: 'Team',
    to: '/team',
    blurb: 'Projects built with student teams and societies.',
    image: seadreamrocketfirst,
    projects: [
      {
        name: 'Seadream Rocketry',
        to: '/team/seadream',
        blurb: 'High-powered model rocketry.',
      },
      {
        name: 'iForge',
        to: '/team/iforge',
        blurb: 'Work at the university makerspace.',
      },
      {
        name: 'Solotron',
        to: '/team/solotron',
        blurb: 'Combustion and propulsion research on hydrogen piston engines.',
      },
    ],
  },
  {
    name: 'University',
    to: '/uni',
    blurb: 'Coursework and design projects from my degree.',
    image: takeoff,
    projects: [
      {
        name: 'Glider',
        to: '/uni/glider',
        blurb: 'Design, build and test of a glider.',
      },
      {
        name: 'Quadcopter',
        to: '/uni/quadcopter',
        blurb: 'Airframe and avionics integration with a bit of user error.',
      },
      {
        name: 'Model Rocket',
        to: '/uni/rocket',
        blurb: 'A group-built model rocket, design through launch.',
      },
    ],
  },
]
