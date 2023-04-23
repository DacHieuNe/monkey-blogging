import React, { useContext } from "react";
import { AuthContext } from "@/contexts/auth-context";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (typeof context == "undefined") {
    throw new Error("Please wrapped inside component AuthProvider");
  }
  return context;
};

export default useAuth;
