// components/bingo/BingoTotalCell.jsx
const BingoTotalCell = ({ number, marked }) => {
  return (
    <div
      className={`h-10 w-10 flex items-center justify-center text-lg font-bold border-2 rounded-md 
        ${marked ? 'bg-green-500 text-white border-green-700' : 'bg-white text-gray-800 border-gray-400'}
        transition duration-300 ease-in-out`}
    >
      {number}
    </div>
  );
};

export default BingoTotalCell;