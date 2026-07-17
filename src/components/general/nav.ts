import type { LinkProps } from '@tanstack/react-router'
import {
  AnvilIcon,
  BrainCircuitIcon,
  CircleUserIcon,
  CircuitBoardIcon,
  ContactRoundIcon,
  DroneIcon,
  FlameIcon,
  GraduationCapIcon,
  HomeIcon,
  type LucideIcon,
  PlaneIcon,
  RocketIcon,
  SlidersVerticalIcon,
  SquareActivityIcon,
  UniversityIcon,
  UserRoundCogIcon,
  Users2Icon,
} from 'lucide-react'

export interface Nav {
  name: string
  to: LinkProps['to']
  icon: LucideIcon
  sub_nav?: Nav[]
}

export const navigation: Nav[] = [
  {
    name: 'Homepage',
    to: '/',
    icon: HomeIcon,
    sub_nav: [
      {
        name: 'Home',
        to: '/',
        icon: HomeIcon,
      },
      {
        name: 'About me',
        to: '/home/about',
        icon: CircleUserIcon,
      },
      {
        name: 'My experiences',
        to: '/home/experiences',
        icon: ContactRoundIcon,
      },
      {
        name: 'Education',
        to: '/home/education',
        icon: GraduationCapIcon,
      },
    ],
  },
  {
    name: 'Personal Projects',
    to: '/personal',
    icon: UserRoundCogIcon,
    sub_nav: [
      {
        name: 'Home',
        to: '/personal',
        icon: HomeIcon,
      },
      {
        name: 'Custom ESC',
        to: '/personal/esc',
        icon: CircuitBoardIcon,
      },
      {
        name: 'DIY Oscilloscope',
        to: '/personal/oscilloscope',
        icon: SquareActivityIcon,
      },
      {
        name: 'STM32 DevBoard',
        to: '/personal/devboard',
        icon: BrainCircuitIcon,
      },
      {
        name: 'PID Control',
        to: '/personal/pid',
        icon: SlidersVerticalIcon,
      },
    ],
  },
  {
    name: 'Team projects',
    to: '/team',
    icon: Users2Icon,
    sub_nav: [
      {
        name: 'Home',
        to: '/team',
        icon: HomeIcon,
      },
      {
        name: 'Seadream Rocketry',
        to: '/team/seadream',
        icon: RocketIcon,
        sub_nav: [],
      },
      {
        name: 'iForge',
        to: '/team/iforge',
        icon: AnvilIcon,
      },
      {
        name: 'Solotron',
        to: '/team/solotron',
        icon: FlameIcon,
      },
    ],
  },
  {
    name: 'Uni projects',
    to: '/uni',
    icon: UniversityIcon,
    sub_nav: [
      {
        name: 'Home',
        to: '/uni',
        icon: HomeIcon,
      },
      {
        name: 'Glider',
        to: '/uni/glider',
        icon: PlaneIcon,
      },
      {
        name: 'Quadcopter',
        to: '/uni/quadcopter',
        icon: DroneIcon,
      },
      {
        name: 'Model Rocket',
        to: '/uni/rocket',
        icon: RocketIcon,
      },
    ],
  },
]
