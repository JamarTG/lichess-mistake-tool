import { useState } from "react";
import BoardManager from "./Board";
import InfoDisplay from "./InfoDisplay";
import { STARTINGPOSFEN } from "../../constants";
import { ErrorData } from "../../types";
import { getNextPosition } from "../../utils/getNextPosition";

interface ChessTrainerProps {
  gameErrors: ErrorData[][];
}

const ChessTrainer: React.FC<ChessTrainerProps> = ({ gameErrors }) => {
  const [fen, setFen] = useState(STARTINGPOSFEN);
  const [currentIndex, setCurrentIndex] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [targetSquare, setTargetSquare] = useState<string | null>("");
  const [markerType, setMarkerType] = useState<"best" | "wrong" | null>(null);

  const gameError = gameErrors[currentIndex.x]?.[currentIndex.y];

  const colorToPlay =
    gameErrors[currentIndex.x] &&
    (gameErrors[currentIndex.x][currentIndex.y].colorToPlay as
      | "black"
      | "white");

  const bestMove =
    gameErrors[currentIndex.x] &&
    gameErrors[currentIndex.x][currentIndex.y].evaluation.best;

  const moveToNextPuzzle = () => {
    setMarkerType(null);
    getNextPosition(gameErrors, currentIndex, setCurrentIndex, setFen);
  };

  return (
    <div className="flex flex-row-reverse justify-center items-center gap-10">
      <InfoDisplay gameError={gameError} fen={fen} />

      <BoardManager
        initialFen={fen}
        gameError={gameError}
        colorToPlay={colorToPlay}
        bestMove={bestMove}
        fen={fen}
        setFen={setFen}
        currentIndex={currentIndex}
        targetSquare={targetSquare}
        setTargetSquare={setTargetSquare}
        markerType={markerType}
        setMarkerType={setMarkerType}
      />

      <div className="flex flex-col">
        <button onClick={moveToNextPuzzle}>
          <span>
            {fen === STARTINGPOSFEN && (
              <svg viewBox="0 0 1024 1024" fill="white" width={"3em"}>
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 01-12.7-6.5V353.7a8 8 0 0112.7-6.5L656.1 506a7.9 7.9 0 010 12.9z" />
              </svg>
            )}
          </span>
        </button>

        <div className="flex justify-center gap-2 ">
          <svg fill="white" viewBox="0 0 16 16" width="3em">
            <path d="M0 12V4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2zm11.21-6.907L8.5 7.028V5.5a.5.5 0 00-.79-.407L5 7.028V5.5a.5.5 0 00-1 0v5a.5.5 0 001 0V8.972l2.71 1.935a.5.5 0 00.79-.407V8.972l2.71 1.935A.5.5 0 0012 10.5v-5a.5.5 0 00-.79-.407z" />
          </svg>
          <svg fill="white" viewBox="0 0 16 16" width="3em">
            <path d="M0 12V4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2zm4.79-6.907A.5.5 0 004 5.5v5a.5.5 0 00.79.407L7.5 8.972V10.5a.5.5 0 00.79.407L11 8.972V10.5a.5.5 0 001 0v-5a.5.5 0 00-1 0v1.528L8.29 5.093a.5.5 0 00-.79.407v1.528L4.79 5.093z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChessTrainer;
