import React from "react";

const Turn = ({ children, isSelected, updateBoard, index }) => {
  const className = `border border-white rounded text-white p-4 ${
    isSelected ? "border-[#00704A] bg-[#00704A]" : ""
  }`;

  return (
    <div className="grid place-content-center">
      <div className={className}>{children}</div>
    </div>
  );
};

export { Turn };
