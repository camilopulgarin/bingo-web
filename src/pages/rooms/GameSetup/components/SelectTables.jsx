

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { generateCard } from "../../../../redux/slices/bingoSlice"; // ajusta esta ruta
import BingoTable from "../../../game/components/BingoTable";
import GenerateButton from "../../../game/components/GenerateButton";

const SelectTables = ({ send, context }) => {
  const dispatch = useDispatch();

  const [selectedTables, setSelectedTables] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  // Recibe la carta generada desde BingoTable
  const handleCardReady = (card) => {
    setCurrentCard(card);
  };

  // Agrega la tabla actual a la lista de seleccionadas
  const handleAddTable = () => {
    if (!currentCard) {
      alert("La tabla aún no está lista.");
      return;
    }

    if (selectedTables.length >= context.tableCount) {
      alert("Ya seleccionaste todas las tablas.");
      return;
    }

    const isDuplicate = selectedTables.some(
      (table) => JSON.stringify(table) === JSON.stringify(currentCard)
    );

    if (isDuplicate) {
      alert("Esta tabla ya fue seleccionada. Genera otra si deseas una diferente.");
      return;
    }

    setSelectedTables([...selectedTables, currentCard]);

    // Genera automáticamente una nueva tabla
    dispatch(generateCard());
  };

  // Confirma y envía las tablas al state machine
  const handleContinue = () => {
    if (selectedTables.length !== context.tableCount) {
      alert(`Debes seleccionar exactamente ${context.tableCount} tabla(s).`);
      return;
    }

    send({ type: "NEXT", selectedTables });
  };

  const goToBack = () => {
    send({ type: "BACK" });
  };

  // Al iniciar, genera una tabla y reinicia selección
  useEffect(() => {
    dispatch(generateCard());
    setSelectedTables([]);
    setCurrentCard(null);
  }, [dispatch, context.tableCount]);

  return (
    <Box sx={{  }}>
      <Typography variant="h6" gutterBottom>
        Selecciona las {context.tableCount} tabla(s) para jugar:
      </Typography>

      {/* Tabla actual */}
      <Box sx={{ mb: 3, mt: 1 }}>
        <BingoTable onCardReady={handleCardReady} />

        <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "space-between" }}>
          <GenerateButton />
          <Button
            variant="contained"
            color="warning"
            onClick={handleAddTable}
            disabled={selectedTables.length >= context.tableCount}
          >
            Escoger esta tabla
          </Button>
        </Box>
      </Box>

      {/* Contador */}
      <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
        Tablas seleccionadas: {selectedTables.length} / {context.tableCount}
      </Typography>

      {/* Botones navegación */}
      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-evenly" }}>
        <Button variant="outlined" color="warning" onClick={goToBack}>
          Atrás
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={handleContinue}
          disabled={selectedTables.length !== context.tableCount}
        >
          Confirmar selección
        </Button>
      </Box>
    </Box>
  );
};

export default SelectTables;


