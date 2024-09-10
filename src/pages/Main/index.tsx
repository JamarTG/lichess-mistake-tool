import { FormEvent, useState } from "react";
import { INITIAL_FORM_STATE } from "../../constants";
import ChessTrainer from "../ChessTrainer";
import { ErrorData } from "../../types";
import { API_BASE_URL } from "../../constants";
import { splitNDJSON } from "../../utils/splitNDJSON";
import getErrorData from "../../utils/getErrorData";
import CriteriaForm from "./CriteriaForm";

const Main = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [gameErrors, setGameErrors] = useState<ErrorData[][]>([]);

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { username, maxNoGames, startDate, endDate } = formData;
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    if (!(username && maxNoGames > 0 && startDate && endDate)) {
      alert("Please fill in all fields correctly");
      return;
    }

    if (start > end) {
      alert("Start date must be before end date.");
      return;
    }

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

      if (!gamesErrorData) {
        alert("Unable to Retrieve Games");
        return;
      }

      setGameErrors(
        getErrorData(gamesErrorData.extraGameInfo, gamesErrorData.gamesAnalysis)
      );
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <>
      {formData.username &&
      formData.maxNoGames &&
      formData.startDate &&
      formData.endDate &&
      formSubmitted ? (
        <ChessTrainer gameErrors={gameErrors} />
      ) : (
        <CriteriaForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Main;
