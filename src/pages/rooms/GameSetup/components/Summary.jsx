import { Box, Button, Typography, Grid } from "@mui/material";
import BingoTable from "../../../game/components/BingoTable";

const Summary = ({ send, context }) => {
  const { tableCount, selectedTables, gameMode } = context;

  const handleStartGame = () => {
    // Aquí puedes hacer una petición POST a tu backend si ya tienes API
    // Por ejemplo: await axios.post('/api/games', { selectedTables, gameMode });

    send({ type: "SUBMIT" }); // o NEXT si tu máquina lo maneja así
  };

  const goToBack = () => {
    send({ type: "BACK" });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Resumen de tu partida
      </Typography>

      <Typography variant="body1">
        Modo de juego: <strong>{gameMode || "Normal"}</strong>
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        Tablas seleccionadas ({tableCount}):
      </Typography>

     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          maxHeight: "440px", 
          overflowY: "auto",
          pr: 1, 
        }}
      >
        {selectedTables.map((card, index) => (
          <Box key={index}>
            <BingoTable staticCard={card} />
          </Box>
        ))}
       </Box>

      <Box sx={{ display: "flex", gap: 2, justifyContent: "space-evenly", mt: 3 }}>
        <Button variant="outlined" onClick={goToBack} color="warning">
          Atrás
        </Button>

        <Button variant="contained" onClick={handleStartGame} color="warning">
          Iniciar partida
        </Button>
      </Box>
    </Box>
  );
};

export default Summary;
