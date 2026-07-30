import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { findSection } from '@/lib/nav'

export function HomeButton({ text }: { text?: string }) {
  const section = findSection(useLocation().pathname)

  return (
    <Button asChild>
      <Link to={section?.to ?? '/'}>{text ? text : 'Return back to home'}</Link>
    </Button>
  )
}
