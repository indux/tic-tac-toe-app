import React from "react";

const Square = ({ children, updateBoard, index }) => {
  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-white rounded text-white grid place-content-center cursor-pointer"
    >
      {children}
    </div>
  );
};

export { Square };
