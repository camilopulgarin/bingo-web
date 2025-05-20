// components/bingo/GenerateButton.jsx
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { generateCard } from '../../../redux/slices/bingoSlice';

const GenerateButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center mt-4">
      <Button
        variant="contained"
        color="secondary"
        startIcon={<CasinoIcon />}
        onClick={() => dispatch(generateCard())}
        sx={{
          fontFamily: 'Creepster, cursive',
          fontSize: '1.2rem',
          padding: '0.5rem 1.5rem',
        }}
      >
        ¡Nueva Tabla!
      </Button>
    </div>
  );
};

export default GenerateButton;