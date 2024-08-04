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
    <div className="mb-9 mt-8">
      <h3>
        {gameErrors.length && fen !== STARTINGPOSFEN ? (
          <div
            className="w-4/5 h-12 flex flex-row justify-start items-center gap-5 p-2 mb-4 text-md  rounded-lg dark:text-black"
            role="alert"
          >
            <img src={imageSrc} width={40} alt="Error Indicator" />
            <h1>{`${gameError.move} was played`}</h1>
          </div>
        ) : null}
      </h3>

      <div
        className={
          "w-4/5 h-12 flex flex-row justify-start items-center gap-5 p-2  text-md "
        }
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
          <div>
            {fen != STARTINGPOSFEN && (
              <div className="flex justify-start items-center gap-5">
                <img
                  width={40}
                  src={
                    gameError &&
                    fen != STARTINGPOSFEN &&
                    gameError.colorToPlay === "white"
                      ? "/svgs/pieces/wK.svg"
                      : "/svgs/pieces/bK.svg"
                  }
                  alt=""
                />

                <h3>
                  Find the best move for{" "}
                  {gameError &&
                    gameError.colorToPlay[0].toUpperCase() +
                      gameError.colorToPlay.substring(1)}{" "}
                </h3>
              </div>
            )}
          </div>
        )}

        <h3>{feedbackMessage}</h3>
      </div>
    </div>
  );
};

export default InfoDisplay;
