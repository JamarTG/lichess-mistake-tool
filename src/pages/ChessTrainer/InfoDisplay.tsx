import React from "react";
import { ErrorData } from "../../types";

interface InfoDisplayProps {
  gameError: ErrorData;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ gameError }) => {
  if (!gameError) {
    return <div className="bg-white rounded-lg p-5 flex flex-col space-y-5 w-80 h-72">loading....</div>;
  }
  return (
    <div className="bg-white rounded-lg p-5 flex flex-col space-y-5 w-80 h-72">
      <div className="rounded-lg ">
        <p>
          <a
            href={`https://lichess.org/${gameError.game_id}`}
            target="_blank"
            className="text-red-600"
            rel="noopener noreferrer"
          >
            {gameError.game_id}
          </a>
        </p>
        <p className="inline-block text-center bg-blue-100 text-blue-800 text-xs my-1 font-medium px-3 py-1 rounded-lg  dark:text-blue-400 border border-blue-400">
          {gameError.variant} • {gameError.rated ? "rated" : "casual"} •{" "}
          {gameError.perf}
        </p>
        <p>
          {gameError.players.white.user.toLocaleLowerCase()} (
          {gameError.players.white.rating}) vs{" "}
          {gameError.players.black.user.toLocaleLowerCase()} (
          {gameError.players.black.rating})
        </p>
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
