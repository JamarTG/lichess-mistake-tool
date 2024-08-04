import { Chess } from "chess.js";
import { Evaluation } from "../types";

const getErrorData = (
  gamesMoves: string[][],
  gamesAnalysis: Evaluation[][]
) => {
  // attach move played to the evaluation (bad moves are filtered by discoverGameErrors)
  return gamesMoves.map((move, index) =>
    filterGameErrors(move, gamesAnalysis[index])
  );
};

const filterGameErrors = (moves: string[], evaluation: Evaluation[]) => {
  const game = new Chess();

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
            move: move,
            evaluation: evaluation[index],
            fen: positionFenBeforeMove,
            colorToPlay: colorToPlay === "w" ? "white" : "black",
          }
        : null;
    })
    .filter((entry) => entry !== null);
};

export default getErrorData;
