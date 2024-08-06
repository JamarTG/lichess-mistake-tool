import { ReactNode } from "react";

interface DisplayWrapperProps {
  children?: ReactNode;
  isFlex?: boolean;
}

const DisplayWrapper: React.FC<DisplayWrapperProps> = ({ children }) => {
  return (
    <div
      style={{ height: 210, width: 800 }}
      className={`grid grid-col-10 gap-5 justify-center items-center bg-neutral-600 text-white rounded-lg mb-10`}
    >
      {children}
    </div>
  );
};

export default DisplayWrapper;
