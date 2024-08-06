import { ReactNode } from "react";

interface DisplayWrapperProps {
  children?: ReactNode;
  className: string
}

const DisplayWrapper: React.FC<DisplayWrapperProps> = ({ className, children }) => {
  return (
    <div
      style={{ height: 210, width: 800 }}
      
      className={className}
    >
      {children}
    </div>
  );
};

export default DisplayWrapper;
