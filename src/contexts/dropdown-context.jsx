import { useState } from "react";
import { createContext, useContext } from "react";

const DropdownContext = createContext();
function DropdownProvider(props) {
  const [show, setShow] = useState(false);
  const handleToggleDropdown = () => {
    setShow(!show);
  };
  const value = {
    show,
    setShow,
    handleToggleDropdown,
  };
  return (
    <DropdownContext.Provider
      value={value}
      {...props}
    ></DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined")
    throw new Error("useDropdown must be used within DropdownProvider");
  return context;
}
export { useDropdown, DropdownProvider };
