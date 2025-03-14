// import DynamicTable from "../../../components/DynamicTable";


// const GameHistory = () => {
//   const columns = [
//     { field: "name", headerName: "Nombre de la Partida" },
//     { field: "status", headerName: "Estado" },
//     { field: "capacity", headerName: "Número de Participantes" },
//     { field: "created_at", headerName: "Fecha de Creacion"}
//   ]; 

//   const data = [
//     { name: "Partida 1", status: "Finalizado", capacity: 2, created_at: "03/03/2025" },
//     { name: "Partida 2", status: "En curso", capacity: 5, created_at: "03/03/2025"},
//     { name: "Partida 3", status: "Finalizado", capacity: 2, created_at: "03/03/2025" },
//   ];

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Historial de Partidas</h1>
//       <DynamicTable columns={columns} data={data} actions={[]} />
//     </div>
//   );
// };

// export default GameHistory;
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
  const { games, loading, error, currentPage, gamesPerPage } = useSelector((state) => state.gameHistory);
  console.log('gameHistory',games);
  useEffect(() => {
    dispatch(fetchGameHistory());
  }, [dispatch]);

  const startIndex = currentPage * gamesPerPage;

  const formattedGames = games.map(game => ({
    ...game,
    created_at: formatDate(game.created_at)
  }));
  // const selectedGames = games.slice(startIndex, startIndex + gamesPerPage);
  
  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Historial de Partidas</h1>
      <DynamicTable columns={[
        { field: "name", headerName: "Nombre de la Partida" },
        { field: "status", headerName: "Estado" },
        { field: "capacity", headerName: "Número de Participantes"},
        { field: "created_at", headerName: "Fecha de Creación",  renderCell: (row) => formatDate(row.created_at)  }
      ]} data={games} actions={[]} />

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
              currentPage < Math.ceil(games.length / gamesPerPage) - 1 ? currentPage + 1 : currentPage
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