import { useMachine } from "@xstate/react";
import { createGameSetupMachine } from "./machine/GameSetupMachine";
import { useParams, useNavigate } from "react-router-dom";
import { StepsGameSetup } from "./StepsGameSetup";
import { Container, Paper } from "@mui/material";
import { useMemo, useEffect } from "react";

const GameSetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const gameMachine = useMemo(() => createGameSetupMachine(id), [id]);
  const [state, send] = useMachine(gameMachine);

  console.log("Nuestra máquina", state.value, state.context);

  // 🔹 Detecta cuando el estado llega a "redirecting"
  useEffect(() => {
    if (state.matches("redirecting")) {
      navigate("/game", {
        state: {
          selectedTables: state.context.selectedTables,
          gameMode: state.context.gameMode,
        },
      });
    }
  }, [state, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 2, bgcolor: "#e8b647", color: "gray" }}
      >
        <StepsGameSetup state={state} send={send} />
        {state.matches("waitingRedirect") && (
          <p style={{ textAlign: "center", marginTop: "1rem" }}>
            ¡Configuración enviada! Redirigiendo en 5 segundos...
          </p>
        )}
      </Paper>
    </Container>
  );
};

export default GameSetup;
