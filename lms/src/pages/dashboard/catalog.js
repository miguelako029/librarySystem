import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const catalogs = ["Fiction", "Non-fiction", "Science", "History"]; // Sample catalogs

const Catalog = () => {
  return (
    <div>
      <h2>Catalogs</h2>
      <List>
        {catalogs.map((catalog, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={`/catalog/${catalog}`}
          >
            <ListItemText primary={catalog} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Catalog;
