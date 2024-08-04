import { ERRORPNGMAP, STARTINGPOSFEN } from "../../constants";
import { ErrorData } from "../../types";

interface InfoDisplayProps {
  fen: string;
  gameErrors: ErrorData[][];
  gameError: ErrorData;
  imageSrc: string;
  movePlayed: boolean;
  feedbackMessage: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({
  fen,
  gameErrors,
  gameError,
  imageSrc,
  movePlayed,
  feedbackMessage,
}) => {
  return (
    <div>
      <h3>
        {gameErrors.length && fen !== STARTINGPOSFEN ? (
          <div
            className="w-4/5 h-12 flex flex-row justify-start items-center gap-5 p-2 mb-4 text-md  rounded-lg dark:bg-gray-800 dark:text-white"
            role="alert"
          >
            <img src={imageSrc} width={40} alt="Error Indicator" />
            <p>{`${gameError.move} was played`}</p>
          </div>
        ) : null}
      </h3>

      <div
        className="w-4/5 h-12 flex flex-row justify-start items-center gap-5 p-2 mb-4 text-md  rounded-md  dark:bg-gray-800 dark:text-white"
        role="alert"
      >
        {fen !== STARTINGPOSFEN && movePlayed ? (
          <img
            width={40}
            src={
              feedbackMessage.includes("is correct")
                ? ERRORPNGMAP.Best
                : ERRORPNGMAP.Wrong
            }
            alt=""
          />
        ) : (
          <div className="flex justify-start items-center gap-5">
            <img
              width={40}
              src={
                gameError &&
                fen != STARTINGPOSFEN &&
                gameError.colorToPlay === "white"
                  ? "/wK.svg"
                  : "/bK.svg"
              }
              alt=""
            />
            <h2>Find The Solution . . .</h2>
          </div>
        )}

        <h3>{feedbackMessage}</h3>
      </div>
    </div>
  );
};

export default InfoDisplay;
