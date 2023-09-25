import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase-config"; // Import Firebase auth and firestore from your firebase-config file
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/topbar/topbar";
import { Box, Container, CssBaseline } from "@mui/material";
import "../../assets/styles/bookStyle.css";

import BookList from "../dashboard/bookList"; // Import the BookList component
import GetCatalogButton from "../dashboard/catalogButton"; // Import the GetCatalogButton component

import { collection, getFirestore, doc, setDoc } from "firebase/firestore";

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

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const SelectedBook = (book) => {
    if (uid) {
      const Book = { ...book };
      Book.BookCount = book.bookTotal - 1;

      // Use Firestore to add the document directly to the collection
      const cartCollection = collection(db, "cart" + uid);
      const cartDoc = doc(cartCollection, book.id);

      setDoc(cartDoc, Book)
        .then(() => {
          console.log("added to cart");
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    }
  };

  return (
    <>
      <CssBaseline /> {/* Reset default styles */}
      <TopBar />
      <SideBar />
      <Box
        sx={{
          marginLeft: "200px",
          marginTop: "30px",
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          // minHeight: '60vh', // Take the full height of the viewport
          p: 3,
        }}
      >
        <Container sx={{ marginLeft: "30px" }}>
          {/* Use the GetCatalogButton component here and pass selectedCatalogId as a prop */}
          <GetCatalogButton
            setSelectedCatalogId={setSelectedCatalogId}
            selectedCatalogId={selectedCatalogId}
          />

          {/* Use the BookList component here */}
          <BookList
            selectedCatalogId={selectedCatalogId}
            SelectedBook={SelectedBook}
          />
        </Container>
      </Box>
    </>
  );
}
