import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  CSSProperties,
  useRef,
} from "react";

import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import getSquareCoordinates from "../../utils/getSqrCoords";
import { customBoardStyles, boardDimension } from "../../constants";
import { playGameSound } from "../../utils/playSound";
import { normalizeCastlingMove } from "../../utils/normalizeCastle";
import getMarkerStyles from "../../utils/getMarkerStyles";
import { ErrorData } from "../../types";
import { Arrow } from "react-chessboard/dist/chessboard/types";

type BoardProps = {
  initialFen: string;
  fen: string;
  setFen: Dispatch<SetStateAction<string>>;

  bestMove: string | undefined;
  colorToPlay: "white" | "black";
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
  colorToPlay,
  currentIndex,
  targetSquare,
  setTargetSquare,
  markerType,
  setMarkerType,
  gameError,
}) => {
  const [game, setGame] = useState<Chess>(new Chess(initialFen));
  const [boardSize, setBoardSize] = useState<number>(400); // Default size
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBoardSize = () => {
      if (boardRef.current) {
        const width = Math.min(window.innerWidth * 0.8, 500); // 80% of viewport width or up to 600px
        setBoardSize(width);
        console.log(boardSize);
      }
    };

    updateBoardSize(); // Initial size calculation
    window.addEventListener("resize", updateBoardSize); // Update size on resize

    return () => window.removeEventListener("resize", updateBoardSize);
  }, []);

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
      currentIndex,
      setFen,
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
    !!markerType
  );

  const convertMove = (moveNotation: string | undefined | null) => {
    if (null) {
      return;
    }

    const moves = game.moves({ verbose: true });
    const move = moves.find((m) => m.san === moveNotation);
    return [move?.from, move?.to, move?.from && move.to ? "red" : ""];
  };

  return (
    <div
      className="bg-red-500 flex-grow"
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    >
      <div className="relative w-full max-w-md mx-auto">
        <Chessboard
          position={fen}
          onPieceDrop={handlePieceDrop}
          boardOrientation={colorToPlay}
          customArrows={[convertMove(gameError?.move) as Arrow]}
          boardWidth={Math.min(window.innerWidth - 40, 600)} // Adjust width dynamically
        />
        {bestMoveMarker && <div style={markerStyle as CSSProperties} />}
      </div>
    </div>
  );
};

export default BoardManager;
