import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/topbar/topbar";
import {
  Typography,
  Box,
  Container,
  Paper,
  Button,
  ListItemText,
  List,
  ListItem,
} from "@mui/material";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import "../../assets/styles/bookStyle.css";

export default function Home() {
  const [catalogs, setCatalogs] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedCatalogId, setSelectedCatalogId] = useState(null); // Initialize with null

  useEffect(() => {
    // Fetch catalogs
    const fetchCatalogs = async () => {
      const catalogsCollection = collection(db, "catalog");

      const catalogsSnapshot = await getDocs(catalogsCollection);
      const catalogList = catalogsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCatalogs(catalogList);
    };

    fetchCatalogs();
  }, []);

  const fetchBooks = async (bookGenre, catalogId) => {
    if (bookGenre === "all" || bookGenre === null) {
      const allBooksCollection = collection(db, "books");
      const allBooksSnapshot = await getDocs(allBooksCollection);
      const allBooksList = allBooksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(allBooksList);
    } else {
      const booksCollection = collection(db, "books");
      const booksQuery = query(
        booksCollection,
        where("bookGenre", "==", bookGenre) // Use "catalogId" as the field name
      );
      const booksSnapshot = await getDocs(booksQuery);
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    }
  };

  // console.log(fetchBooks.booksQuery);

  const handleCatalogButtonClick = (catalogId) => {
    setSelectedCatalogId(catalogId);
    console.log(catalogId);
    fetchBooks(catalogId);
  };

  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "40px",
          }}
        >
          <Container>
            <Typography variant="h4" gutterBottom>
              Library System Dashboard
            </Typography>
            <div>
              <Button
                variant="contained"
                key="all"
                style={{
                  marginRight: "10px",
                  marginBottom: "10px",
                  color: "white",
                  backgroundColor:
                    selectedCatalogId === "all" ? "#000" : "#FFF",
                }}
                value="all"
                onClick={() => handleCatalogButtonClick("all")}
              >
                <ListItemText primary="All" />
              </Button>
              {catalogs.map((catalog) => (
                <Button
                  variant="contained"
                  key={catalog.id}
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    backgroundColor:
                      selectedCatalogId === catalog.id ? "#000" : "#FFF",
                  }}
                  value={catalog.id}
                  onClick={() => handleCatalogButtonClick(catalog.id)}
                >
                  <ListItemText primary={catalog.catalog_name} />
                </Button>
              ))}
            </div>
            <div>
              <h2>Books</h2>
              {selectedCatalogId ? (
                books.map((book) => (
                  <div class="book-card" key={books.id}>
                    <div class="book-details">
                      <p class="book-title">{book.bookTitle}</p>
                      <p class="book-author">{book.bookAuthor}</p>
                    </div>
                    <button class="card-button">Add to Cart</button>
                  </div>
                ))
              ) : (
                <p>Select a catalog to view books.</p>
              )}
              {/* // </List> */}
            </div>
          </Container>
        </Box>
      </Box>
    </>
  );
}
