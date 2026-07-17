import { Link, useLocation } from '@tanstack/react-router'
import { navigation } from '@/components/general/nav'
import { Button } from '@/components/ui/button'

function getHomeTo(path: string): string {
  const index_of = path.indexOf('/', 1)
  const base_path = index_of === -1 ? path : path.slice(0, index_of)
  const nav = navigation.find((n) => n.to === base_path)
  return nav !== undefined && nav.to !== undefined ? nav.to : '/'
}

export function HomeButton() {
  return (
    <Button asChild>
      <Link to={getHomeTo(useLocation().pathname)}>Return back to home</Link>
    </Button>
  )
}
