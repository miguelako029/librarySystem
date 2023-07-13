import React, { useState } from "react";
import SideBar from "../../components/sidebar/sidebar";
import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";
import TextField from "@mui/material/TextField";
import { Checkbox, Button, Grid } from "@mui/material";
import CatTable from "../catalogRep/categoryTable";

export default function Books() {
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChange = isChecked => {
    setSelectedCount(prevCount => (isChecked ? prevCount + 1 : prevCount - 1));
  };

  const isCheckboxChecked = selectedCount === 1;
  const hideButtons = selectedCount < 1;

  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Catalog list</h1>
          <TextField
            id="outlined-basic"
            label="Catalog name"
            fullWidth
            sx={{ marginTop: "20px", background: "white" }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            sx={{ marginTop: "20px", background: "white" }}
            fullWidth
          />
          <Grid sx={{ float: "right", marginBottom: 3 }}>
            {hideButtons && (
              <Button
                variant="outlined"
                sx={{
                  marginTop: "20px",
                }}
              >
                Add Category
              </Button>
            )}

            {isCheckboxChecked && (
              <Button
                variant="contained"
                color="success"
                sx={{
                  marginTop: "20px",
                }}
              >
                Save
              </Button>
            )}
            {isCheckboxChecked && (
              <Button
                variant="outlined"
                color="error"
                sx={{
                  marginTop: "20px",
                  marginLeft: "5px",
                }}
              >
                Cancel
              </Button>
            )}
          </Grid>
          <CatTable onCheckboxChange={handleCheckboxChange} />
        </Box>
      </Box>
    </>
  );
}
