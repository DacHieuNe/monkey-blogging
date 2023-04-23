import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "@/contexts/dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm">
          {children}
        </div>
      )}
    </>
  );
};

List.propTypes = {};

export default List;
