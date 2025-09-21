// src/components/GameSocket.js
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); 
// 👆 cambia el puerto al que uses en tu backend

const GameSocket = () => {
  const [ball, setBall] = useState(null);
  const [allBalls, setAllBalls] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    // Al conectarse
    socket.on("connect", () => {
      console.log("Conectado al servidor de sockets:", socket.id);
    });

    // Escuchar cuando el servidor envía una bola
    socket.on("ballDrawn", (newBall) => {
      console.log("Bola recibida:", newBall);
      setBall(newBall);
      setAllBalls((prev) => [...prev, newBall]);
    });

    // Escuchar cuando el juego termina
    socket.on("gameOver", (drawnBalls) => {
      console.log("Juego terminado:", drawnBalls);
      setAllBalls(drawnBalls);
    });

    // Escuchar confirmación de ganador
    socket.on("winnerConfirmed", (winnerId) => {
      console.log("Ganador confirmado:", winnerId);
      setWinner(winnerId);
    });

    return () => {
      // Limpiar listeners cuando el componente se desmonta
      socket.off("ballDrawn");
      socket.off("gameOver");
      socket.off("winnerConfirmed");
    };
  }, []);

  // Funciones para emitir eventos al servidor
  const startGame = () => {
    socket.emit("startGame");
  };

  const confirmWinner = (id) => {
    socket.emit("confirmWinner", id);
  };

  return (
    <div>
      <h2>Bingo en Vivo 🎱</h2>
      <button onClick={startGame}>Iniciar Juego</button>
      <button onClick={() => confirmWinner("Jugador1")}>
        Confirmar Ganador
      </button>
      <div>Bola actual: {ball}</div>
      <div>Todas las bolas: {allBalls.join(", ")}</div>
      {winner && <div>Ganador confirmado: {winner}</div>}
    </div>
  );
};

export default GameSocket;
