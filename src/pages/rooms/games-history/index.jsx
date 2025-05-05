import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameHistory, setCurrentPage } from "../../../redux/slices/gameHistorySlice";
import DynamicTable from "../../../components/DynamicTable";
import usePagination from "../../../hooks/usePagination";

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
    //data = [], // 👈 valor por defecto para evitar undefined
    loading,
    error,
    currentPage,
    gamesPerPage
  } = useSelector((state) => state.gameHistory);

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
    extraParams: {}, // puedes pasar filtros, búsqueda, etc.
  });

  useEffect(() => {
    dispatch(fetchGameHistory());
  }, [dispatch]);

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto text-gray-600 ">
      <h1 className="text-2xl font-bold mb-4">Historial de Partidas</h1>

      <DynamicTable
        columns={[
          { field: "name", headerName: "Nombre de la Partida" },
          { field: "status", headerName: "Estado" },
          { field: "capacity", headerName: "Número de Participantes" },
          {
            field: "created_at",
            headerName: "Fecha de Creación",
            renderCell: (row) => formatDate(row?.created_at)
          }
        ]}
        data={data} // ✅ usar los datos formateados
        actions={[]}
        page={page}
        pageSize={limit}
        totalItems={total}
        loading={loading}
        onPageChange={setPage}
        onLimitChange={setLimit}
      />
    </div>
  );
};

export default GameHistory;
