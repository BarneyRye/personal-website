import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Separator } from '@/components/ui/separator'

const socialLinks = [
  {
    href: 'https://github.com/BarneyRye',
    label: 'BarneyRye',
    icon: FaGithub,
  },
  {
    href: 'https://www.linkedin.com/in/barnabyrye/',
    label: 'Barnaby Rye',
    icon: FaLinkedin,
  },
  {
    href: 'mailto:Barneyrye@btinternet.com',
    label: 'Email',
    icon: FaEnvelope,
  },
]

export function AppFooter() {
  return (
    <footer className="mx-auto flex w-full flex-col gap-6">
      <Separator className="-mb-4" />
      <div className="flex flex-col items-center gap-4 p-6 mb-6">
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {socialLinks.map(({ href, label, icon: Icon }) => {
            const isExternal = href.startsWith('http')
            return (
              <a
                key={href}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="flex flex-row items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Icon className="size-6" />
                {label}
              </a>
            )
          })}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Barnaby Rye
        </p>
      </div>
    </footer>
  )
}
