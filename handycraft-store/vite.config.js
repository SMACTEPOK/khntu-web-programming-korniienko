import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
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