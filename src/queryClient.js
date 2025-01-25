// src/queryClient.js
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Número de reintentos en caso de fallo
      refetchOnWindowFocus: false, // No recargar automáticamente al cambiar de ventana
    },
    mutations: {
      retry: false, // No reintentar mutaciones fallidas
    },
  },
});

export default queryClient;