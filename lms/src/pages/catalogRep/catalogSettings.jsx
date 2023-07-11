import React from "react";
import SideBar from "../../components/sidebar/sidebar";

import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CatTable from "../catalogRep/categoryTable";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
            }}
          >
            Add Category
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{
              marginTop: "20px",

              border: "0px solid",
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{
              marginTop: "20px",
            }}
          >
            Cancel
          </Button>
          <CatTable />
        </Box>
      </Box>
    </>
  );
}
