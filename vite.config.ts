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
        target: 'https://annotations2.cs.sfu.ca',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // TEMP (local manual testing only, revert before commit): local BioChat
      // dev server so the chat UI exercises the new bioscan_action changes
      // instead of the deployed backend.
      '/dev-biochat': {
        target: 'http://127.0.0.1:5057',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-biochat/, ''),
      },
    },
  },
})
