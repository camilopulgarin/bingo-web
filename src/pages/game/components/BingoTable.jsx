
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import BingoCell from './BingoCell';

const headers = ['B', 'I', 'N', 'G', 'O'];

const BingoTable = ({ onCardReady }) => {
  const card = useSelector((state) => state.randomBingo.card);

  useEffect(() => {
    if (card && onCardReady) {
      // Enviamos la carta completa al padre
      onCardReady(card);
    }
  }, [card, onCardReady]);

  return (
    <div className="bg-yellow-100 p-4 rounded-2xl shadow-lg border-[3px] border-yellow-800 max-w-fit mx-auto retro-border">
      <div className="grid grid-cols-5 gap-2">
        {headers.map((letter) => (
          <div key={letter} className="text-center text-3xl font-bold text-yellow-900">{letter}</div>
        ))}
        {[...Array(5)].map((_, rowIndex) =>
          headers.map((letter) => (
            <BingoCell key={`${letter}-${rowIndex}`} value={card[letter][rowIndex]} />
          ))
        )}
      </div>
    </div>
  );
};

export default BingoTable;

