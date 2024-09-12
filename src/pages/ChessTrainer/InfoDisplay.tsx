import React from "react";
import { ErrorData } from "../../types";
import { STARTINGPOSFEN } from "../../constants";
import Perf from "./Perf";
import Link from "./Link";
import Player from "./Player";

interface InfoDisplayProps {
  gameError: ErrorData;
  fen: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ gameError, fen }) => {
  if (fen == STARTINGPOSFEN) {
    return (
      <div
        className={
          "text-white rounded-lg p-5 flex flex-col space-y-5 w-80 h-72"
        }
      ></div>
    );
  }

  return (
    <div
      className={"text-white rounded-lg p-5 flex flex-col space-y-5 w-80 h-72 "}
    >
      <div className="rounded-lg flex flex-col gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <Perf perf={gameError.perf as "blitz" | "rapid" | "classical"} />
          <Link gameID={gameError.game_id} />
          <div className="flex justify-center items-center gap-5">
            <p>Standard</p>
            {" - "}
            <p>{gameError.rated ? "Rated" : "Casual"}</p>
          </div>
        </div>

        <Player
          white={gameError.players.white}
          black={gameError.players.black}
        />
      </div>

      <div className="flex flex-col justify-between gap-4 ">
        <div className="flex items-center">
          <p className="flex gap-3 justify-center items-center">
            <img
              src={`/svgs/pieces/${
                gameError.colorToPlay === "white" ? "wK" : "bK"
              }.svg`}
              width={80}
              alt=""
            />{" "}
            <div className="flex flex-col">
              <p className="text-xl">{gameError.move}?? was played</p>
              <p>Find the best move</p>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
