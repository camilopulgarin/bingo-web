
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DrawnBallDisplay from "./DrawnBallDisplay";
import { useDispatch } from "react-redux";
import { addDrawnNumber, resetDrawnNumbers } from "../../../redux/slices/game/BingoTotalCellSlice";
import { useNarrador } from "../../../hooks/useNarrador";

const socket = io("http://localhost:3000");

const getBingoLetter = (number) => {
  if (number <= 15) return "B";
  if (number <= 30) return "I";
  if (number <= 45) return "N";
  if (number <= 60) return "G";
  return "O";
};

const GameSocket = () => {
  const { narrar } = useNarrador();
  const [ball, setBall] = useState(null);
  const [allBalls, setAllBalls] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor de sockets:", socket.id);
    });

    socket.on("ballDrawn", (newBall) => {
      if (!gameStarted) return; // 👈 ignoramos bolas si el juego no está activo
      console.log("Bola recibida:", newBall);
      setBall({ number: newBall, letter: getBingoLetter(newBall) });
      setAllBalls((prev) => [
        ...prev,
        { number: newBall, letter: getBingoLetter(newBall) },
      ]);
      dispatch(addDrawnNumber(newBall))
      narrar(`Balota ${getBingoLetter(newBall)} ${newBall}`); 
      
    });

    socket.on("gameOver", (drawnBalls) => {
      if (!gameStarted) return;
      console.log("Juego terminado:", drawnBalls);
      setAllBalls(
        drawnBalls.map((n) => ({ number: n, letter: getBingoLetter(n) }))
      );
      setGameStarted(false); // 👈 detenemos el juego
    });

    socket.on("winnerConfirmed", (winnerId) => {
      console.log("Ganador confirmado:", winnerId);
      setWinner(winnerId);
      setGameStarted(false); // 👈 detenemos el juego al confirmar ganador
      // dispatch(resetDrawnNumbers()); // 👈 limpia el estado global
      // drawnBalls.forEach((n) => dispatch(addDrawnNumber(n))); // 👈 agrega todos los sorteados
    });

    return () => {
      socket.off("ballDrawn");
      socket.off("gameOver");
      socket.off("winnerConfirmed");
    };
  }, [gameStarted]);

  const startGame = () => {
    setWinner(null); // reiniciamos ganador
    setAllBalls([]);
    setBall(null);
    setGameStarted(true);
    dispatch(resetDrawnNumbers()); // 👈 limpia el estado global al iniciar
    socket.emit("startGame");
    narrar("¡El juego ha comenzado!"); // Narrador anuncia el inicio
  };

  const confirmWinner = (id) => {
    socket.emit("confirmWinner", id);
    setWinner(id);
    setGameStarted(false); // 👈 paramos el sorteo en frontend
    socket.emit("startGame");
    narrar(`¡Tenemos un ganador! Felicidades ${id}`); // Narrador anuncia el ganador
  };

  return (
    <div className="flex  items-center space-x-2">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="font-bold text-2xl">Bingo en Vivo 🎱</h2>
        <div className="flex flex-col items-center space-y-2">
          {!gameStarted && !winner && (
          <p>Esperando inicio del juego...</p>
        )}
          <div>
            <button className="border-solid border-[#3b5f8e] border-1 m-0.5" onClick={startGame} disabled={gameStarted}>
          Iniciar Juego
            </button>
            <button className="border-solid border-[#3b5f8e] border-1 m-0.5" onClick={() => confirmWinner("Jugador1")} disabled={!gameStarted}>
              Confirmar Ganador
            </button>
          </div>
        
        </div>
        {/* <div>
          Bola actual:{" "}
          {ball ? `${ball.letter}${ball.number}` : "Esperando bola..."}
        </div>
        <div>
          Todas las bolas:{" "}
          {allBalls.length > 0
            ? allBalls.map((b) => `${b.letter}${b.number}`).join(", ")
            : "Ninguna aún"}
        </div> */}
            
        {winner && <div>🏆 Ganador confirmado: {winner.pattern}</div>}
      </div>
      <DrawnBallDisplay drawn={ball} />
    </div>
  );
};

export default GameSocket;
