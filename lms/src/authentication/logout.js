import React, { useContext } from "react";
import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { AuthContextProvide } from "../components/context/AuthenticatorContext"; // Adjust the import path

const LogoutButton = () => {
  const { dispatch } = useContext(AuthContextProvide); // Access the dispatch function from the context

  const handleLogout = async () => {
    try {
      const auth = getAuth(); // Get the authentication instance
      await signOut(auth); // Sign out the user
      dispatch({ type: "LOGOUT" }); // Dispatch an action to clear user data from context
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Logout error:", error);
    }
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
