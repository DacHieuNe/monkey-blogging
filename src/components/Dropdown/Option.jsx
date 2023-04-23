import React from "react";
import { useDropdown } from "@/contexts/dropdown-context";

const Option = ({ onClick, children }) => {
  const { setShow } = useDropdown();
  const handleClickOption = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="py-[15px] px-[25px] cursor-pointer flex items-center justify-between hover:bg-gray-100"
      onClick={handleClickOption}
    >
      {children}
    </div>
  );
};

export default Option;
