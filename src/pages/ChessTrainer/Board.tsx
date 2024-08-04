import React, {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { PuzzleResult } from "../../types";


type BoardProps = {
  initialFen: string;
  fen: string;
  setFen: Dispatch<SetStateAction<string>>;
  setFeedbackMessage: Dispatch<SetStateAction<string>>;
  bestMove: string | undefined;
  colorToPlay: "white" | "black";
  setMovePlayed: Dispatch<SetStateAction<boolean>>;
  puzzlesResult : PuzzleResult[],
  setPuzzlesResult : Dispatch<SetStateAction<PuzzleResult[]>>;
  currentIndex : {x : number, y:number}
};

const Board: React.FC<BoardProps> = ({
  initialFen,
  fen,
  setFen,
  bestMove,
  setFeedbackMessage,
  colorToPlay,
  setMovePlayed,
  puzzlesResult,
  setPuzzlesResult,
  currentIndex
}) => {
  const [game, setGame] = useState<Chess>(new Chess(initialFen));

  // reset the fen when the fen changes
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

      if (move.lan !== bestMove) {
        setFeedbackMessage(`${move.san} is incorrect`);
        setPuzzlesResult([{x : currentIndex.x, y: currentIndex.y, correct: false},...puzzlesResult])
        setFen(initialFen);
      
      } else {
        setFeedbackMessage(`${move.san} is correct`);
        setPuzzlesResult([{x : currentIndex.x, y: currentIndex.y, correct: true},...puzzlesResult])
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
      position={fen}
      onPieceDrop={handlePieceDrop}
      boardWidth={500}
      boardOrientation={colorToPlay}
    />
  );
};

export default Board;
