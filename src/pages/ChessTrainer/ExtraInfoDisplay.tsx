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
    <div className="rounded-lg  p-2 mb-5">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-2 text-center text-sm font-bold text-gray-700 text-bold">game</th>
            <th className="px-2 text-center text-sm font-bold text-gray-700">variant</th>
            <th className="px-2 text-center text-sm font-bold text-gray-700">rated</th>
            <th className="px-2 text-center text-sm font-bold text-gray-700">type</th>
            <th className="px-2 text-center text-sm font-bold text-gray-700">status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-1 text-center">
              <a
                style={{ color: "blue" }}
                href={`https:/lichess.org/${game_id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {game_id}
              </a>
            </td>
            <td className="px-2 py-1 text-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                {variant} ● {perf}
              </span>
            </td>
            <td className="px-2 py-1 text-center flex justify-center items-center">
                <img width={15} src={`/svgs/ui/${rated ? 'check' : 'x'}.svg`} alt="" />
            </td>
            <td className="px-2 py-1 text-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                {perf}
              </span>
            </td>
            <td className="px-2 py-1 text-center">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
                {status}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExtraInfoDisplay;
