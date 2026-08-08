import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '@/components/page-header'

export const Route = createFileRoute('/home/website')({
  component: RouteComponent,
})

const STACK = [
  'React and TypeScript, bundled by Vite',
  'TanStack Router for file based routing',
  'Tailwind CSS for styling, with Radix primitives',
  'Biome for linting and formatting',
  'Bun as the package manager and script runner',
  'GitHub Actions deploying to GitHub Pages',
]

function RouteComponent() {
  return (
    <div className="space-y-12">
      <PageHeader text="A little bit about this website and how it's built" />

      <section className="space-y-4">
        <h2 className="label-mono">What is the point of this website?</h2>
        <p className="max-w-prose text-muted-foreground">
          LinkedIn and a CV don't truly show off your projects as much as I
          would hope. This website therefore sits as an extension to them, to
          explain the ins and outs of each, from what was done and why, to where
          they succeeded and failed.
        </p>
        <div className="space-y-2">
          <p className="max-w-prose font-semibold text-muted-foreground italic">
            So why don't I have a domain?
          </p>
          <p className="max-w-prose text-muted-foreground">
            Well, as mentioned previously, this is a way to show off my projects
            and experiences, not a way to connect, that's why it&apos;s{' '}
            <span className="font-bold italic">link</span>edin. So quite
            frankly, there is no need for the expenditure just to have a fancy
            domain name. Especially when GitHub Pages makes it so easy to host
            your own static website like this, without anything extra.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="label-mono">How is the website built?</h2>
        <p className="max-w-prose text-muted-foreground">
          It is a static site, so there is no backend and no database anywhere.
          Every page is written as a React component in TypeScript and built
          ahead of time into plain files, which is the whole reason it can sit
          on GitHub Pages for free.
        </p>
        <ul className="grid gap-x-10 gap-y-2 text-sm sm:grid-cols-2">
          {STACK.map((item) => (
            <li key={item} className="flex gap-3 border-b py-2">
              <span className="text-primary">&mdash;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="max-w-prose text-muted-foreground">
          TanStack makes it a breeze to add new pages, as it defines the routes
          based off the files rather than a set list. It makes it easy and
          scalable to add new projects, just make a file and fill it in with the
          custom built project components.
        </p>
        <p className="max-w-prose text-muted-foreground">
          Deployment is via a GitHub Action. Pushing to main installs, lints,
          builds, works out the base path from the repository name and pushes
          the result to Pages.
        </p>
        <p className="max-w-prose text-muted-foreground">
          The project also contains a few nuances to the standard static
          website. It includes a script to scale down images, for faster load
          times while maintaining the high quality. As well as custom
          scaffolding for the route pages and Seadream projects components. And
          for when things break, go missing or just aren't complete, relevant
          redirects are in place to let you know.
        </p>
      </section>
    </div>
  )
}
