import { createMachine, assign, fromPromise, setup } from "xstate";
import { patchGame } from "../../../../api/gamesApi";

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

export const createGameSetupMachine = (gameId) =>
  gameSetup.createMachine({
    id: "gameSetup",
    initial: "selectTableCount",
    context: {
      gameId,
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
            target: "waitingRedirect",
          },
          onError: {
            target: "summary",
          },
        },
      },
      waitingRedirect: {
        after: {
          2000: { target: "redirecting" },
        },
      },
      redirecting: {
        type: "final",
      },
    },
  });
