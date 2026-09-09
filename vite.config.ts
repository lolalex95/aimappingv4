import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    viteSingleFile(),
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    watch: {
      ignored: ['**/*.mp4', '**/*.zip', '**/*.pdf', '**/*.avi', '**/*.mov'],
    },
  },
})
