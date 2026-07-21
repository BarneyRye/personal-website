import { Link, useLocation } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { findSection } from '@/lib/nav'

export function HomeButton() {
  const section = findSection(useLocation().pathname)

  return (
    <Button asChild>
      <Link to={section?.to ?? '/'}>Return back to home</Link>
    </Button>
  )
}
