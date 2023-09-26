import React, { useEffect, useState, useContext } from "react";
import { auth } from "../../firebase-config";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/topbar/topbar";
import { Box, Container, CssBaseline } from "@mui/material";
import "../../assets/styles/bookStyle.css";
import BookList from "../dashboard/bookList";
import GetCatalogButton from "../dashboard/catalogButton";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  increment,
  runTransaction,
} from "firebase/firestore";
import { db, fs } from "../../firebase-config";

import { AuthContextProvide } from "../../components/context/AuthenticatorContext";

export default function Dashboard() {
  const { currentUser } = useContext(AuthContextProvide);

  const [selectedCatalogId, setSelectedCatalogId] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const SelectedBook = (book) => {
    console.log(uid);
    if (uid) {
      // Construct the reference to the user's cart document with the user's UID

      const cartCollection = collection(db, "cart");
      const cartBookRef = doc(cartCollection);

      // Set the book data in the cart document
      setDoc(cartBookRef, {
        book: book.id,
        bookQty: 1,
        status: "ongoing",
        userId: currentUser.uid,
      })
        .then(() => {
          console.log("Added to cart");
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      console.log("Error: User not authenticated");
    }
  };

  return (
    <>
      <CssBaseline />
      <TopBar />
      <SideBar />
      <Box
        sx={{
          marginLeft: "200px",
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Container sx={{ marginLeft: "30px" }}>
          <GetCatalogButton
            setSelectedCatalogId={setSelectedCatalogId}
            selectedCatalogId={selectedCatalogId}
          />
          <BookList
            selectedCatalogId={selectedCatalogId}
            SelectedBook={SelectedBook} // Pass the addToCart function to the BookList component
          />
        </Container>
      </Box>
    </>
  );
}
