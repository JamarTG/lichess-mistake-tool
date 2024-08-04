export interface Evaluation {
  eval: number;
  best?: string;
  variation?: string;
  judgment: {
    name: "Inaccuracy" | "Blunder" | "Mistake";
    comment: string;
  };
}

export interface ErrorData {
  move: string;
  evaluation: Evaluation;
  fen: string;
  colorToPlay: string;
}
