import { useNavigate } from 'react-router-dom';
import BingoTableMock from './components/BingoTableMock';
import { userTables } from './newFileMock'; 

const GameRoom = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('../Dashboard'); 
  };

  return (
    <div className="p-1 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold text-center flex-1">Sala de Juego</h1>
        <button
          onClick={handleExit}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          Salir
        </button>
      </div>    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
        {userTables.map((table, index) => (
          <div key={index}>
            <BingoTableMock card={table} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameRoom;
