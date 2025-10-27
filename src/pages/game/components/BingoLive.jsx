

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [ball, setBall] = useState(null);
  const [allBalls, setAllBalls] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor de sockets:", socket.id);
    });

    socket.on("ballDrawn", (newBall) => {
      if (!gameStarted) return;
      setBall({ number: newBall, letter: getBingoLetter(newBall) });
      setAllBalls((prev) => [...prev, { number: newBall, letter: getBingoLetter(newBall) }]);
      dispatch(addDrawnNumber(newBall));
      narrar(`Balota ${getBingoLetter(newBall)} ${newBall}`);
    });

    socket.on("gameOver", (drawnBalls) => {
      if (!gameStarted) return;
      console.log("Juego terminado:", drawnBalls);
      setGameStarted(false);
      setModalMessage("🕹️ La partida ha finalizado.");
      setShowModal(true);
      narrar("La partida ha terminado.");
    });

    socket.on("winnerConfirmed", (winnerId) => {
      console.log("Ganador confirmado:", winnerId);
      setWinner(winnerId);
      setGameStarted(false);
      setModalMessage(`🏆 ¡Tenemos un ganador! Jugador: ${winnerId}`);
      setShowModal(true);
      narrar(`¡Tenemos un ganador! Felicidades ${winnerId}`);
    });

    return () => {
      socket.off("ballDrawn");
      socket.off("gameOver");
      socket.off("winnerConfirmed");
    };
  }, [gameStarted]);

  const startGame = () => {
    setWinner(null);
    setAllBalls([]);
    setBall(null);
    setShowModal(false);
    setGameStarted(true);
    dispatch(resetDrawnNumbers());
    socket.emit("startGame");
    narrar("¡El juego ha comenzado!");
  };

  const confirmWinner = (id) => {
    socket.emit("confirmWinner", id);
    setWinner(id);
    setGameStarted(false);
    narrar(`¡Tenemos un ganador! Felicidades ${id}`);
  };

  const closeModal = () => {
    setShowModal(false);
    // 🔹 Redirigir automáticamente al cerrar el modal
    navigate("/game-history"); // cambia esta ruta si usas /dashboard o similar
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="font-bold text-2xl">Bingo en Vivo 🎱</h2>
        <div className="flex flex-col items-center space-y-2">
          {!gameStarted && !winner && <p>Esperando inicio del juego...</p>}
          <div>
            <button
              className="border border-blue-800 bg-blue-600 text-white px-3 py-1 rounded-lg m-1 hover:bg-blue-700 disabled:opacity-50"
              onClick={startGame}
              disabled={gameStarted}
            >
              Iniciar Juego
            </button>
            <button
              className="border border-green-800 bg-green-600 text-white px-3 py-1 rounded-lg m-1 hover:bg-green-700 disabled:opacity-50"
              onClick={() => confirmWinner("Jugador1")}
              disabled={!gameStarted}
            >
              Confirmar Ganador
            </button>
          </div>
        </div>
<<<<<<< HEAD

        {winner && <div>🏆 Ganador confirmado: {winner}</div>}
=======
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
>>>>>>> efbfbe3c378b03d7fe59abfe9267643c85229445
      </div>
      <DrawnBallDisplay drawn={ball} />

      {/* 🔹 Modal de finalización */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-2xl text-center w-[90%] max-w-md animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {modalMessage}
            </h2>
            <button
              onClick={closeModal}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Ir a Mis Partidas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSocket;
