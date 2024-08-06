import DisplayWrapper from "../../components/DisplayWrapper";
import { PuzzleResult } from "../../types";

interface PuzzleResultProps {
  puzzleResults: PuzzleResult[];
}

const ResultDisplay: React.FC<PuzzleResultProps> = ({ puzzleResults }) => {
  return (
    <DisplayWrapper isFlex>
      {puzzleResults.length
        ? puzzleResults.map((puzzleResult: PuzzleResult) => (
            <div className="m-1" key={`${puzzleResult.x}-${puzzleResult.y}`}>
              <img
                width={40}
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
