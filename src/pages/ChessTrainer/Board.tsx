import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { PuzzleResult } from "../../types";

type BoardProps = {
  initialFen: string;
  fen: string;
  setFen: Dispatch<SetStateAction<string>>;
  setFeedbackMessage: Dispatch<SetStateAction<string>>;
  bestMove: string | undefined;
  colorToPlay: "white" | "black";
  movePlayed: boolean,
  setMovePlayed: Dispatch<SetStateAction<boolean>>;
  puzzlesResult: PuzzleResult[];
  setPuzzlesResult: Dispatch<SetStateAction<PuzzleResult[]>>;
  currentIndex: { x: number; y: number };
};

const Board: React.FC<BoardProps> = ({
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
}) => {
  const [game, setGame] = useState<Chess>(new Chess(initialFen));

  // reset the fen when the fen changes
  useEffect(() => {
    const newGame = new Chess(initialFen);
    setGame(newGame);
  }, [fen]);

  const handlePieceDrop = useCallback(
    (sourceSquare: string, targetSquare: string) => {
      if(movePlayed) {
        return
      }
     
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      

      if (move.lan !== bestMove) {
        setFeedbackMessage(`${move.san} is incorrect`);
        setPuzzlesResult([
          { x: currentIndex.x, y: currentIndex.y, correct: false },
          ...puzzlesResult,
        ]);
      
      } else {
        setFeedbackMessage(`${move.san} is correct`);
        setPuzzlesResult([
          { x: currentIndex.x, y: currentIndex.y, correct: true },
          ...puzzlesResult,
        ]);
      }

      if (move === null) {
        return false;
      }

      setFen(game.fen());
      setGame(new Chess(game.fen()));
      setMovePlayed(true);

      return true;
    },
    [game, setFen]
  );

  return (
    <Chessboard
      customArrows={
        bestMove && movePlayed
          ? [
              [
                bestMove.slice(0, 2) as Square,
                bestMove.slice(2, 4) as Square,
                "green",
              ],
            ]
          : []
      }
      position={fen}
      onPieceDrop={handlePieceDrop}
      boardWidth={500}
      boardOrientation={colorToPlay}
    />
  );
};

export default Board;
