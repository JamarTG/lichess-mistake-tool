import React from "react";

interface ExtraInfoDisplayProps {
  game_id: string;
  perf: string;
  rated: boolean;
  status: string;
  variant: string;
}

const ExtraInfoDisplay: React.FC<ExtraInfoDisplayProps> = ({
  game_id,
  perf,
  rated,
  status,
  variant,
}) => {
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Game Information</h2>
      <div className="space-y-2">
        <div>
          <a href={`https:/lichess.org/${game_id}`} target="_blank">Game</a>
        </div>
        <div>
          <span className="font-bold">Type:</span> {perf}
        </div>
        <div>
          <span className="font-bold">Rated:</span> {rated ? "Yes" : "No"}
        </div>
        <div>
          <span className="font-bold">Status:</span> {status}
        </div>
        <div>
          <span className="font-bold">Variant:</span> {variant}
        </div>
      </div>
    </div>
  );
};

export default ExtraInfoDisplay;
