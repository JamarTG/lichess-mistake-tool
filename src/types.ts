export interface Evaluation {
  eval: number;
  best?: string;
  variation?: string;
  judgment: {
    name: "Inaccuracy" | "Blunder" | "Mistake";
    comment: string;
  };
}

export interface ErrorDataWithMoves {
  moves: any;
  game_id: any;
  perf: any;
  rated: any;
  status: any;
  variant: any;
}
[];

export interface ErrorData {
  move: string;
  evaluation: Evaluation;
  fen: string;
  colorToPlay: string;
  players: Players;
  game_id: string;
  perf: string;
  rated: boolean;
  status: string;
  variant: string;
}

interface Player {
  rating: number;
  user: string;
}

export interface Players{
  white: Player;
  black: Player;
};

export interface FormData {
  username: string;
  maxNoGames: number;
  startDate: string;
  endDate: string;
}

