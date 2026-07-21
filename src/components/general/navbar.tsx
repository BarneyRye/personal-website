import { Link, useLocation } from '@tanstack/react-router'
import { ThemeToggle } from '@/components/theme/theme-switcher'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { isSectionActive, sections } from '../../lib/nav'

const cvUrl = `${import.meta.env.BASE_URL}cv.pdf`

export function AppNavbar() {
  const path = useLocation().pathname

  return (
    <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto w-full max-w-4xl px-6">
        <div className="flex items-center justify-between gap-4 pt-5 pb-4">
          <Link to="/" className="group">
            <span className="block font-display font-semibold text-xl tracking-tight">
              Barnaby Rye
            </span>
            <span className="label-mono block">
              Aerospace engineering &middot; University of Sheffield
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1">
            <ThemeToggle />
            {__HAS_CV__ && (
              <Button asChild variant="outline" size="sm">
                <a href={cvUrl} download="Barnaby-Rye-CV.pdf">
                  CV
                </a>
              </Button>
            )}
          </div>
        </div>

        <nav className="-mb-px flex gap-6 overflow-x-auto">
          {sections.map((section) => {
            const isActive = isSectionActive(section, path)
            return (
              <Link
                key={section.name}
                to={section.to}
                className={cn(
                  'whitespace-nowrap border-b-2 pb-3 text-sm transition-colors',
                  isActive
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {section.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
