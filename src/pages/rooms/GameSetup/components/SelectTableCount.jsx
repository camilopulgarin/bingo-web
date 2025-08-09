/* 

import { useState } from "react";

export const SelectTableCount = ({ state, send }) => {
  const [tableCount, setTableCount] = useState(1);

 

  const handleContinue = () => {
    if (tableCount < 1) return alert("Debes seleccionar al menos una tabla.");
    send({ type: 'START', tableCount: tableCount });
  };


  return (
    <div>
      <label className="block mb-2 text-lg font-medium">
        ¿Cuántas tablas deseas usar?
      </label>
      <input
        type="number"
        min={1}
        value={tableCount}
        onChange={(e) => setTableCount(parseInt(e.target.value, 10))}
        className="border px-3 py-2 rounded w-full text-lg"
      />

      <button
        onClick={handleContinue}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Continuar
      </button>
    </div>
  );
};


 */

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

export const SelectTableCount = ({ state, send }) => {
  const [tableCount, setTableCount] = useState(1);

  const handleContinue = () => {
    if (tableCount < 1) {
      alert("Debes seleccionar al menos una tabla.");
      return;
    }
    send({ type: "START", tableCount: tableCount });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        ¿Cuántas tablas deseas usar?
      </Typography>

      <TextField
        type="number"
        inputProps={{ min: 1 }}
        value={tableCount}
        onChange={(e) => setTableCount(parseInt(e.target.value, 10))}
        fullWidth
        variant="outlined"
        size="medium"
      />

      <Button
        onClick={handleContinue}
        variant="contained"
        color="warning"
        fullWidth
        sx={{ mt: 3 }}
      >
        Continuar
      </Button>
    </Box>
  );
};
