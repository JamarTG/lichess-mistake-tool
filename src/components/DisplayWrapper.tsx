import { ReactNode } from "react";

interface DisplayWrapperProps {
  children?: ReactNode;
  isFlex?: boolean;
}

const DisplayWrapper: React.FC<DisplayWrapperProps> = ({
  children,
  isFlex = false,
}) => {
  const flexStyles = "flex flex-row gap-5";

  return (
    <div
      style={{ height: 210, width: 300 }}
      className={`${isFlex ? flexStyles : ""} bg-neutral-600 text-white rounded-lg p-5 mb-10`}
    >
      {children}
    </div>
  );
};

export default DisplayWrapper;
