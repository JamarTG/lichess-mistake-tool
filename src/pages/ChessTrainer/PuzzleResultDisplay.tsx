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
            <div className={`flex justify-center items-center p-3 rounded-md m-1 h-5  text-center bg-${puzzleResult.correct ? "blue" : "red"}-400`} key={`${puzzleResult.x}-${puzzleResult.y}`}>

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
