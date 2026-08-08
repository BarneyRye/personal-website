import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FaGithub } from 'react-icons/fa'
import { cn } from '@/lib/utils'

export interface Spec {
  label: string
  value: string
}

export function ProjectIntro({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-muted-foreground [&>p]:max-w-prose">
      {children}
    </div>
  )
}

export function ProjectStatus({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-prose border-primary border-l-2 py-1 pl-4 text-muted-foreground text-sm">
      {children}
    </p>
  )
}

export function ProjectSpecs({ specs }: { specs: Spec[] }) {
  return (
    <dl className="grid border-t text-sm sm:grid-cols-2 sm:gap-x-10">
      {specs.map((spec) => (
        <div
          key={spec.label}
          className="flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-4"
        >
          <dt className="label-mono pt-1 sm:w-32 sm:shrink-0">{spec.label}</dt>
          <dd className="min-w-0 text-muted-foreground">{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function ProjectSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="label-mono">{title}</h2>
      <div className="space-y-4 text-muted-foreground [&>p]:max-w-prose">
        {children}
      </div>
    </section>
  )
}

export function ProjectList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item} className="flex max-w-prose gap-3">
          <span className="text-primary">&mdash;</span>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ProjectFigure({
  src,
  alt,
  caption,
  sheet = false,
  video = false,
  portrait = false,
  poster,
}: {
  src: string
  alt: string
  caption: string
  sheet?: boolean
  video?: boolean
  portrait?: boolean
  poster?: string
}) {
  return (
    <figure className={cn('space-y-3', portrait && 'mx-auto w-full max-w-sm')}>
      {video ? (
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={alt}
          className="w-full rounded-lg border bg-black"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn('w-full rounded-lg border', sheet && 'bg-white p-3')}
        />
      )}
      <figcaption className="max-w-prose text-muted-foreground text-sm">
        {caption}
      </figcaption>
    </figure>
  )
}

export function RepoLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
    >
      <FaGithub className="size-4" />
      {label}
    </a>
  )
}

export function ProjectLink({
  href,
  Icon,
  label,
}: {
  href: string
  Icon: IconType
  label: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-primary text-sm hover:underline"
    >
      <Icon className="size-4" />
      {label}
    </a>
  )
}
