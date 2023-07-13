import React, { useState } from "react";
import SideBar from "../../components/sidebar/sidebar";
import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";
import TextField from "@mui/material/TextField";
import { Checkbox, Button } from "@mui/material";
import CatTable from "../catalogRep/categoryTable";

export default function Books() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = isChecked => {
    setIsCheckboxChecked(isChecked);
  };

  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
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
          {!isCheckboxChecked && (
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
          <CatTable onCheckboxChange={handleCheckboxChange} />
        </Box>
      </Box>
    </>
  );
}
