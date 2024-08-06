import React from "react";
import { ErrorData } from "../../types";
import { ERRORPNGMAP, STARTINGPOSFEN } from "../../constants";

type ColorToPlayProps = {
  fen: string;
  movePlayed: boolean;
  feedbackMessage: string;
  gameError: ErrorData;
};

const ColorToPlay: React.FC<ColorToPlayProps> = ({
  fen,
  movePlayed,
  feedbackMessage,
  gameError,
}) => {

  const trainingHasStarted = fen === STARTINGPOSFEN;

  return (
    <div
      className={
        "w-4/5 h-12 flex flex-row justify-start items-center gap-5 p-2 text-md"
      }
      role="alert"
    >
      {!trainingHasStarted && movePlayed ? (
        <img
          width={40}
          src={
            feedbackMessage.includes("is correct")
              ? ERRORPNGMAP.Best
              : ERRORPNGMAP.Wrong
          }
          alt=""
        />
      ) : (
        <div>
          {!trainingHasStarted ? (
            <div className="flex justify-start items-center gap-5">
              <img
                width={40}
                src={
                  gameError && gameError.colorToPlay === "white"
                    ? "/svgs/pieces/wK.svg"
                    : "/svgs/pieces/bK.svg"
                }
                alt=""
              />
              <h3>
                Find the best move for{" "}
                {gameError &&
                  gameError.colorToPlay[0].toUpperCase() +
                    gameError.colorToPlay.substring(1)}{" "}
              </h3>
            </div>
          ) : (
            <div>No Puzzles Attempted</div>
          )}
        </div>
      )}
      <h3>{feedbackMessage}</h3>
    </div>
  );
};

export default ColorToPlay;

