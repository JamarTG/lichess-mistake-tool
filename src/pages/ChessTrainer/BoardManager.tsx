import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  CSSProperties,
} from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import getSquareCoordinates from "../../utils/getSqrCoords";
import { customBoardStyles, boardDimension } from "../../constants";
import { playGameSound } from "../../utils/playSound";
import { normalizeCastlingMove } from "../../utils/normalizeCastle";
import getMarkerStyles from "../../utils/getMarkerStyles";

type BoardProps = {
  initialFen: string;
  fen: string;
  setFen: Dispatch<SetStateAction<string>>;

  bestMove: string | undefined;
  colorToPlay: "white" | "black";
  movePlayed: boolean;
  setMovePlayed: Dispatch<SetStateAction<boolean>>;
  currentIndex: { x: number; y: number };
  targetSquare: string | null;
  setTargetSquare: Dispatch<SetStateAction<string | null>>;
  markerType: "wrong" | "best" | null;
  setMarkerType: Dispatch<SetStateAction<"wrong" | "best" | null>>;
};

const BoardManager: React.FC<BoardProps> = ({
  initialFen,
  fen,
  setFen,
  bestMove,
  colorToPlay,
  movePlayed,
  setMovePlayed,
  currentIndex,
  targetSquare,
  setTargetSquare,
  markerType,
  setMarkerType,
}) => {
  const [game, setGame] = useState<Chess>(new Chess(initialFen));

  useEffect(() => {
    const newGame = new Chess(fen);
    setGame(newGame);
  }, [fen]);

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      const move = attemptMove(sourceSquare, targetSquare);

      if (!move) return false;

      const isBestMove = checkBestMove(move);

      playGameSound(isBestMove);
      updateGameState(targetSquare, isBestMove);
      isBestMove ? null : resetBoardAfterDelay();

      return true;
    },
    [
      game,
      initialFen,
      bestMove,
      movePlayed,
      currentIndex,
      setFen,
      setMovePlayed,
      setMarkerType,
      setTargetSquare,
    ]
  );

  const attemptMove = (sourceSquare: string, targetSquare: string) => {
    return game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
  };

  const checkBestMove = (move: any) => {
    return (
      normalizeCastlingMove(move.lan) ===
      normalizeCastlingMove(bestMove as string)
    );
  };

  const updateGameState = (targetSquare: string, isBestMove: boolean) => {
    setTargetSquare(targetSquare);
    setMarkerType(isBestMove ? "best" : "wrong");
    setFen(game.fen());
    setMovePlayed(true);
  };

  const resetBoardAfterDelay = () => {
    setTimeout(() => {
      game.load(initialFen);
      setFen(initialFen);
      setMarkerType(null);
      // const variationMoves = gameError.evaluation.variation!.split(" ");
      // playMoveWithDelay(0, setMarkerType, variationMoves, game, setFen);
    }, 1000);
  };

  const bestMoveMarker = targetSquare ? targetSquare : null;
  const bestMoveStyle = bestMoveMarker
    ? getSquareCoordinates(bestMoveMarker, boardDimension.WIDTH, colorToPlay)
    : { top: 0, left: 0, size: 0 };

  const markerStyle = getMarkerStyles(
    bestMoveMarker,
    bestMoveStyle,
    markerType,
    movePlayed
  );

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
