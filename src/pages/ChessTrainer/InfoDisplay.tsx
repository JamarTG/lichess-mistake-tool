import DisplayWrapper from "../../components/DisplayWrapper";
import { ErrorData } from "../../types";
import ColorToPlay from "./ColorToPlay";
import GameError from "./GameError";

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
      <GameError
        fen={fen}
        imageSrc={imageSrc}
        gameError={gameError}
        gameErrors={gameErrors}
      />

      <ColorToPlay
        fen={fen}
        gameError={gameError}
        movePlayed={movePlayed}
        feedbackMessage={feedbackMessage}
      />
    </DisplayWrapper>
  );
};

export default InfoDisplay;
