import { useState, useEffect } from "react";
import Board from "./Board";
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
import PuzzleResultDisplay from "./PuzzleResultDisplay";
import { PuzzleResult as Result } from "../../types";

const { USERNAME, SINCE, UNTIL, MAX_GAMES } = TESTDATA;

const ChessTrainer = () => {
  const [gameErrors, setGameErrors] = useState<ErrorData[][]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [fen, setFen] = useState(STARTINGPOSFEN);
  const [movePlayed, setMovePlayed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [puzzleResults, setPuzzleResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchGamesByUser = async (
      username: string,
      since: number,
      until: number,
      maxGames: number
    ) => {
      try {
        const url = `${API_BASE_URL}${username}?since=${since}&until=${until}&max=${maxGames}&evals=true&analysed=true`;

        const response = await fetch(url, {
          headers: {
            Accept: "application/x-ndjson",
          },
        });

        if (!response.ok) {
          console.error(`Error ${response.status}: ${response.statusText}`);
          return;
        }

        const gamesErrorData = await splitNDJSON(response);

        if (gamesErrorData) {
          setGameErrors(
            getErrorData(
              gamesErrorData.gamesMoves,
              gamesErrorData.gamesAnalysis
            )
          );
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGamesByUser(USERNAME, SINCE, UNTIL, MAX_GAMES);
  }, []);

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
        <PuzzleResultDisplay puzzleResults={puzzleResults} />
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
        <Board
          initialFen={fen}
          setFeedbackMessage={setFeedbackMessage}
          colorToPlay={colorToPlay}
          setMovePlayed={setMovePlayed}
          bestMove={bestMove}
          fen={fen}
          setFen={setFen}
          puzzlesResult={puzzleResults}
          setPuzzlesResult={setPuzzleResults}
          currentIndex={currentIndex}
        />
        <Button
          text="Next Puzzle"
         
          onClick={() =>
            getNextPosition(gameErrors, currentIndex, setCurrentIndex, setFen)
          }
        />
      </div>
    </div>
  );
};

export default ChessTrainer;
