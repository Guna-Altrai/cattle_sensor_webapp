import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default Card;
