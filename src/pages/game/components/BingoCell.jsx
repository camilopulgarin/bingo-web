

import { useState } from "react";

const BingoCell = ({ value }) => {
  const [selected, setSelected] = useState(false);

  const toggleSelect = () => {
    setSelected(!selected);
  };

  return (
    <div
      onClick={toggleSelect}
      className={`h-16 w-16 rounded-md shadow-inner flex items-center justify-center text-2xl font-semibold border-2 retro-font cursor-pointer transition-colors duration-300
        ${selected ? "bg-[#4e342e] y border-[#4e3400]" : "bg-yellow-200 border-yellow-700"}
      `}
    >
      {value}
    </div>
  );
};

export default BingoCell;
