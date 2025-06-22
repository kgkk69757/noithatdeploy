import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'http://localhost:4321',
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
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
  }
});
