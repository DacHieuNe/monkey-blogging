import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "@/contexts/dropdown-context";

const Select = ({ placeholder, children, className = "" }) => {
  const { show, handleToggleDropdown } = useDropdown();
  return (
    <div className="relative inline-block w-full">
      <div
        className={`flex items-center justify-between py-[15px] px-[25px] bg-[#E7ECF3] rounded-lg cursor-pointer font-medium ${className}`}
        onClick={handleToggleDropdown}
      >
        <span>{placeholder}</span>
        <span>
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </span>
      </div>
      {children}
    </div>
  );
};

Select.propTypes = {};

export default Select;
