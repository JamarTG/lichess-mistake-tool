export const ERRORPNGMAP = {
  Inaccuracy: "/images/inaccuracy.png",
  Blunder: "/images/blunder.png",
  Mistake: "/images/mistake.png",
  Best: "/images/best.png",
  Wrong: "/images/wrong.png",
};

export const STARTINGPOSFEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const TESTDATA = {
  MAX_GAMES: 10,
  USERNAME: "JamariTheGreat",
  SINCE: new Date("2024-07-03T00:00:00Z").getTime(),
  UNTIL: new Date("2024-08-03T00:00:00Z").getTime(),
};

export const API_BASE_URL = "https://lichess.org/api/games/user/";

export const customBoardStyles = {
  borderRadius: "5px",
  boxShadow: "0 15px 15px rgba(0,0,0,0.3)",
  position: "relative" as const,
};

export const boardDimension = {
  HEIGHT: 500,
  WIDTH: 500,
};
