import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameHistory } from "../../../redux/slices/gameHistorySlice";
import DynamicTable from "../../../components/DynamicTable";
import usePagination from "../../../hooks/usePagination";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const GameHistory = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.gameHistory);

  const {
    data,
    total,
    page,
    limit,
    setPage,
    setLimit,
  } = usePagination({
    thunk: fetchGameHistory,
    selector: (state) => state.gameHistory,
    defaultLimit: 10,
    extraParams: {}, 
  });

  // Cargar historial al montar componente
  useEffect(() => {
    dispatch(fetchGameHistory());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-4">Cargando historial...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="bg-[#e8b647] mt-10 p-6 max-w-5xl mx-auto rounded-lg shadow text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-center">Historial de Partidas</h1>

      <DynamicTable
        columns={[
          { field: "name", headerName: "Nombre de la Partida" },
          { field: "status", headerName: "Estado" },
          { field: "capacity", headerName: "Número de Participantes" },
          {
            field: "ver_partida",
            headerName: "Acción",
            renderCell: (row) => (
              <Link
                to={`/game-setup/${row.id}`}
                className="text-blue-600 hover:underline"
              >
                Configurar
              </Link>
            ),
          }
        ]}
        data={data}
        loading={loading}
        page={page}
        pageSize={limit}
        totalItems={total}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />
    </div>
  );
};

export default GameHistory;
