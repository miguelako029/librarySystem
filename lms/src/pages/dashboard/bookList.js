import React, { useEffect, useState } from "react";
import {
  Button,
  ListItemText,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Tooltip,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import ImgPlaceHolder from "../../assets/images/book.jpg";

import "../../assets/styles/bookStyle.css";

export const BookList = ({ selectedCatalogId, SelectedBook }) => {
  const [books, setBooks] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    const fetchBooks = async (bookGenre) => {
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
          where("bookGenre", "==", bookGenre)
        );
        const booksSnapshot = await getDocs(booksQuery);
        const booksList = booksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksList);
      }
    };

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
    fetchBooks(selectedCatalogId || "all"); // Use "all" as the default catalog
  }, [selectedCatalogId]);

  const handleAddToCart = (bookId) => {
    SelectedBook(bookId);
    console.log(bookId);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          p: 3,
        }}
      >
        <Grid container spacing={2}>
          {selectedCatalogId ? (
            books.map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={book.id}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={book.bookTitle}
                    width="400"
                    image={ImgPlaceHolder}
                    title={book.bookTitle}
                  />
                  <CardContent>
                    <Tooltip title={book.bookTitle} arrow>
                      <Typography
                        sx={{
                          fontSize: "15pt",
                          marginBottom: "15px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        className="book-title-div"
                      >
                        {book.bookTitle}
                      </Typography>
                    </Tooltip>
                    {/* <Typography
                      sx={{ fontSize: "10pt" }}
                      className="book-Genre-div"
                    >
                      {
                        catalogs.find(
                          (catalog) => catalog.id === book.bookGenre
                        )?.catalog_name
                      }
                    </Typography> */}
                    <Typography className="bookAvailableText">
                      Available: {book.bookAvailCopies} of {book.bookTotal}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddToCart(book)}
                    >
                      Add to cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <p>Select a catalog to view books.</p>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default BookList;
