import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const socialLinks = [
  {
    href: 'https://github.com/BarneyRye',
    label: 'GitHub',
    icon: FaGithub,
  },
  {
    href: 'https://www.linkedin.com/in/barnabyrye/',
    label: 'LinkedIn',
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
    <footer className="mt-24 border-t">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-8">
        <p className="label-mono">
          &copy; {new Date().getFullYear()} Barnaby Rye
        </p>
        <nav className="flex items-center gap-5">
          {socialLinks.map(({ href, label, icon: Icon }) => {
            const isExternal = href.startsWith('http')
            return (
              <a
                key={href}
                href={href}
                {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground"
              >
                <Icon className="size-4" />
                {label}
              </a>
            )
          })}
        </nav>
      </div>
    </footer>
  )
}
