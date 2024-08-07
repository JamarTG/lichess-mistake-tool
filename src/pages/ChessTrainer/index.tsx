import { SetStateAction, useState } from "react";
import BoardManager from "./BoardManager";
import InfoDisplay from "./InfoDisplay";
import Button from "../../components/Button";
import { ERRORPNGMAP, STARTINGPOSFEN } from "../../constants";
import { ErrorData } from "../../types";
import { getNextPosition } from "../../utils/getNextPosition";
import { PuzzleResult as Result } from "../../types";
import ExtraInfoDisplay from "./ExtraInfoDisplay";

interface ChessTrainerProps {
  gameErrors: ErrorData[][];
}

const ChessTrainer: React.FC<ChessTrainerProps> = ({ gameErrors }) => {
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
      <div>
    
        {gameError ? (
          <ExtraInfoDisplay
            game_id={gameError.game_id}
            perf={gameError.perf}
            rated={gameError.rated}
            status={gameError.status}
            variant={gameError.variant}
          />
        ) : null}

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
          gameError={gameError}
        
        />
       
        <Button
          text={fen !== STARTINGPOSFEN ? "Next Puzzle" : "Start Training"}
          onClick={() => {
            setMarkerType(null);
            setMovePlayed(false);
            getNextPosition(gameErrors, currentIndex, setCurrentIndex, setFen);
          }}
        />
      </div>
    </div>
  );
};

export default ChessTrainer;
