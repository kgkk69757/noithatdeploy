import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [],

  vite: {
    build: {
      cssMinify: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['swiper'],
          }
        }
      }
    },
    ssr: {
      noExternal: ['swiper']
    }
  },

  compressHTML: true,

  build: {
    inlineStylesheets: 'auto'
  },

  adapter: vercel()
});