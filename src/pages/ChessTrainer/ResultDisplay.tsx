import DisplayWrapper from "./DisplayWr";
import { PuzzleResult } from "../../types";

interface PuzzleResultProps {
  puzzleResults: PuzzleResult[];
}

const ResultDisplay: React.FC<PuzzleResultProps> = ({ puzzleResults }) => {
  return (
    <DisplayWrapper className="p-30 grid grid-cols-10 justify-center  bg-neutral-100 text-white rounded-lg mb-10 p-2">
      {puzzleResults.length
        ? puzzleResults.map((puzzleResult: PuzzleResult) => (
            <div key={`${puzzleResult.x}-${puzzleResult.y}`}>
              <img
                width={20}
                src={`/images/${puzzleResult.correct ? "best" : "wrong"}.png`}
                alt="displays-puzzle-result"
              />
            </div>
          ))
        : <div style={{width:"1000%"}} className="flex justify-center items-center text-black font-bold">No Puzzles Attempted</div>}
    </DisplayWrapper>
  );
};

export default ResultDisplay;
