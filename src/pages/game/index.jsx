/* import RandomBingoTotalTable from "../../components/game/TotalBoard";
import BingoTable from "./components/BingoTable";
import GenerateButton from "./components/GenerateButton";

export default function RandomBingoTable() {
  return (
    <>
      <div className="min-h-screen bg-[#fef3c7] flex flex-col items-center justify-center space-y-6 font-retro">
        <h1 className="text-5xl text-yellow-900">🎩 Bin-GO! 🎺</h1>
        <BingoTable />
        <GenerateButton />
      </div>
      <RandomBingoTotalTable />
    </>
  );
}
 */


import BingoTableMock from './components/BingoTableMock';
import { userTables } from './newFileMock'; // Asegúrate de exportarlo bien

const GameRoom = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center">Sala de Juego</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
