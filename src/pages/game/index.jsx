
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BingoTableMock from "./components/BingoTableMock";
import { getPlayerInfo } from "../../api/gamesApi"; 
import DrawNumberButton from "../../components/game/TotalBoard/DrawNumberButton";
import DrawnNumbersTable from "../../components/game/TotalBoard/DrawnNumbersTable";
import bingoIcon from "../../assets/bingoIcon.png";

const GameRoom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [userTables, setUserTables] = useState([]);
  const [gameMode, setGameMode] = useState("");
  const [tableCount, setTableCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Nuevo estado para mostrar/ocultar la tabla
  const [showDrawnNumbers, setShowDrawnNumbers] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getPlayerInfo(gameId);

        setUserTables(data.selected_tables || []);
        setGameMode(data.game_mode_vote || "");
        setTableCount(data.board_count || 0);

        console.log("✅ Datos recibidos:", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) fetchTables();
  }, [gameId]);

  if (loading) return <p className="text-center">⏳ Cargando tus tablas...</p>;
  if (error) return <p className="text-center text-red-500">❌ {error}</p>;

  return (
    <div className="p-1 space-y-8 relative">
     <div className="py-1 w-full max-w-screen-lg mx-auto px-2 sm:px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-center">Sala de Juego</h1>

        <div className="text-center space-y-2">
          <p>
            <strong>Modo de juego:</strong> {gameMode}
          </p>
          <p>
            <strong>Cantidad de tablas:</strong> {tableCount}
          </p>
        </div>

        <div className="fixed top-1 left-1">
          <DrawNumberButton />
        </div>
      </div>

      <div className="grid justify-center gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {userTables.length > 0 ? (
          userTables.map((table, index) => (
            <BingoTableMock 
              key={index}
              tableId={index}
              card={table}
              gameId={gameId}
            />
          ))
        ) : (
          <p className="text-center">
            No tienes tablas asignadas en esta partida.
          </p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md"
        >
          Salir
        </button>
      </div>

      {/* 🔹 Controlador para mostrar la tabla */}
      <div className="fixed bottom-1 right-1 ">
        {!showDrawnNumbers ? (
          // Botón/ícono para mostrar
          <button
            onClick={() => setShowDrawnNumbers(true)}
            className=" text-white p-3 rounded-full shadow-md"
            title="Mostrar números"
          >
            <img src={bingoIcon} className="w-20 h-20  transition-transform duration-200 hover:scale-110 "/>
          </button>
        ) : (
          // Contenedor de la tabla
          <div className="bg-white rounded-xl shadow-lg p-2 max-h-150 overflow-y-auto">
            <DrawnNumbersTable />
            <button
              onClick={() => setShowDrawnNumbers(false)}
              className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg"
            >
              Ocultar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameRoom;
