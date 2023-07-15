import React, { useState, useEffect } from "react";
import SideBar from "../../components/sidebar/sidebar";
import { Typography, Box } from "@mui/material";
import TopBar from "../../components/topbar/topbar";
import TextField from "@mui/material/TextField";
import { Checkbox, Button, Grid } from "@mui/material";
import CatTable from "../catalogRep/categoryTable";
import { db } from "../../firebase-config";
import { useAppStore } from "../../AppStore";
// import { getCatalog } from "../catalogRep/categoryTable";

import "firebase/firestore";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  get,
  doc,
  deleteDoc,
} from "firebase/firestore";

import Swal from "sweetalert2";

export default function Books() {
  const setRows = useAppStore(state => state.setRows);
  const rows = useAppStore(state => state.rows);
  const [selectedCount, setSelectedCount] = useState(0);
  const [catalog_name, setCatalogName] = useState("");
  const [description, setDescriptionCat] = useState("");
  const [error, setError] = useState(false);
  const empCollectionRef = collection(db, "catalog");
  const [selectedRow, setSelectedRow] = useState(null); // New state to hold selected row
  const [formid, setFormid] = useState("");
  // const [catalog_name, setCatName] = useState("");
  // const [desccription, setDescription] = useState("");
  useEffect(() => {
    setCatalogName(selectedRow?.catalog_name || "");
    setDescriptionCat(selectedRow?.description || "");
  }, [selectedRow]);

  const handleCheckboxChange = isChecked => {
    setSelectedCount(prevCount => (isChecked ? prevCount + 1 : prevCount - 1));
    if (!isChecked) {
      setSelectedRow(null);
      setCatalogName("");
      setDescriptionCat("");
    }
  };

  const handleCatalogName = event => {
    setCatalogName(event.target.value);
  };

  const handleCatDescription = event => {
    setDescriptionCat(event.target.value);
  };

  const editData = (id, catalog_name, description) => {
    setSelectedRow({ id, catalog_name, description });
  };

  const isCheckboxChecked = selectedCount === 1;
  const hideButtons = selectedCount < 1;

  const getCatalog = async () => {
    const querySnapshot = await getDocs(empCollectionRef);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(data);
  };

  useEffect(() => {
    getCatalog();
  }, []);

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

  const deleteCatalog = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async id => {
    const catalogDoc = doc(db, "catalog", id);
    await deleteDoc(catalogDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");

    getCatalog();
    setCatalogName("");
    setDescriptionCat("");
    setSelectedCount(0); // Reset the selectedCount to 0
    setSelectedRow(null);
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
                onClick={() => deleteCatalog(selectedRow.id)}
              >
                Delete
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
                // onClick={CancelSelectCatalog}
              >
                Cancel
              </Button>
            )}
          </Grid>
          <CatTable
            onCheckboxChange={handleCheckboxChange}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow} // Pass setSelectedRow as a prop
          />
        </Box>
      </Box>
    </>
  );
}
