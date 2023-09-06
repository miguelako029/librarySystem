import React, { useState, useEffect } from "react";
import {
  Button,
  ListItemText,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function GetCatalogButton({
  setSelectedCatalogId,
  selectedCatalogId,
}) {
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
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

  const handleCatalogButtonClick = (catalogId) => {
    setSelectedCatalogId(catalogId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
        // minHeight: "70vh", // Take the full height of the viewport
        p: 3,
      }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Library System Dashboard
        </Typography>
        <Button
          variant="contained"
          key="all"
          style={{
            marginRight: "10px",
            marginBottom: "10px",
            color: "white",
            backgroundColor: selectedCatalogId === "all" ? "#000" : "#FFF",
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
      </Container>
    </Box>
  );
}
