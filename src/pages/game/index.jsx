import RandomBingoTotalTable from "../../components/game/TotalBoard";
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
