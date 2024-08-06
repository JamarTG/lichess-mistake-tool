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
}) => {
  return (
    <DisplayWrapper className="grid grid-cols-10 gap-5 justify-center items-center bg-neutral-600 text-white rounded-lg mb-10">
      <GameError
        fen={fen}
        imageSrc={imageSrc}
        gameError={gameError}
        gameErrors={gameErrors}
      />

      <ColorToPlay fen={fen} gameError={gameError} movePlayed={movePlayed} />
    </DisplayWrapper>
  );
};

export default InfoDisplay;
