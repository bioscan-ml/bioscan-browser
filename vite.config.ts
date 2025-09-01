import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://aspis.cmpt.sfu.ca',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/backend': {
        target: 'https://spathi.cmpt.sfu.ca/bioscan-browser-flask',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
      '/gradio': {
        target: 'https://spathi.cmpt.sfu.ca/bioscan-browser/gradio_api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gradio/, ''),
      },
    },
  },
})
