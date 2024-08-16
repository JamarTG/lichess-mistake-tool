import { useState } from "react";
import BoardManager from "./BoardManager";
import InfoDisplay from "./InfoDisplay";
import { STARTINGPOSFEN } from "../../constants";
import { ErrorData } from "../../types";
import { getNextPosition } from "../../utils/getNextPosition";

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

  return (
    <div className="flex flex-row-reverse justify-center items-center gap-10">
      <InfoDisplay gameError={gameError} fen={fen} />

      <BoardManager
        initialFen={fen}
        colorToPlay={colorToPlay}
        movePlayed={movePlayed}
        setMovePlayed={setMovePlayed}
        bestMove={bestMove}
        fen={fen}
        setFen={setFen}
        currentIndex={currentIndex}
        targetSquare={targetSquare}
        setTargetSquare={setTargetSquare}
        markerType={markerType}
        setMarkerType={setMarkerType}
      />

      <p
        className="bg-blue-500 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition duration-300"
        onClick={() => {
          setMarkerType(null);
          setMovePlayed(false);
          getNextPosition(gameErrors, currentIndex, setCurrentIndex, setFen);
        }}
      >
        <span>
          {fen !== STARTINGPOSFEN ? "Continue Training" : "Start Training"}
        </span>
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-6 h-6 ml-2"
        >
          <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </p>
    </div>
  );
};

export default ChessTrainer;
