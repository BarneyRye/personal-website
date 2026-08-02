import { useLocation } from '@tanstack/react-router'
import { findSection } from '@/lib/nav'

export function PageHeader({ text }: { text: string }) {
  const section = findSection(useLocation().pathname)
  return (
    <header className="space-y-2">
      <p className="label-mono">{section?.name}</p>
      <h1 className="max-w-prose text-balance text-3xl -mb-6">{text}</h1>
    </header>
  )
}
