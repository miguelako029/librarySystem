// AppContext.js
import React, { createContext, useReducer, useContext } from "react";

// Define your initial state
const initialState = {
  users: [], // Initialize an empty array to store user data
  // ... other state properties
};

// Define action types
export const ActionTypes = {
  RESET_FORM: "RESET_FORM",
  FETCH_USERS: "FETCH_USERS", // Add a new action type for fetching users
  // ... other action types
};

// Create a reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.RESET_FORM:
      // Handle the RESET_FORM action here
      return {
        ...state,
        // Update your state properties as needed
      };
    case ActionTypes.FETCH_USERS:
      // Handle the FETCH_USERS action by updating the users array
      return {
        ...state,
        users: action.payload, // Update users with the fetched data
      };
    // ... handle other actions
    default:
      return state;
  }
};
