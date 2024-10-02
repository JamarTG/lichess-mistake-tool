import formatDate from "./utils/formatDate";

export const STARTINGPOSFEN =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// export const TESTDATA = {
//   MAX_GAMES: 10,
//   USERNAME: "JamariTheGreat",
//   SINCE: new Date("2024-07-03T00:00:00Z").getTime(),
//   UNTIL: new Date("2024-08-08T00:00:00Z").getTime(),
// };

export const INITIAL_FORM_STATE = {
  username: "",
  maxNoGames: 10,
  startDate: formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
  endDate: formatDate(new Date()),
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
