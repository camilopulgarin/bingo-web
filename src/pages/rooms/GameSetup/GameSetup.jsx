/* import { useMachine } from "@xstate/react";
import { GameSetupMachine } from "./machine/GameSetupMachine";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { StepsGameSetup } from "./StepsGameSetup";

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
   console.log(state.value, state.context);

  const step = state.value;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <StepsGameSetup  state={state} send={send}/>
    </div>
  );
};

export default GameSetup; */

import { useMachine } from "@xstate/react";
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

