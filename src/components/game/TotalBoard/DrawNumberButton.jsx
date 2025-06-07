// components/bingo/DrawNumberButton.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addDrawnNumber } from '../../../redux/slices/game/BingoTotalCellSlice';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DrawNumberButton = () => {
  const dispatch = useDispatch();
  const drawnNumbers = useSelector((state) => state.BingoTotalCell.drawnNumbers);
  const [lastNumber, setLastNumber] = useState(null);

  const drawNumber = () => {
    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1).filter(
      (n) => !drawnNumbers.includes(n)
    );

    if (availableNumbers.length === 0) {
      alert('¡Ya se han sorteado todos los números!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers[randomIndex];

    dispatch(addDrawnNumber(number));
    setLastNumber(number);
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      {/* Animación del último número */}
      <div className="relative h-32 w-32 flex items-center justify-center">
        <AnimatePresence>
          {lastNumber && (
            <motion.div
              key={lastNumber}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute text-6xl text-yellow-800 font-retro bg-yellow-200 border-4 border-yellow-800 rounded-full h-24 w-24 flex items-center justify-center shadow-xl"
            >
              {lastNumber}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='mt-6'>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={drawNumber}
          sx={{
            fontFamily: 'Creepster, cursive',
            fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            zIndex: 10,
            position: 'relative'
          }}
        >
          Sortear Número
        </Button>
      </div>
    </div>
  );
};

export default DrawNumberButton;
