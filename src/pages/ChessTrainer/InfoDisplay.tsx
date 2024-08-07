import DisplayWrapper from "./DisplayWr";
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
    <DisplayWrapper className="p-10">
      <div className="flex flex-col justify-center">
        <GameError
          fen={fen}
          imageSrc={imageSrc}
          gameError={gameError}
          gameErrors={gameErrors}
        />

        <ColorToPlay fen={fen} gameError={gameError} movePlayed={movePlayed} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex gap-10">
          <button></button><img className="hover:fill-red-300" width={50} src="/svgs/ui/arrow-left.svg" alt="" />
          <img width={50} src="/svgs/ui/arrow-right.svg" alt="" />
        </div>

      
      </div>
    </DisplayWrapper>
  );
};

export default InfoDisplay;
