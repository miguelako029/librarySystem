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
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function Home() {
  const { catalogId } = useParams();
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
    fetchBooks();
  }, [catalogId]);

  const fetchBooks = async (bookGenre) => {
    if (bookGenre && bookGenre !== "all") {
      const booksCollection = collection(db, "books");
      const booksQuery = query(
        booksCollection,
        where("catalogId", "==", bookGenre) // Filter books by catalogId
      );
      const booksSnapshot = await getDocs(booksQuery);
      const booksList = booksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
      setSelectedCatalogId(bookGenre); // Set the selected catalog ID
      displaySelectedCatalogId(bookGenre); // Call the function to display in console
    } else {
      // Fetch all books
      const allBooksCollection = collection(db, "books");
      const allBooksSnapshot = await getDocs(allBooksCollection);
      const allBooksList = allBooksSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(allBooksList);
      setSelectedCatalogId("all"); // Set selected catalog as "all"
      displaySelectedCatalogId("all"); // Call the function to display in console
    }
  };

  const displaySelectedCatalogId = (catalogId) => {
    console.log(`Selected Catalog ID: ${catalogId}`);
  };

  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginLeft: "20px", marginRight: "20px" }}
        >
          <Container>
            <Typography variant="h4" gutterBottom>
              Library System Dashboard
            </Typography>
            <Paper elevation={3}>
              <div>
                <Button
                  variant="contained"
                  key="all"
                  // component={Link}
                  // to={`/dashboard/all`} // Link to show all books
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    backgroundColor:
                      selectedCatalogId === "all" ? "primary" : "success", // Highlight if "All" is selected
                  }}
                  value="all"
                  onClick={() => setSelectedCatalogId("all")} // Set selected catalog as "all"
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
                        selectedCatalogId === catalog.id
                          ? "success"
                          : "primary",
                    }}
                    value={catalog.id}
                    onClick={() => {
                      setSelectedCatalogId(catalog.id);
                      fetchBooks(catalog.id); // Call fetchBooks with the catalog.id
                    }}
                  >
                    <ListItemText primary={catalog.catalog_name} />
                  </Button>
                ))}
              </div>
              <div>
                <h2>Books</h2>
                <List>
                  {selectedCatalogId ? (
                    // Display books based on the selected catalog
                    books.map((book) => (
                      <ListItem key={book.id}>
                        <ListItemText primary={book.bookTitle} />
                      </ListItem>
                    ))
                  ) : (
                    <p>Select a catalog to view books.</p>
                  )}
                </List>
              </div>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
}
