import React from "react";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  className = "",
  placeholder = "Select...",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 dark:border-dark-400 rounded-lg bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 appearance-none"
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
