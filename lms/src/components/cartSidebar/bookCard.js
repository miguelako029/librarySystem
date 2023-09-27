import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

import { AuthContextProvide } from "../../components/context/AuthenticatorContext"; // Correct import path

const cardStyle = {
  display: "flex",
  margin: "1rem",
  maxWidth: "400px",
};

const cardContentStyle = {
  flex: "1 0 auto",
};

const cardMediaStyle = {
  width: "100px",
  height: "150px",
  // objectFit: "fix",
};

const deleteButtonStyle = {
  marginLeft: "auto",
};

const CartItemCard = ({ item, onDelete }) => {
  const { currentUser } = useContext(AuthContextProvide);
  const empCollectionRef = collection(db, "cart");

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getUserCart();
  }, []);

  const getUserCart = async () => {
    const querySnapshot = await getDocs(empCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Filter the data array to include only items where userId matches currentUser.uid
    const filteredData = data.filter(
      (cartItem) => cartItem.userId === currentUser.uid
    );

    // Merge rows with the same book and add bookQty
    const mergedData = mergeRows(filteredData);

    // Set the merged data in the state
    setBooks(mergedData);
  };

  const mergeRows = (data) => {
    const mergedData = [];
    const seenBooks = new Set();

    data.forEach((item) => {
      if (!seenBooks.has(item.book)) {
        // Add the item to the mergedData if book hasn't been seen before
        seenBooks.add(item.book);
        mergedData.push(item);
      } else {
        // Find the existing item in mergedData and add the bookQty
        const existingItem = mergedData.find(
          (mergedItem) => mergedItem.book === item.book
        );
        if (existingItem) {
          existingItem.bookQty += item.bookQty;
        }
      }
    });

    return mergedData;
  };

  return (
    <>
      {books.map((bookItem) => (
        <Card key={bookItem.id} style={cardStyle}>
          <CardMedia
            component="img"
            // alt={bookItem.name}
            // src={bookItem.image}
            style={cardMediaStyle}
          />

          <CardContent style={cardContentStyle}>
            <>
              <Typography variant="h5">{bookItem.bookName}</Typography>
              <Typography variant="body2"></Typography>
              <Typography variant="body2">
                Quantity: {bookItem.bookQty}
              </Typography>
            </>
            {/* <Button onClick={handleIncrement}>+</Button>
            <Button onClick={handleDecrement}>-</Button> */}
          </CardContent>
          <IconButton
            aria-label="delete"
            style={deleteButtonStyle}
            onClick={() => onDelete(bookItem.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Card>
      ))}
    </>
  );
};

export default CartItemCard;
