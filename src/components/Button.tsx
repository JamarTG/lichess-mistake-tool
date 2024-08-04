import { MouseEventHandler } from "react";

interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = ({ text, variant, onClick }) => {
  // define a primary and secondary color
  return (
    <button
      style={{ color: variant == "primary" ? "black" : "red" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
