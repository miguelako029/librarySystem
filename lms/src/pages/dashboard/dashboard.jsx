import React from "react";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/topbar/topbar";
import { styled } from "@mui/material/styles";
import { Typography, Box, Container, Paper } from "@mui/material";

// Import Outlet for nested routes and Link for navigation
import { Outlet } from "react-router-dom";

// Import useRoutes to handle routing
import { useRoutes } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Catalog from "../dashboard/catalog";
import BookList from "../dashboard/bookList";

// Define the styling for Paper
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const routes = [
    {
      // The base route for the catalog
      path: "/",
      // Render the Catalog component for this route
      element: <Catalog />,
      // Nested routes for the BookList component
      children: [
        {
          // Dynamic route parameter for book ID
          path: "catalog/:id",
          // Render the BookList component for this route
          element: <BookList />,
        },
        // Add more nested routes if needed
      ],
    },
  ];

  // Use the useRoutes hook to handle routing
  const routeResult = useRoutes(routes);
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
              {/* Wrap routes with Routes and handle errors */}
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
}
