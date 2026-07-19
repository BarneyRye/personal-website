import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
