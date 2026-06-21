import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBox = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  onSearch,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-400 rounded-lg bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200"
        {...props}
      />
    </form>
  );
};

export default SearchBox;
