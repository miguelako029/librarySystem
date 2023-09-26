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
  getDoc,
  increment,
  runTransaction,
} from "firebase/firestore";
import { db, fs } from "../../firebase-config";

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

  const SelectedBook = async (book) => {
    if (uid) {
      try {
        // Construct the reference to the user's cart document with the user's UID
        const cartCollection = collection(db, `cart-${uid}`);
        const cartBookRef = doc(cartCollection, book.id);

        // Extract the ID from the document reference
        const cartBookId = cartBookRef.id;
        console.log("Cart Book ID:", cartBookId);

        // Check if the document exists before setting it
        const cartBookDoc = await getDoc(cartBookRef);

        if (cartBookDoc.exists()) {
          console.log("Book is already in the cart");
        } else {
          // Set the book data in the cart document
          await setDoc(cartBookRef, {
            book: book.id,
          });
          console.log("Added to cart");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
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
