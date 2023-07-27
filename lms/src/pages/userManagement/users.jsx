import React from "react";
import SideBar from "../../components/sidebar/sidebar";

import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";
import UserTable from "../userManagement/userTable";

export default function books() {
  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: 5 }}>
          {" "}
          {/* <h1>User Management</h1> */}
          <UserTable />
        </Box>
      </Box>
    </>
  );
}
