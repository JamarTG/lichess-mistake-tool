interface LinkProps {
  gameID: string;
}
const Link: React.FC<LinkProps> = ({ gameID }) => {
  return (
    <p className="flex gap-1">
      <a
        href={`https://lichess.org/${gameID}`}
        target="_blank"
        className="text-blue-300"
        rel="noopener noreferrer"
      >
        {gameID}
      </a>
    </p>
  );
};

export default Link;
