import { ReactNode } from "react";

interface DisplayWrapperProps {
  children?: ReactNode;
  className?: string;
}

const DisplayWrapper: React.FC<DisplayWrapperProps> = ({
  className,
  children,
}) => {
  return <div className={className}>{children}</div>;
};

export default DisplayWrapper;
