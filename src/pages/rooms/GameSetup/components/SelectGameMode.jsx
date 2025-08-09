// src/components/game/setup/SelectGameMode.jsx
/* import { useState } from "react";

const SelectGameMode = ({ defaultValue = "clásico", state, send, }) => {
  const [mode, setMode] = useState(defaultValue);

  const handleContinue = () => {
    if (!mode) return alert("Debes seleccionar un modo de juego.");
    send({ type: 'NEXT' });
  };

  const goToBack = () => {
    send({type: "BACK"  })
  }

  return (
    <div>
      <label className="block mb-2 text-lg font-medium">
        Selecciona el modo de juego:
      </label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border px-3 py-2 rounded w-full text-lg"
      >
        <option value="clásico">Clásico</option>
        <option value="rápido">Rápido</option>
        <option value="personalizado">Personalizado</option>
      </select>

      <div className="mt-4 flex gap-3">
        <button
          onClick={goToBack}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          color="warning"
        >
          Atrás
        </button>
        <button
          onClick={handleContinue}
          className="px-4 py-2  bg-blue-600 text-white rounded hover:bg-blue-700"
          color="warning"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SelectGameMode;
 */

import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const SelectGameMode = ({ defaultValue = "clásico", state, send }) => {
  const [mode, setMode] = useState(defaultValue);

  const handleContinue = () => {
    if (!mode) return alert("Debes seleccionar un modo de juego.");
    send({ type: "NEXT", gameMode: mode }); // también puedes incluir el modo en el evento si lo necesitas
  };

  const goToBack = () => {
    send({ type: "BACK" });
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Selecciona el modo de juego:
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="game-mode-label">Modo de juego</InputLabel>
        <Select
          labelId="game-mode-label"
          value={mode}
          label="Modo de juego"
          onChange={(e) => setMode(e.target.value)}
        >
          <MenuItem value="clásico">Clásico</MenuItem>
          <MenuItem value="rápido">Rápido</MenuItem>
          <MenuItem value="personalizado">Personalizado</MenuItem>
        </Select>
      </FormControl>

      <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
        <Button variant="outlined" color="warning" onClick={goToBack}>
          Atrás
        </Button>
        <Button variant="contained" color="warning" onClick={handleContinue}>
          Continuar
        </Button>
      </Box>
    </Box>
  );
};

export default SelectGameMode;
