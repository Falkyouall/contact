import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    outDir: '.output',
  },
  environments: {
    client: {
      build: {
        outDir: '.output/client',
      },
    },
    ssr: {
      build: {
        outDir: '.output/server',
      },
    },
  },
  plugins: [
    tsConfigPaths(),
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      outputStructure: 'message-modules',
      cookieName: 'PARAGLIDE_LOCALE',
      strategy: ['cookie', 'preferredLanguage', 'baseLocale'],
    }),
    tanstackStart(),
    viteReact(),
    tailwindcss(),
  ],
})
