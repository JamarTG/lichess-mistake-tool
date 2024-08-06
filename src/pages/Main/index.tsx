import { FormEvent, useState } from "react";
import formatDate from "../../utils/formatDate";
import ChessTrainer from "../ChessTrainer";
import ParamsForm from "./ParamsForm";
import { ErrorData } from "../../types";
import { API_BASE_URL } from "../../constants";
import { splitNDJSON } from "../../utils/splitNDJSON";
import getErrorData from "../../utils/getErrorData";

const Main = () => {
  const [username, setUsername] = useState<string>("");
  const [maxNoGames, setMaxNoGames] = useState<number>(10);
  const [startDate, setStartDate] = useState<string>(formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)));
  const [endDate, setEndDate] = useState<string>(formatDate(new Date()));
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [gameErrors, setGameErrors] = useState<ErrorData[][]>([]);

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (username && maxNoGames > 0 && startDate && endDate) {
      if (start < end) {
        setFormSubmitted(true);

        try {
          const url = `${API_BASE_URL}${username}?since=${start.getTime()}&until=${end.getTime()}&max=${maxNoGames}&evals=true&analysed=true`;

          const response = await fetch(url, {
            headers: {
              Accept: "application/x-ndjson",
            },
          });

          if (!response.ok) {
            console.error(`Error ${response.status}: ${response.statusText}`);
            return;
          }

          const gamesErrorData = await splitNDJSON(response);
          console.log(gamesErrorData, "sdfs");

          if (gamesErrorData) {
            setGameErrors(
              getErrorData(
                gamesErrorData.gamesMoves,
                gamesErrorData.gamesAnalysis
              )
            );
          }
        } catch (error) {
          console.error("Error fetching games:", error);
        }
      } else {
        alert("Start date must be before end date.");
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <div>
      {username && maxNoGames && startDate && endDate && formSubmitted ? (
        <ChessTrainer gameErrors={gameErrors} />
      ) : (
        <ParamsForm
          username={username}
          setUsername={setUsername}
          maxNoGames={maxNoGames}
          setMaxNoGames={setMaxNoGames}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Main;
