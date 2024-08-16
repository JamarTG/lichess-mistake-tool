import { Chess } from "chess.js";
import { ErrorData, Evaluation } from "../types";

const getErrorData = (extraGameInfo: any, gamesAnalysis: Evaluation[][]) => {
  const data = extraGameInfo.map((extraInfo: any, index: number) => {
  
    return extraInfo.variant === "standard"
      ? filterGameErrors(extraInfo, gamesAnalysis[index])
      : null
  }).filter((entry: any) => entry !== null);

  return data;
};

const filterGameErrors = (
  extraGameInfo: any,
  evaluation: Evaluation[]
): ErrorData[] => {
  const game = new Chess();

  const moves = extraGameInfo.moves.split(" ");

  return moves
    .map(function (move: string, index: number) {
      // capture position and color to play before making move
      const positionFenBeforeMove = game.fen();
      const colorToPlay = game.turn();

      game.move(move);
      // filter the bad moves (inaccuracies, mistakes and blunders)
      const moveIsBad = evaluation[index]?.judgment;

      return moveIsBad
        ? {
            game_id: extraGameInfo.game_id,
            players: {
              white: {
                rating: extraGameInfo.players.white.rating,
                user: extraGameInfo.players.white.user.name,
              },
              black: {
                rating: extraGameInfo.players.black.rating,
                user: extraGameInfo.players.black.user.name,
              },
            },
            variant: extraGameInfo.variant,
            perf: extraGameInfo.perf,
            status: extraGameInfo.status,
            rated: extraGameInfo.rated,
            move: move,
            evaluation: evaluation[index],
            fen: positionFenBeforeMove,
            colorToPlay: colorToPlay === "w" ? "white" : "black",
          }
        : null;
    })
    .filter((entry: any) => entry !== null) as ErrorData[];
};

export default getErrorData;
