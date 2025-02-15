import DynamicTable from "../../../components/DynamicTable";


const GameHistory = () => {
  const columns = [
    { field: "gameName", headerName: "Nombre de la Partida" },
    { field: "status", headerName: "Estado" },
    { field: "participants", headerName: "Número de Participantes" },
    { field: "result", headerName: "Resultado" },
    { field: "creator", headerName: "Creador" },
  ];

  const data = [
    { gameName: "Partida 1", status: "Finalizado", participants: 2, result: "Ganado", creator: "Juan Pérez" },
    { gameName: "Partida 2", status: "En curso", participants: 5, result: "-", creator: "Ana López" },
    { gameName: "Partida 3", status: "Finalizado", participants: 2, result: "Perdido", creator: "Carlos Gómez" },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Historial de Partidas</h1>
      <DynamicTable columns={columns} data={data} actions={[]} />
    </div>
  );
};

export default GameHistory;