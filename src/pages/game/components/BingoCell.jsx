// components/bingo/BingoCell.jsx

const BingoCell = ({ value }) => {
  return (
    <div className="h-16 w-16 bg-yellow-200 rounded-md shadow-inner flex items-center justify-center text-2xl font-semibold border-2 border-yellow-700 retro-font">
      {value}
    </div>
  );
};

export default BingoCell;