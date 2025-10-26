import { useEffect, useState } from "react";
import BingoCell from "./BingoCell";
import { io } from "socket.io-client";

const headers = ["B", "I", "N", "G", "O"];
const socket = io("http://localhost:3000");

const BingoTableMock = ({ gameId, tableId, card, onBingo }) => {
  const [selectedCells, setSelectedCells] = useState({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });
  const [bingoResult, setBingoResult] = useState(null);

  useEffect(() => {
    socket.on("bingoResult", (result) => {
      setBingoResult(result);
    });
    return () => {
      socket.off("bingoResult");
    };
  }, []);

  const handleToggle = (column, value, isSelected) => {
    setSelectedCells((prev) => {
      const updated = { ...prev };
      if (isSelected) {
        updated[column] = [...prev[column], value];
      } else {
        updated[column] = prev[column].filter((v) => v !== value);
      }
      return updated;
    });
  };

  const handleBingo = () => {
    socket.emit("bingo", { userId: gameId, boardId: tableId, gameId: gameId });
    if (onBingo) {
      onBingo(selectedCells);
    }
  };

  return (
    <div className="bg-yellow-100 p-4 rounded-2xl shadow-lg border-[3px] border-yellow-800 max-w-fit mx-auto retro-border">
      <div className="grid grid-cols-5 gap-2">
        {headers.map((letter) => (
          <div
            key={letter}
            className="text-center text-3xl font-bold text-yellow-900"
          >
            {letter}
          </div>
        ))}

        {[...Array(5)].map((_, rowIndex) =>
          headers.map((letter) => (
            <BingoCell
              key={`${letter}-${rowIndex}`}
              value={card[letter][rowIndex]}
              column={letter}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>

      {/* Botón de Bingo */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleBingo}
          className="px-6 py-2 bg-emerald-600 text-white font-extrabold rounded-xl 
               shadow-[3px_3px_0px_#14532d] border-4 border-emerald-700 
               hover:bg-emerald-700 hover:shadow-[2px_2px_0px_#14532d] 
               active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150"
        >
          ¡Bingo!
        </button>
      </div>
      {bingoResult && (
        <div className={`mt-2 text-center font-bold ${bingoResult.success ? "text-green-700" : "text-red-700"}`}>
          {bingoResult.message}
        </div>
      )}
    </div>
  );
};

export default BingoTableMock;
