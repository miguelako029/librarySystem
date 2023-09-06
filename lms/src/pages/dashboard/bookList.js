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
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import ImgPlaceHolder from "../../assets/images/book.jpg";

// import { makeStyles } from "@mui/styles";

import "../../assets/styles/bookStyle.css";

function BookList({ selectedCatalogId }) {
  const [books, setBooks] = useState([]);

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

    fetchBooks(selectedCatalogId);
  }, [selectedCatalogId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
          // minHeight: "70vh", // Take the full height of the viewport
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
                    // height="200"
                    width="400"
                    image={ImgPlaceHolder}
                    title={book.bookTitle}
                  />
                  <CardContent>
                    <Typography
                      sx={{ fontSize: "15pt", marginBottom: "20px" }}
                      className="book-title-div"
                    >
                      {book.bookTitle}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "10pt" }}
                      className="book-Genre-div"
                    >
                      {book.selectedCatalogId}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      {book.bookDescription}
                    </Typography> */}

                    <Typography className="bookAvailableText">
                      Available: {book.bookAvailCopies} of {book.bookTotal}
                    </Typography>
                    <Button variant="contained" color="primary">
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
}

export default BookList;
