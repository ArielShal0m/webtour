import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: '/index.htm',
  },
  css: {
    devSourcemap: false,
  },
  build: {
    sourcemap: false,
  },
})
