import { ReactNode } from "react";

interface DisplayWrapperProps {
  children?: ReactNode;
  className?: string;
}

const DisplayWrapper: React.FC<DisplayWrapperProps> = ({
  className,
  children,
}) => {
  return <div style={{width:600, height:200}} className={className}>{children}</div>;
}

export default DisplayWrapper;
