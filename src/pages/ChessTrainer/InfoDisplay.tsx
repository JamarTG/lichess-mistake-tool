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
    <div className="center">
      <div>
        <h3>
          {gameErrors.length && fen !== STARTINGPOSFEN ? (
            <div>
              <img src={imageSrc} width={50} alt="Error Indicator" />
              <p>{`${gameError.move} was played`}</p>
            </div>
          ) : null}
        </h3>

        <div>
          {fen !== STARTINGPOSFEN && movePlayed ? (
            <img
              width={50}
              src={
                feedbackMessage.includes("is correct")
                  ? ERRORPNGMAP.Best
                  : ERRORPNGMAP.Wrong
              }
              alt=""
            />
          ) : null}

          <h3>{feedbackMessage}</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
