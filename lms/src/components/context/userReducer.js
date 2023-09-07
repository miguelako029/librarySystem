import React, { createContext, useReducer, useContext } from "react";

// Define your initial state
const initialState = {
  // Define your initial state properties here
};

// Create a context for your state
const AppContext = createContext();

// Create a reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case "RESET_FORM":
      // Handle the RESET_FORM action here
      return {
        ...state,
        // Update your state properties as needed
      };
    default:
      return state;
  }
};

// Create an AppProvider component to wrap your app with the context
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to access the context and dispatch function
export const useAppStore = () => {
  return useContext(AppContext);
};
