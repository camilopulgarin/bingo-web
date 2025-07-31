
// import { createMachine, assign, fromPromise, setup } from "xstate";
// import { patchGame } from "../../../../api/gamesApi"; // Ajusta la ruta si es necesario




// // Define la máquina de estado utilizando la función setup para las implementaciones
// export const GameSetupMachine = setup({
//   // Define tus actores (anteriormente servicios) aquí
//   actors: {
//     // 'submitGameConfig' es ahora un actor que envuelve una promesa
//     submitGameConfig: fromPromise(async ({ input }) => {
//       // En XState v5, el contexto se pasa como 'input' al actor invocado
//       const { gameId, selectedTables, gameMode } = input;
      
      
//       console.log("gameId ", gameId);
//       const payload = {
//         gameId,
//         selectedTables,
//         gameModeVote: gameMode,
//       };
//       console.log("📤 Enviando a la API:", payload);

//       // Llama a tu función de API
//       return await patchGame(gameId, payload);
//     }),

    
//   },
//   // Aquí también podrías definir acciones, guardias, etc.
//   // actions: {
//   //   myAction: ({ context }) => { /* ... */ }
//   // },
//   // guards: {
//   //   myGuard: ({ context }) => true
//   // }
// }).createMachine({
//   // Configuración de la máquina de estado
//   id: "gameSetup",
//   initial: "selectTableCount",
//   context: {
//     tableCount: 1,
//     gameMode: "clásico",
//     selectedTables: [],
//     gameId: "vvvvvvvvvv", // ID por defecto para ensayos
//   },
//   states: {
//     selectTableCount: {
//       on: {
//         START: {
//           target: "selectGameMode",
//           actions: assign({
//             tableCount: ({ context, event }) => event.tableCount,
//           }),
//         },
//       },
//     },
//     selectGameMode: {
//       on: {
//         NEXT: {
//           target: "selectTables",
//           actions: assign({
//             gameMode: ({ context, event }) => event.gameMode,
//           }),
//         },
//         BACK: "selectTableCount",
//       },
//     },
//     selectTables: {
//       on: {
//         NEXT: {
//           target: "summary",
//           actions: assign({
//             selectedTables: ({ context, event }) => event.selectedTables,
//           }),
//         },
//         BACK: "selectGameMode",
//       },
//     },
//     summary: {
//       on: {
//         BACK: "selectTables",
//         SUBMIT: "submitting",
//       },
//     },
//     submitting: {
//       invoke: {
//         src: "submitGameConfig", // Referencia al actor definido en setup
//         // Pasa el contexto completo de la máquina como 'input' al actor
//         // El actor lo recibirá como { input: { tableCount, gameMode, selectedTables, gameId } }
//         input: ({ context }) => context,
//         onDone: {
//           target: "done",
//         },
//         onError: {
//           target: "summary",
//         },
//       },
//     },
//     done: {
//       type: "final",
//     },
//   },
// });

import { createMachine, assign, fromPromise, setup } from "xstate";
import { patchGame } from "../../../../api/gamesApi";

// Este setup se mantiene, sin gameId aún
const gameSetup = setup({
  actors: {
    submitGameConfig: fromPromise(async ({ input }) => {
      const { gameId, selectedTables, gameMode } = input;

      const payload = {
        gameId,
        selectedTables,
        gameModeVote: gameMode,
      };

      console.log("📤 Enviando a la API:", payload);

      return await patchGame(gameId, payload);
    }),
  },
});

// Esta función recibe el `gameId` dinámicamente desde React
export const createGameSetupMachine = (gameId) =>
  gameSetup.createMachine({
    id: "gameSetup",
    initial: "selectTableCount",
    context: {
      gameId, // 👈 Ahora viene del componente
      tableCount: 1,
      gameMode: "clásico",
      selectedTables: [],
    },
    states: {
      selectTableCount: {
        on: {
          START: {
            target: "selectGameMode",
            actions: assign({
              tableCount: ({ event }) => event.tableCount,
            }),
          },
        },
      },
      selectGameMode: {
        on: {
          NEXT: {
            target: "selectTables",
            actions: assign({
              gameMode: ({ event }) => event.gameMode,
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
              selectedTables: ({ event }) => event.selectedTables,
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
