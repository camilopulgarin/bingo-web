import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  test: {
    globals: true,          // Permite usar 'describe', 'it', 'expect' sin importarlas
    environment: 'jsdom',   // Simula el DOM en tests
    setupFiles: './src/setupTests.js', // Archivo para configuraciones globales
    coverage: {
      provider: 'v8'
    }
  }
})
