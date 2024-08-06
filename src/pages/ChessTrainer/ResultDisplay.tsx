import DisplayWrapper from "./DisplayWr";
import { PuzzleResult } from "../../types";

interface PuzzleResultProps {
  puzzleResults: PuzzleResult[];
}

const ResultDisplay: React.FC<PuzzleResultProps> = ({ puzzleResults }) => {
  return (
    <DisplayWrapper className="p-10 grid grid-cols-10 justify-center  bg-neutral-600 text-white rounded-lg mb-10 p-2">
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
        : "No Puzzles Attempted"}
    </DisplayWrapper>
  );
};

export default ResultDisplay;
