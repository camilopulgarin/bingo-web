
/* import { useMachine } from "@xstate/react";
import { GameSetupMachine } from "./machine/GameSetupMachine";
import { useParams } from "react-router-dom";
import { StepsGameSetup } from "./StepsGameSetup";
import { Container, Paper, Box } from "@mui/material";

const GameSetup = () => {
  const { id } = useParams();

  const [state, send] = useMachine(GameSetupMachine, {
    context: { gameId: id },
    services: {
      submitGameConfig: async (context) => {
        // Aquí puedes hacer una petición POST
        console.log("Enviando configuración...", context);
        return Promise.resolve(); // Simular éxito
      },
    },
  });

  console.log("Nuestra maquina",state, state.value, state.context);

  return (
    <Container maxWidth="sm" sx={{height: '100vh',
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center'}} >
      <Paper
        elevation={3}
        sx={{  p: 4, borderRadius: 2,  bgcolor: '#e8b647', color: "gray"}}
      >
        <StepsGameSetup state={state} send={send} />
      </Paper>
    </Container>
  );
};

export default GameSetup;
 */

// GameSetup.jsx
import { useMachine } from "@xstate/react";
import { createGameSetupMachine } from "./machine/GameSetupMachine";
import { useParams } from "react-router-dom";
import { StepsGameSetup } from "./StepsGameSetup";
import { Container, Paper } from "@mui/material";
import { useMemo } from "react";

const GameSetup = () => {
  const { id } = useParams();

  const gameMachine = useMemo(() => createGameSetupMachine(id), [id]);
  const [state, send] = useMachine(gameMachine);

  console.log("Nuestra máquina", state.value, state.context);

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
      </Paper>
    </Container>
  );
};

export default GameSetup;

