import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-5 hover:text-green-500 rounded-lg text-lg text-green-800 px-5 py-2.5 text-center inline-flex items-center me-2 `}
    >
      {text}
    </button>
  );
};

export default Button;
