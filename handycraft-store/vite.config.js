import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@config': path.resolve(import.meta.dirname, './src/config'),
    },
  },
  build: {
    rolldownOptions: {
      resolve: {
        alias: {
          '@config': path.resolve(import.meta.dirname, './src/config'),
        },
      },
    },
  },
})
