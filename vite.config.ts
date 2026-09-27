import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

function readSeo() {
  const source = readFileSync(path.resolve(rootDir, 'src/content/site.ts'), 'utf8')
  const block = source.match(/seo:\s*\{([\s\S]*?)\n {2}\}/)?.[1]
  const title = block?.match(/title:\s*'([^']*)'/)?.[1]
  const description = block?.match(/description:\s*'([^']*)'/)?.[1]
  if (!title || !description) throw new Error('Missing seo title or description in src/content/site.ts')
  return { title, description }
}

function siteHtml(): Plugin {
  return {
    name: 'site-html-copy',
    transformIndexHtml(html) {
      const seo = readSeo()
      return html.replaceAll('__SITE_TITLE__', seo.title).replaceAll('__SITE_DESCRIPTION__', seo.description)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteHtml()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('/three/') || id.includes('@react-three') || id.includes('react-reconciler')) {
            return 'three'
          }
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion'
          }
          if (id.includes('lenis')) return 'gsap'
          if (id.includes('gsap')) return 'gsap'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('react-router') ||
            id.includes('scheduler/')
          ) {
            return 'react-vendor'
          }
          if (id.includes('lucide-react')) return 'icons'
        },
      },
    },
  },
})
