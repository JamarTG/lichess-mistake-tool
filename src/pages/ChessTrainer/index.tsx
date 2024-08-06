import { useState, useEffect } from "react";
import BoardManager from "./BoardManager";
import InfoDisplay from "./InfoDisplay";
import Button from "../../components/Button";
import getErrorData from "../../utils/getErrorData";
import { splitNDJSON } from "../../utils/splitNDJSON";
import {
  ERRORPNGMAP,
  STARTINGPOSFEN,
  TESTDATA,
  API_BASE_URL,
} from "../../constants";
import { ErrorData } from "../../types";
import { getNextPosition } from "../../utils/getNextPosition";
import ResultDisplay from "./ResultDisplay";
import { PuzzleResult as Result } from "../../types";



interface ChessTrainerProps {
  gameErrors: ErrorData[][]
}

const ChessTrainer: React.FC<ChessTrainerProps> = ({gameErrors}) => {
  
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
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
      <div className="flex flex-col justify-center items-center">
        <ResultDisplay puzzleResults={puzzleResults} />
        <InfoDisplay
          fen={fen}
          gameErrors={gameErrors}
          gameError={gameError}
          imageSrc={imageSrc}
          movePlayed={movePlayed}
          feedbackMessage={feedbackMessage}
        />
      </div>

      <div>
        <BoardManager
          initialFen={fen}
          setFeedbackMessage={setFeedbackMessage}
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
        />
        <Button
          text={fen !== STARTINGPOSFEN ? "Skip Puzzle" : "Start Training"}
          onClick={() => {
            setMarkerType(null);
            setMovePlayed(false)
            getNextPosition(gameErrors, currentIndex, setCurrentIndex, setFen);
          }}
        />
      </div>
    </div>
  );
};

export default ChessTrainer;
