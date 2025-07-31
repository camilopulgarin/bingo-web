/* import { createMachine, assign } from "xstate";

export const GameSetupMachine = createMachine({
  id: "gameSetup",
  initial: "selectTableCount",
  context: {
    tableCount: 1,
    gameMode: "clásico",
    selectedTables: [],
    gameId: null,
  },
  states: {
    selectTableCount: {
      on: {
        START: {
          target: "selectGameMode",
          actions: assign({
            tableCount: ({context, event}) => event.tableCount,
          }),
        },
      },
    },
    selectGameMode: {
      on: {
        NEXT: {
          target: "selectTables",
          actions: assign({
            gameMode: ({ context , event}) => event.gameMode,
          }),
        },
        BACK: "selectTableCount",
      },
    },
    selectTables: {
      on: {
        NEXT: {
          target: "summary",
          actions: assign({
            selectedTables: ({_, event}) => event.selectedTables,
          }),
        },
        BACK: "selectGameMode",
      },
    },
    summary: {
      on: {
        BACK: "selectTables",
        SUBMIT: "submitting",
      },
    },
    submitting: {
      invoke: {
        src: "submitGameConfig",
        onDone: {
          target: "done",
        },
        onError: {
          target: "summary",
        },
      },
    },
    done: {
      type: "final",
    },
  },
  


},
{
  actions: {
      cleanContext: assign({
        tableCount: 1,
        gameMode: "clásico",
        selectedTables: [],
      }),
    },

  }

); */

// GameSetupMachine.js
/* import { createMachine, assign , fromPromise} from "xstate";
import { patchGame } from "../../../../api/gamesApi"; // Ajusta la ruta si es necesario

export const GameSetupMachine = createMachine(
  {
    id: "gameSetup",
    initial: "selectTableCount",
    context: {
      tableCount: 1,
      gameMode: "clásico",
      selectedTables: [],
      gameId: "12345678-aaaa-bbbb-cccc-000000000001", // ID por defecto para ensayos
    },
    states: {
      selectTableCount: {
        on: {
          START: {
            target: "selectGameMode",
            actions: assign({
            tableCount: ({context, event}) => event.tableCount,
            }),
          },
        },
      },
      selectGameMode: {
        on: {
          NEXT: {
            target: "selectTables",
            actions: assign({
              gameMode: ({context, event}) => event.gameMode,
            }),
          },
          BACK: "selectTableCount",
        },
      },
      selectTables: {
        on: {
          NEXT: {
            target: "summary",
            actions: assign({
              selectedTables: ({context, event}) => event.selectedTables,
            }),
          },
          BACK: "selectGameMode",
        },
      },
      summary: {
        on: {
          BACK: "selectTables",
          SUBMIT: "submitting",
        },
      },
      submitting: {
        invoke: {
          src: "submitGameConfig",
          onDone: {
            target: "done",
          },
          onError: {
            target: "summary",
          },
        },
      },
      done: {
        type: "final",
      },
    },
  },
  {
    services: {
      submitGameConfig: async (context) => {
        const { gameId, selectedTables, gameMode } = context;
        console.log("gameId ", gameId );
        const payload = {
          gameId,
          selectedTables,
          gameModeVote: gameMode,
        };
        console.log("📤 Enviando a la API:", payload);

        return await patchGame(gameId, payload);
      },
    },
  }
);
 */

import { createMachine, assign, fromPromise, setup } from "xstate";
import { patchGame } from "../../../../api/gamesApi"; // Ajusta la ruta si es necesario
import { useParams } from "react-router-dom";

// Define la máquina de estado utilizando la función setup para las implementaciones
export const GameSetupMachine = setup({
  // Define tus actores (anteriormente servicios) aquí
  actors: {
    // 'submitGameConfig' es ahora un actor que envuelve una promesa
    submitGameConfig: fromPromise(async ({ input }) => {
      // En XState v5, el contexto se pasa como 'input' al actor invocado
      const { gameId, selectedTables, gameMode } = input;
      console.log("gameId ", gameId);
      const payload = {
        gameId,
        selectedTables,
        gameModeVote: gameMode,
      };
      console.log("📤 Enviando a la API:", payload);

      // Llama a tu función de API
      return await patchGame(gameId, payload);
    }),

    setGameId: () 
  },
  // Aquí también podrías definir acciones, guardias, etc.
  // actions: {
  //   myAction: ({ context }) => { /* ... */ }
  // },
  // guards: {
  //   myGuard: ({ context }) => true
  // }
}).createMachine({
  // Configuración de la máquina de estado
  id: "gameSetup",
  initial: "selectTableCount",
  context: {
    tableCount: 1,
    gameMode: "clásico",
    selectedTables: [],
    gameId: id, // ID por defecto para ensayos
  },
  states: {
    selectTableCount: {
      on: {
        START: {
          target: "selectGameMode",
          actions: assign({
            tableCount: ({ context, event }) => event.tableCount,
          }),
        },
      },
    },
    selectGameMode: {
      on: {
        NEXT: {
          target: "selectTables",
          actions: assign({
            gameMode: ({ context, event }) => event.gameMode,
          }),
        },
        BACK: "selectTableCount",
      },
    },
    selectTables: {
      on: {
        NEXT: {
          target: "summary",
          actions: assign({
            selectedTables: ({ context, event }) => event.selectedTables,
          }),
        },
        BACK: "selectGameMode",
      },
    },
    summary: {
      on: {
        BACK: "selectTables",
        SUBMIT: "submitting",
      },
    },
    submitting: {
      invoke: {
        src: "submitGameConfig", // Referencia al actor definido en setup
        // Pasa el contexto completo de la máquina como 'input' al actor
        // El actor lo recibirá como { input: { tableCount, gameMode, selectedTables, gameId } }
        input: ({ context }) => context,
        onDone: {
          target: "done",
        },
        onError: {
          target: "summary",
        },
      },
    },
    done: {
      type: "final",
    },
  },
});