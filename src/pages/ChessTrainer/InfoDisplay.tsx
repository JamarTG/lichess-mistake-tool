import Button from "../../components/Button";
import DisplayWrapper from "../../components/DisplayWrapper";
import { ERRORPNGMAP, STARTINGPOSFEN } from "../../constants";
import { ErrorData } from "../../types";
import { getNextPosition } from "../../utils/getNextPosition";

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
    <DisplayWrapper>
      <h3>
        {gameErrors.length && fen !== STARTINGPOSFEN ? (
          <div
            className="w-4/5 h-12 flex flex-row justify-start items-center gap-5 p-2 mb-4 text-md  rounded-lg "
            role="alert"
          >
            <img src={imageSrc} width={40} alt="Error Indicator" />
            <h1>{`${gameError.move} was played in the game`}</h1>
          </div>
        ) : null}
      </h3>

      <div
        className={
          "w-4/5 h-12 flex flex-row justify-start items-center gap-5 p-2  text-md "
        }
        role="alert"
      >
        {/* {fen !== STARTINGPOSFEN && movePlayed ? (
          <img
            width={40}
            src={
              feedbackMessage.includes("is correct")
                ? ERRORPNGMAP.Best
                : ERRORPNGMAP.Wrong
            }
            alt=""
          />
        ) : ( */}
          <div>
            {fen != STARTINGPOSFEN ? (
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
            ) : (
              <div>No Puzzle Issued</div>
            )}
          </div>
        {/* )
        } */}

        {/* <h3>{feedbackMessage}</h3> */}
      </div>
    </DisplayWrapper>
  );
};

export default InfoDisplay;
