import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  textColor: string;
  bgColor: string;
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({
  text,
  textColor,
  bgColor,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`m-4 text-${textColor} hover:bg-blue-800 rounded-lg  text-white px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {text}
    </button>
  );
};

export default Button;
