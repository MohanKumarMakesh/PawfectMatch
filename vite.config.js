import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// vite.config.js
import { qrcode } from 'vite-plugin-qrcode';


export default defineConfig({
  plugins: [react(), qrcode()],
  server: {
    watch: {
      usePolling: true
    }
  }
})