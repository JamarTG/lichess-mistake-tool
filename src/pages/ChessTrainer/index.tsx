import { useState } from "react";
import BoardManager from "./Board";
import InfoDisplay from "./InfoDisplay";
import { STARTINGPOSFEN } from "../../constants";
import { ErrorData } from "../../types";
import { getNextPosition } from "../../utils/getNextPosition";
import React from "react";

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
    <div >
      {/* <InfoDisplay gameError={gameError} fen={fen} /> */}
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

     
    </div>
  );
};

export default ChessTrainer;
