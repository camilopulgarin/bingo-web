import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameHistory, setCurrentPage } from "../../../redux/slices/gameHistorySlice";
import DynamicTable from "../../../components/DynamicTable";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const GameHistory = () => {
  const dispatch = useDispatch();
  const {
    games = [], // 👈 valor por defecto para evitar undefined
    loading,
    error,
    currentPage,
    gamesPerPage
  } = useSelector((state) => state.gameHistory);

  useEffect(() => {
    dispatch(fetchGameHistory());
  }, [dispatch]);

  const startIndex = currentPage * gamesPerPage;
  const selectedGames = games.slice(startIndex, startIndex + gamesPerPage);

  const formattedGames = selectedGames.map(game => ({
    ...game,
    created_at: formatDate(game.created_at)
  }));

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className=" mt-15 p-4 max-w-4xl mx-auto text-gray-600 ">
      <h1 className="text-2xl font-bold mb-4">Historial de Partidas</h1>

      <DynamicTable
        columns={[
          { field: "name", headerName: "Nombre de la Partida" },
          { field: "status", headerName: "Estado" },
          { field: "capacity", headerName: "Número de Participantes" },
          {
            field: "created_at",
            headerName: "Fecha de Creación",
            renderCell: (row) => formatDate(row.created_at)
          }
        ]}
        data={formattedGames} // ✅ usar los datos formateados
        actions={[]}
      />

      {/* Botones de paginación */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => dispatch(setCurrentPage(Math.max(currentPage - 1, 0)))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={() =>
            dispatch(setCurrentPage(
              currentPage < Math.ceil(games.length / gamesPerPage) - 1
                ? currentPage + 1
                : currentPage
            ))
          }
          disabled={startIndex + gamesPerPage >= games.length}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default GameHistory;
