import { useState } from "react";
import BoardManager from "./BoardManager";
import InfoDisplay from "./InfoDisplay";
import { ERRORPNGMAP, STARTINGPOSFEN } from "../../constants";
import { ErrorData } from "../../types";
import { getNextPosition } from "../../utils/getNextPosition";
import { PuzzleResult as Result } from "../../types";

interface ChessTrainerProps {
  gameErrors: ErrorData[][];
}

const ChessTrainer: React.FC<ChessTrainerProps> = ({ gameErrors }) => {
  const [fen, setFen] = useState(STARTINGPOSFEN);
  const [movePlayed, setMovePlayed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [puzzleResults, setPuzzleResults] = useState<Result[]>([]);
  const [targetSquare, setTargetSquare] = useState<string | null>("");
  const [markerType, setMarkerType] = useState<"best" | "wrong" | null>(null);

  const gameError = gameErrors[currentIndex.x]?.[currentIndex.y];
  const judgmentName = gameError?.evaluation.judgment?.name;
  const imageSrc = ERRORPNGMAP[judgmentName] || "/mistake.png";
  const colorToPlay =
    gameErrors[currentIndex.x] &&
    (gameErrors[currentIndex.x][currentIndex.y].colorToPlay as
      | "black"
      | "white");
  const bestMove =
    gameErrors[currentIndex.x] &&
    gameErrors[currentIndex.x][currentIndex.y].evaluation.best;

  return (
    <div className="flex flex-row-reverse justify-center items-center gap-10">
      <div className="bg-gray-200 rounded-lg flex flex-col justify-center items-center">
        <InfoDisplay gameError={gameError} />
      </div>

      <div>
        <BoardManager
          initialFen={fen}
          colorToPlay={colorToPlay}
          movePlayed={movePlayed}
          setMovePlayed={setMovePlayed}
          bestMove={bestMove}
          fen={fen}
          setFen={setFen}
          puzzlesResult={puzzleResults}
          setPuzzlesResult={setPuzzleResults}
          currentIndex={currentIndex}
          targetSquare={targetSquare}
          setTargetSquare={setTargetSquare}
          markerType={markerType}
          setMarkerType={setMarkerType}
          gameError={gameError}
        />

        <small
          className=" cursor-pointer m-3 flex items-center text-indigo-700 border border-indigo-600 py-2 px-6 gap-2 rounded inline-flex items-center"
          onClick={() => {
            setMarkerType(null);
            setMovePlayed(false);
            getNextPosition(gameErrors, currentIndex, setCurrentIndex, setFen);
          }}
        >
          <span>
            {fen !== STARTINGPOSFEN ? "Next Puzzle" : "Start Training"}
          </span>
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 ml-2"
          >
            <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </small>
      </div>
    </div>
  );
};

export default ChessTrainer;
