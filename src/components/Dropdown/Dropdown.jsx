import React, { useState } from "react";
import { DropdownProvider } from "@/contexts/dropdown-context";

const Dropdown = ({ children, ...props }) => {
  return <DropdownProvider {...props}>{children}</DropdownProvider>;
};

export default Dropdown;
