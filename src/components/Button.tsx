import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`dark:bg-neutral-700 m-4 text-white hover:bg-blue-800 rounded-lg  text-white px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {text}
    </button>
  );
};

export default Button;
