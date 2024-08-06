export const splitNDJSON = async (response: Response) => {
  if (!response.body) {
    return;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = "";
  let chunk;

  while (!(chunk = await reader.read()).done) {
    const gameInfo = decoder.decode(chunk.value, { stream: true });
    result += gameInfo;
  }

  // Split NDJSON data into individual JSON objects
  const lines = result.split("\n").filter((line) => line.trim() !== "");

  const gamesAnalysis = lines.map((line) => JSON.parse(line).analysis);
 
  const extraGameInfo = lines.map((line) => {
    const parsedLine = JSON.parse(line);
    return {
      moves: parsedLine.moves,
      game_id: parsedLine.id,
      perf: parsedLine.perf,
      rated: parsedLine.rated,
      status: parsedLine.status,
      variant: parsedLine.variant,
    };
  });

  return { gamesAnalysis, extraGameInfo };
};
