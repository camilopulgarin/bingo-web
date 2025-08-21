/* import { defineConfig } from 'vite'
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
}) */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true,
    // 👇 Esto asegura que cualquier ruta (ej: /game/:id)
    // redirija a index.html y sea manejada por react-router
    fs: {
      allow: ["."],
    },
  },
  preview: {
    port: 5173,
    // 👇 igual en modo preview (producción local)
    fs: {
      allow: ["."],
    },
  },
  test: {
    globals: true, // Permite usar 'describe', 'it', 'expect' sin importarlas
    environment: "jsdom", // Simula el DOM en tests
    setupFiles: "./src/setupTests.js", // Archivo para configuraciones globales
    coverage: {
      provider: "v8",
    },
  },
});
