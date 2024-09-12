import React from "react";

interface PlayerProps {
  white: {
    user: string;
    rating: number;
  };
  black: {
    user: string;
    rating: number;
  };
}

const Player: React.FC<PlayerProps> = ({ white, black }) => {
  return (
    <div className="flex flex-col bg-gray-600 rounded-md p-2">
      <div className="flex justify-start items-center gap-2 rounded-full">
        <svg fill="white" viewBox="0 0 16 16" width={30}>
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
        {white.user.toLocaleLowerCase()} ({white.rating})
      </div>
      <div className="flex justify-start items-center gap-2 rounded-full">
        <svg fill="black" viewBox="0 0 16 16" width={30}>
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
        {black.user.toLocaleLowerCase()} ({black.rating})
      </div>
    </div>
  );
};

export default Player;
