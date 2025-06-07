// components/DrawnNumbersTable.jsx
import { useSelector } from 'react-redux';

const headers = ['B', 'I', 'N', 'G', 'O'];
const ranges = {
  B: [1, 15],
  I: [16, 30],
  N: [31, 45],
  G: [46, 60],
  O: [61, 75],
};

const DrawnNumbersTable = () => {
  const drawnNumbers = useSelector((state) => state.BingoTotalCell.drawnNumbers);

  // Agrupar los números por columna
  const groupedNumbers = headers.reduce((acc, letter) => {
    const [min, max] = ranges[letter];
    acc[letter] = drawnNumbers
      .filter((num) => num >= min && num <= max)
      .sort((a, b) => a - b);
    return acc;
  }, {});

  // Determinar la fila máxima (máximo de números por letra)
  const maxLength = Math.max(...headers.map((h) => groupedNumbers[h].length));

  return (
    <div className="bg-yellow-50 border-[3px] border-yellow-800 rounded-xl p-4 shadow-md max-w-fit mx-auto">
      <div className="grid grid-cols-5 gap-2">
        {headers.map((h) => (
          <div key={h} className="text-center font-bold text-lg text-yellow-900">{h}</div>
        ))}
        {[...Array(maxLength)].map((_, rowIdx) =>
          headers.map((h) => (
            <div
              key={`${h}-${rowIdx}`}
              className={`h-10 w-10 flex items-center justify-center text-md rounded border border-yellow-400 ${
                groupedNumbers[h][rowIdx]
                  ? 'bg-green-200 text-green-900 font-semibold'
                  : 'bg-yellow-100'
              }`}
            >
              {groupedNumbers[h][rowIdx] ?? ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DrawnNumbersTable;
