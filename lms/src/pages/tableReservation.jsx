import React from "react";
import SideBar from "../components/sidebar/sidebar";

import { Typography, Box } from "@mui/material";

export default function home() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {" "}
          <h1>Table Reservation</h1>
        </Box>
      </Box>
    </>
  );
}
