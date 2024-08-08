import { ErrorData } from "../types";

export const getNextPosition = (
  gameErrors: ErrorData[][],
  currentIndex: { x: number; y: number },
  setCurrentIndex: (index: { x: number; y: number }) => void,
  setFen: (fen: string) => void
  
) => {


  if (gameErrors.length === 0) return;

  if (currentIndex.y + 1 < gameErrors[currentIndex.x]?.length) {
    setCurrentIndex({ x: currentIndex.x, y: currentIndex.y + 1 });
    setFen(gameErrors[currentIndex.x][currentIndex.y + 1].fen);
  } else if (currentIndex.x + 1 < gameErrors.length) {
    setCurrentIndex({ x: currentIndex.x + 1, y: 0 });
    setFen(gameErrors[currentIndex.x + 1][0].fen);
  } else {
    setCurrentIndex({ x: 0, y: 0 });
    setFen(gameErrors[0][0].fen);
  }
};
