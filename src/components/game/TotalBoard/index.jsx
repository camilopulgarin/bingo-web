import BingoTotalTable from "./BingoTotalTable"
import DrawnNumbersTable from "./DrawnNumbersTable"
import DrawNumberButton from "./DrawNumberButton"

export default function RandomBingoTotalTable () {
  return (
    <>    
      <div className="min-h-screen bg-[#fef3c7] flex flex-col items-center justify-center font-retro">
        <h1 className="text-5xl text-yellow-900">🎩 Bin-GO! 🎺</h1>
        <DrawNumberButton />
        {/* <BingoTotalTable /> */}
        <div className="mt-8">
          <DrawnNumbersTable />
        </div>
      </div>
    </>
  )
}
