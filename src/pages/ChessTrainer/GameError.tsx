import React from 'react'
import { STARTINGPOSFEN } from '../../constants'
import { ErrorData } from '../../types'

interface GameErrorProps {
    gameErrors:  ErrorData[][],
    fen : string,
    gameError : ErrorData,
    imageSrc: string
}

const GameError: React.FC<GameErrorProps> = ({gameErrors, gameError, fen, imageSrc}) => {
  return (
    <h3>
    {gameErrors.length && fen !== STARTINGPOSFEN ? (
      <div
        className="flex flex-row justify-start items-center gap-5 p-2 mb-4 text-md  rounded-lg "
        role="alert"
      >
        <img src={imageSrc} width={35} alt="Error Indicator" />
        <h1>{`${gameError.move} was played in the game`}</h1>
      </div>
    ) : null}
  </h3>
  )
}

export default GameError
