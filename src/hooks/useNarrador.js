// src/hooks/useNarrador.js
import { useRef } from "react";

export function useNarrador() {
  const synthRef = useRef(window.speechSynthesis);

  const narrar = (texto, opciones = {}) => {
    if (!synthRef.current) return;

    // Detiene cualquier narración previa
    synthRef.current.cancel();

    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = opciones.lang || "es-ES"; // idioma
    speech.pitch = opciones.pitch || 3; // tono
    speech.rate = opciones.rate || 0.55; // velocidad
    speech.volume = opciones.volume || 1; // volumen

    synthRef.current.speak(speech);
  };

  return { narrar };
}
