import { useState } from "react";

const BingoCell = ({ value, column, onToggle }) => {
  const [selected, setSelected] = useState(false);

  const toggleSelect = () => {
    if (value === "★") return; // la estrella no se marca
    const newState = !selected;
    setSelected(newState);
    if (onToggle) {
      onToggle(column, value, newState); // notificamos al padre
    }
  };

  return (
    <div
      onClick={toggleSelect}
      className={`h-16 w-16 rounded-md shadow-inner flex items-center justify-center 
                  text-2xl font-semibold border-2 retro-font transition-colors duration-300
        ${value === "★"
          ? "bg-yellow-900 border-yellow-700 cursor-default"
          : selected
            ? "bg-yellow-900 border-yellow-700 cursor-pointer"
            : "bg-yellow-200 border-yellow-700 cursor-pointer"}
      `}
    >
      {value}
    </div>
  );
};

export default BingoCell;

