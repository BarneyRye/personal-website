import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { toTitleCase } from './src/lib/format'

function hasCv(): boolean {
  const fd = (() => {
    try {
      return fs.openSync(
        path.resolve(import.meta.dirname, './public/cv.pdf'),
        'r',
      )
    } catch {
      return undefined
    }
  })()
  if (fd === undefined) return false
  try {
    const header = Buffer.alloc(5)
    return (
      fs.readSync(fd, header, 0, 5, 0) === 5 && header.toString() === '%PDF-'
    )
  } finally {
    fs.closeSync(fd)
  }
}

function scaffold(options: {
  dir: string
  extension: string
  template: (name: string) => string
}): Plugin {
  const dir = path.resolve(import.meta.dirname, options.dir)
  return {
    name: 'scaffold',
    apply: 'serve',
    configureServer(server) {
      server.watcher.on('add', (file) => {
        const target = path.resolve(file)
        if (path.dirname(target) !== dir) return
        if (!target.endsWith(options.extension)) return
        try {
          if (fs.statSync(target).size !== 0) return
          fs.writeFileSync(
            target,
            options.template(path.basename(target, options.extension)),
          )
        } catch {
          return
        }
      })
    },
  }
}

export default defineConfig({
  server: {
    port: Number(process.env.PORT ?? 3000),
  },
  base: process.env.BASE_PATH ?? '/',
  define: {
    __HAS_CV__: JSON.stringify(hasCv()),
  },
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      customScaffolding: {
        routeTemplate: [
          '%%tsrImports%%',
          "import { UnderConstruction } from '@/components/redirects/under-construction'",
          '',
          '%%tsrExportStart%%{\n  component: RouteComponent,\n}%%tsrExportEnd%%',
          '',
          'function RouteComponent() {',
          '  return <UnderConstruction />',
          '}',
          '',
        ].join('\n'),
      },
    }),
    scaffold({
      dir: './src/components/seadream/projects',
      extension: '.tsx',
      template: (name) =>
        [
          'import {',
          'ProjectFigure,',
          'ProjectIntro,',
          'ProjectLink,',
          'ProjectList,',
          'ProjectSection,',
          'ProjectSpecs,',
          'ProjectStatus,',
          'RepoLink,',
          'type Spec,',
          "} from '@/components/project'",
          '',
          `export const title = '${toTitleCase(name)}'`,
          `export const year = '${new Date().getFullYear()} - ${new Date().getFullYear() + 1}'`,
          `export const start = '${new Date().toISOString().slice(0, 7)}'`,
          'export const duration = 300',
          '',
          'export function Project() {',
          ' return (',
          '   <div className="space-y-12">',
          '     <ProjectIntro>example text</ProjectIntro>',
          '   </div>',
          ' )',
          '}',
          '',
        ].join('\n'),
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
