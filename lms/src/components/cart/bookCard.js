import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const cardStyle = {
  display: "flex",
  margin: "1rem",
  maxWidth: "400px",
};

const cardContentStyle = {
  flex: "1 0 auto",
};

const cardMediaStyle = {
  width: "150px",
  height: "150px",
  objectFit: "cover",
};

const deleteButtonStyle = {
  marginLeft: "auto",
};

const CartItemCard = ({ item, onDelete }) => {
  const [quantity, setQuantity] = useState(3);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card style={cardStyle}>
      <CardMedia
        component="img"
        // alt={item.name}
        // src={item.image}
        style={cardMediaStyle}
      />
      <CardContent style={cardContentStyle}>
        <Typography variant="h5">name</Typography>
        <Typography variant="body2">Price: $</Typography>
        <Typography variant="body2">Quantity: {}</Typography>
        <Button onClick={handleIncrement}>+</Button>
        <Button onClick={handleDecrement}>-</Button>
      </CardContent>
      <IconButton
        aria-label="delete"
        style={deleteButtonStyle}
        onClick={() => onDelete(item.id)}
      >
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export default CartItemCard;
