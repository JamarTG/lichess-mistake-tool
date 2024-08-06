import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  CSSProperties,
} from "react";

import playMoveWithDelay from "../../utils/playMoveWithDelay";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { ErrorData, PuzzleResult } from "../../types";
import getSquareCoordinates from "../../utils/getSqrCoords";
import { customBoardStyles, boardDimension } from "../../constants";
import { playGameSound } from "../../utils/playSound";

type BoardProps = {
  initialFen: string;
  fen: string;
  setFen: Dispatch<SetStateAction<string>>;
  setFeedbackMessage: Dispatch<SetStateAction<string>>;
  bestMove: string | undefined;
  colorToPlay: "white" | "black";
  movePlayed: boolean;
  setMovePlayed: Dispatch<SetStateAction<boolean>>;
  puzzlesResult: PuzzleResult[];
  setPuzzlesResult: Dispatch<SetStateAction<PuzzleResult[]>>;
  currentIndex: { x: number; y: number };
  targetSquare: string | null;
  setTargetSquare: Dispatch<SetStateAction<string | null>>;
  markerType: "wrong" | "best" | null;
  setMarkerType: Dispatch<SetStateAction<"wrong" | "best" | null>>;
  gameError: ErrorData;
};

const BoardManager: React.FC<BoardProps> = ({
  initialFen,
  fen,
  setFen,
  bestMove,
  setFeedbackMessage,
  colorToPlay,
  movePlayed,
  setMovePlayed,
  puzzlesResult,
  setPuzzlesResult,
  currentIndex,
  targetSquare,
  setTargetSquare,
  markerType,
  setMarkerType,
  gameError,
}) => {
  const [game, setGame] = useState<Chess>(new Chess(initialFen));

  // Reset the game state when the fen changes
  useEffect(() => {
    const newGame = new Chess(fen);
    setGame(newGame);
  }, [fen]);

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      const isBestMove = move.lan === bestMove;

      playGameSound(isBestMove);

      if (move === null || movePlayed) {
        return false;
      }

      setTargetSquare(targetSquare);
      setFeedbackMessage(`${move.san} is ${isBestMove ? "" : "in"} correct`);
      setPuzzlesResult([
        { x: currentIndex.x, y: currentIndex.y, correct: isBestMove },
        ...puzzlesResult,
      ]);
      setMarkerType(isBestMove ? "best" : "wrong");
      setFen(game.fen());
      setMovePlayed(true);

      const variationMoves = gameError.evaluation.variation!.split(" ");

      setTimeout(() => {
        if (isBestMove) {
          playMoveWithDelay(1, setMarkerType, variationMoves, game, setFen);
        } else {
          game.load(initialFen);
          setFen(initialFen);
          playMoveWithDelay(0, setMarkerType, variationMoves, game, setFen);
        }
      }, 1000);

      return true;
    },
    [
      game,
      initialFen,
      bestMove,
      movePlayed,
      currentIndex,
      puzzlesResult,
      setFen,
      setFeedbackMessage,
      setMovePlayed,
      setPuzzlesResult,
      setMarkerType,
      setTargetSquare,
    ]
  );

  const bestMoveMarker = targetSquare ? targetSquare : null;
  const bestMoveStyle = bestMoveMarker
    ? getSquareCoordinates(bestMoveMarker, boardDimension.WIDTH, colorToPlay)
    : { top: 0, left: 0, size: 0 };

  const markerStyle = bestMoveMarker
    ? {
        position: "absolute" as const,
        top: bestMoveStyle.top,
        left: bestMoveStyle.left,
        width: bestMoveStyle.size,
        height: bestMoveStyle.size,
        backgroundImage: `url("/images/${markerType}.png")`,
        backgroundSize: "50%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top right",
        pointerEvents: "none",
        zIndex: 4000,
        display: movePlayed ? "block" : "none",
      }
    : {};

  return (
    <div className="flex flex-row gap-5 justify-center items-center">
      <div
        style={{
          ...customBoardStyles,
          width: boardDimension.WIDTH,
          height: boardDimension.HEIGHT,
        }}
      >
        <Chessboard
          position={fen}
          onPieceDrop={handlePieceDrop}
          boardWidth={boardDimension.WIDTH}
          boardOrientation={colorToPlay}
        />

        {bestMoveMarker && <div style={markerStyle as CSSProperties} />}
      </div>
    </div>
  );
};

export default BoardManager;
