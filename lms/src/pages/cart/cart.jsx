import React from "react";
import SideBar from "../../components/sidebar/sidebar";

import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";
import CartTable from "../cart/cartTable";

export default function books() {
  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {" "}
          <h1>Cart</h1>
          <CartTable />
        </Box>
      </Box>
    </>
  );
}
