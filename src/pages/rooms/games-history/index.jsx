import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameHistory } from "../../../redux/slices/gameHistorySlice";
import { fetchGameDetail, clearGameDetail } from "../../../redux/slices/game/getDetailSlice";
import DynamicTable from "../../../components/DynamicTable";
import usePagination from "../../../hooks/usePagination";
import { Link } from "react-router-dom";

const GameHistory = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.gameHistory);
  const { data: gameDetail, loading: loadingDetail } = useSelector((state) => state.gameDetail);

  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Cargar historial al montar el componente
  useEffect(() => {
    dispatch(fetchGameHistory());
  }, [dispatch]);

  // Abrir modal con detalles de partida
  const handleOpenDetail = (gameId) => {
    dispatch(fetchGameDetail(gameId));
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearGameDetail());
  };

  if (loading) return <p className="text-center mt-4">Cargando historial...</p>;
  if (error) return <p className="text-center text-red-600 mt-4">{error}</p>;

  return (
    <div className="bg-[#e8b647] mt-10 p-6 max-w-5xl mx-auto rounded-lg shadow text-gray-700">
      <h1 className="text-2xl font-bold mb-6 text-center">Historial de Partidas</h1>

      <DynamicTable
        columns={[
          { field: "name", headerName: "Nombre de la Partida" },
          { field: "status", headerName: "Estado", renderCell: (row) => {
            return <p>{row.gameUsers[0].status}</p>
          }},
          { field: "capacity", headerName: "Número de Participantes" },
          {
            field: "ver_partida",
            headerName: "Acción",
            renderCell: (row) => {
              console.log("Estado de la partida:", row?.gameUsers[0]?.status);
              if (row?.gameUsers[0]?.status === "pending" && row.status !== "completed") {
                return (
                  <Link
                    to={`/game-setup/${row.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Configurar
                  </Link>
                );
              }

              if (row?.gameUsers[0]?.status === "configured" && row.status !== "completed") {
                return (
                  <Link
                    to={`/game/${row.id}`}
                    className="text-green-600 hover:underline"
                  >
                    Ingresar
                  </Link>
                );
              }

              if (row?.gameUsers[0]?.status === "completed" || row.status === "completed") {
                return (
                  <button
                    onClick={() => handleOpenDetail(row.id)}
                    className="text-purple-600 hover:underline"
                  >
                    Ver Detalles
                  </button>
                );
              }

              return <span className="text-gray-500">No disponible</span>;
            },
          },
        ]}
        data={data}
        loading={loading}
        page={page}
        pageSize={limit}
        totalItems={total}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />

      {/* Modal de detalle de partida */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Detalles de la Partida
            </h2>

            {loadingDetail ? (
              <p className="text-center">Cargando detalles...</p>
            ) : gameDetail ? (
              <div className="text-gray-700 space-y-3">
                <p><strong>ID:</strong> {gameDetail.id}</p>
                <p><strong>Nombre:</strong> {gameDetail.name}</p>
                <p><strong>Estado:</strong> {gameDetail.status}</p>

                {gameDetail.winner ? (
                  <div className="mt-4 border-t pt-3">
                    <h3 className="font-semibold text-gray-800 mb-2">🏆 Ganador</h3>
                    <p><strong>Nombre:</strong> {gameDetail.winner.name}</p>
                    <p><strong>Email:</strong> {gameDetail.winner.email}</p>
                  </div>
                ) : (
                  <p className="text-gray-600">Sin ganador registrado.</p>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-600">No hay datos disponibles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameHistory;

