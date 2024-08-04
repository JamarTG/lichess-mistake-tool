import DisplayWrapper from "../../components/DisplayWrapper";
import { PuzzleResult } from "../../types";

interface PuzzleResultProps {
  puzzleResults: PuzzleResult[];
}

const PuzzleResultDisplay: React.FC<PuzzleResultProps> = ({
  puzzleResults,
}) => {
  return (
    <DisplayWrapper isFlex>
      {puzzleResults.length
        ? puzzleResults.map((puzzleResult: PuzzleResult) => (
            <div className="m-1" key={`${puzzleResult.x}-${puzzleResult.y}`}>

              <img
                width={20}
                src={`/svgs/ui/${puzzleResult.correct ? "check" : "x"}.svg`}
                alt="displays-puzzle-result"
              />
            </div>
          ))
        : "No Puzzles Attempted"}
    </DisplayWrapper>
  );
};

export default PuzzleResultDisplay;
