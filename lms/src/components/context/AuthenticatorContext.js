import { createContext, useReducer, useEffect } from "react";
import AuthenticatorReducer from "../context/AuthenticatorReducer";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContextProvide = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthenticatorReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContextProvide.Provider
      value={{ currentUser: state.currentUser, dispatch }}
    >
      {children}
    </AuthContextProvide.Provider>
  );
};
