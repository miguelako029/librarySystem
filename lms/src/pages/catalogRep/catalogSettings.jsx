import React from "react";
import SideBar from "../../components/sidebar/sidebar";

import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";

import TextField from "@mui/material/TextField";

export default function books() {
  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {" "}
          <h1>Catalog list</h1>
          <TextField id="outlined-basic" label="Catalog name" fullWidth />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            sx={{ marginTop: "20px" }}
            fullWidth
          />
        </Box>
      </Box>
    </>
  );
}
