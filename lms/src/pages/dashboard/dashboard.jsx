import React, { useEffect, useState } from "react";
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
  increment,
  runTransaction,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase-config";

export default function Dashboard() {
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
    const auth = getAuth(); // Initialize the authentication module

    if (auth.currentUser) {
      // Construct the reference to the user's cart document
      const cartCollectionName = `cart_${auth.currentUser.uid}`;
      const cartCollection = collection(db, cartCollectionName);
      console.log("Cart Collection Name:", cartCollectionName);

      // Update the cart with the selected book using 'setDoc'
      // Here, we are setting the product ID as the document key and value as true
      const cartDocRef = doc(cartCollection, book); // Create the document reference
      setDoc(cartDocRef, {
        [book.id]: true,
      })
        .then(() => {
          console.log("Added to cart");
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
          console.log(cartCollectionName);
        });
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
