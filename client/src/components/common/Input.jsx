import React from "react";

const Input = ({ label, error, inputClassName, labelClassName, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          className={`text-sm font-medium text-gray-700 ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-px border bg-white text-sm transition-all focus:outline-none focus:ring-2 
        ${error ? "border-red-500 focus:ring-red-100" : "border-gray-200 focus:border-primary focus:ring-yellow-50"} ${inputClassName} `}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
