import { createContext, useReducer } from "react";
import { useEffect } from "react";
import AuthenticatorReducer from "../authentication/AuthenticatorReducer";
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")),
};

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvide = ({ children }) => {
  const [state, dispatch] = useReducer(AuthenticatorReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser: state.Auth, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
