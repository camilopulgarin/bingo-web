// components/bingo/GenerateButton.jsx
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import { generateCard } from '../../../redux/slices/bingoSlice';

const GenerateButton = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-center ">
      <Button
        variant="outlined"
        color="warning"
        startIcon={<CasinoIcon />}
        onClick={() => dispatch(generateCard())}
        
      >
        ¡Nueva Tabla!
      </Button>
    </div>
  );
};

export default GenerateButton;