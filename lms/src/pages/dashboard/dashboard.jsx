import React, { useState } from "react";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/topbar/topbar";
import { Box, Container, CssBaseline } from "@mui/material";
import "../../assets/styles/bookStyle.css";

import BookList from "../dashboard/bookList"; // Import the BookList component
import GetCatalogButton from "../dashboard/catalogButton"; // Import the GetCatalogButton component

export default function Home() {
  const [selectedCatalogId, setSelectedCatalogId] = useState(null);

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
          // minHeight: "60vh", // Take the full height of the viewport
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
          <BookList selectedCatalogId={selectedCatalogId} />
        </Container>
      </Box>
    </>
  );
}
