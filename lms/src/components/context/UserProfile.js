// UserDisplay.js

import React, { useContext, useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContextProvide } from "../context/AuthenticatorContext"; // Updated import
import { db } from "../../firebase-config";
import { Avatar, Typography } from "@mui/material";

const UserDisplay = () => {
  const { currentUser } = useContext(AuthContextProvide);
  const [email, setEmail] = useState("");
  const [fname, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          // Get the user's email from Firebase Auth
          setEmail(currentUser.email);

          const uid = currentUser.uid;
          console.log(uid);

          // Create a query to fetch the "users" collection
          const usersCollection = collection(db, "users");

          // Use "where" to filter documents by UID
          const q = query(usersCollection, where("uid", "==", uid));

          // Fetch documents that match the condition
          const querySnapshot = await getDocs(q);

          // Iterate through the documents and log their data
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log("User Data:", userData);
            setUsername(userData.fname); // Set the username
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      console.log(currentUser);
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div>
      {currentUser ? (
        <div>
          <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
          <Typography variant="h6">{fname}</Typography>
        </div>
      ) : (
        <p>Please sign in to see your email and username</p>
      )}
    </div>
  );
};

export default UserDisplay;
