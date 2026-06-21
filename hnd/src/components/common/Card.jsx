import React from "react";

const Card = ({ children, className = "", hover = false }) => {
  return (
    <div
      className={`bg-white dark:bg-dark-200 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 ${hover ? "card-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
