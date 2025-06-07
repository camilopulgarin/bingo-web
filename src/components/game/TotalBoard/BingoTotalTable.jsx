// components/bingo/BingoTotalTable.jsx
import { useSelector } from 'react-redux';
import BingoTotalCell from './BingoTotalCell';

const BingoTotalTable = () => {
  const drawnNumbers = useSelector((state) => state.BingoTotalCell.drawnNumbers); // array de números [1, 35, 70, ...]

  const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

  return (
    <div className="bg-yellow-50 border-[3px] border-yellow-800 rounded-2xl p-4 shadow-lg max-w-fit mx-auto">
      <h2 className="text-2xl font-bold text-yellow-900 text-center mb-2">Histórico</h2>
      <div className="grid grid-cols-15 gap-1">
        {allNumbers.map((number) => (
          <BingoTotalCell
            key={number}
            number={number}
            marked={drawnNumbers.includes(number)}
          />
        ))}
      </div>
    </div>
  );
};

export default BingoTotalTable;
