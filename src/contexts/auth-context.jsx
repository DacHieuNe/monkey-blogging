import { auth, db } from "@/firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState(1);
  const value = {
    userInfo,
    setUserInfo,
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUserInfo(user);
        return;
      }
      const docRef = doc(db, "users", user.uid);
      onSnapshot(docRef, (docData) => {
        setUserInfo({
          ...user,
          ...docData.data(),
        });
      });
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};
