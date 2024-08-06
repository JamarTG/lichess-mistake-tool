import React from "react";
import { ErrorData } from "../../types";
import {  STARTINGPOSFEN } from "../../constants";

type ColorToPlayProps = {
  fen: string;
  movePlayed: boolean;
  gameError: ErrorData;
};

const ColorToPlay: React.FC<ColorToPlayProps> = ({
  fen,
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

    </div>
  );
};

export default ColorToPlay;
