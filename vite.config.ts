import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: Number(process.env.PORT) ?? 3000,
  },
  base: process.env.BASE_PATH ?? '/',
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
