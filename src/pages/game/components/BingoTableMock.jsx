import { useState } from "react";
import BingoCell from "./BingoCell";

const headers = ["B", "I", "N", "G", "O"];

const BingoTableMock = ({ gameId, tableId, card, onBingo }) => {
  const [selectedCells, setSelectedCells] = useState({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });

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
    console.log("🎯 Partida:", gameId);
    console.log("🆔 Tabla:", tableId);
    console.log("✅ Casillas seleccionadas:", selectedCells);
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
    </div>
  );
};

export default BingoTableMock;
