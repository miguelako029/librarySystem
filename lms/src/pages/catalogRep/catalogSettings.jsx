import React, { useState } from "react";
import SideBar from "../../components/sidebar/sidebar";
import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";
import TextField from "@mui/material/TextField";
import { Checkbox, Button, Grid } from "@mui/material";
import CatTable from "../catalogRep/categoryTable";
import { db } from "../../firebase-config";
import { getCatalog } from "../catalogRep/categoryTable";

import "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import Swal from "sweetalert2";

export default function Books() {
  const [selectedCount, setSelectedCount] = useState(0);
  const [catalog_name, setCatalogName] = useState("");
  const [description, setDescriptionCat] = useState("");
  const [error, setError] = useState(false);
  const empCollectionRef = collection(db, "catalog");

  const handleCheckboxChange = isChecked => {
    setSelectedCount(prevCount => (isChecked ? prevCount + 1 : prevCount - 1));
  };

  const handleCatalogName = event => {
    setCatalogName(event.target.value);
  };
  const handleCatDescription = event => {
    setDescriptionCat(event.target.value);
  };

  const isCheckboxChecked = selectedCount === 1;
  const hideButtons = selectedCount < 1;

  const addCatalog = async () => {
    if (catalog_name.trim() === "" || description.trim() === "") {
      Swal.fire("Error", "Please complete all the field", "error").then(() => {
        setError(true);
      });
      // Prevent adding user if any field is empty
    } else {
      // const birthdayDate = new Date(birthday);
      // if (isNaN(birthdayDate.getTime())) {
      //   // Handle invalid date input
      //   console.error("Invalid date format");
      //   return;
      // }
      // const birthdayTimestamp = Timestamp.fromMillis(birthdayDate.getTime());

      await addDoc(empCollectionRef, {
        catalog_name: catalog_name,
        description: description,
        createdDate: serverTimestamp(),
      });

      // console.log(birthday);

      getCatalog();

      setCatalogName("");
      setDescriptionCat("");

      Swal.fire("Submitted!", "Your file has been submitted.", "success");
    }

    const catalog = {
      catalog_name,
      description,
    };
  };

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
            value={catalog_name}
            onChange={handleCatalogName}
            fullWidth
            sx={{ marginTop: "20px", background: "white" }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            value={description}
            onChange={handleCatDescription}
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
                onClick={addCatalog}
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
