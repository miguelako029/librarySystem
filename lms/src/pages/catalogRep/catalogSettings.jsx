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

  useEffect(() => {
    // If more than one checkbox is selected, clear the catalog_name
    if (selectedCount > 1) {
      setCatalogName("");
      setDescriptionCat("");
    }
  }, [selectedCount]);

  const handleCheckboxChange = isChecked => {
    setSelectedCount(prevCount => (isChecked ? prevCount + 1 : prevCount - 1));
    if (!isChecked) {
      setSelectedRow(null);
    }

    // Update the text fields based on the number of selected checkboxes
    if (isChecked && selectedCount > 1) {
      setCatalogName("");
      setDescriptionCat("");
    }

    // Disable the "Catalog name" text field if more than one checkbox is selected
    if (selectedCount >= 1) {
      setCatalogName("");
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
        updatedDate: serverTimestamp(),
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

  const updateCatalog = async () => {
    if (!selectedRow) {
      console.error("No row selected to update.");
      return;
    }

    if (catalog_name.trim() === "" || description.trim() === "") {
      Swal.fire("Error", "Please complete all the fields", "error").then(() => {
        setError(true);
      });
    } else {
      try {
        const catalogDocRef = doc(db, "catalog", selectedRow.id);

        const updatedFields = {
          catalog_name: catalog_name,
          description: description,
          updatedDate: serverTimestamp(),
        };

        await updateDoc(catalogDocRef, updatedFields);

        // Refresh the catalog data
        getCatalog();

        // Show success message
        Swal.fire("Updated!", "Your details have been updated.", "success");
      } catch (error) {
        console.error("Error updating catalog:", error);
        Swal.fire("Error", "Failed to update the catalog.", "error");
      }
    }
  };

  const CancelSelectCatalog = () => {
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
            disabled={selectedCount > 1}
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
            disabled={selectedCount > 1}
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
                onClick={updateCatalog}
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
                onClick={CancelSelectCatalog}
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

// Sure! Let's go through the methods used in the code and provide a narrative explanation for each:

// useEffect: This hook is used multiple times in the component to handle side effects in the functional component. Each useEffect function is responsible for a specific action:

// The first useEffect with a dependency array [selectedRow] is used to update the catalog_name and description state whenever a new selectedRow is received. If a new selectedRow is available, the catalog_name and description will be updated with the corresponding values from selectedRow.

// The second useEffect with a dependency array [selectedCount] is used to update the catalog_name and description state when the number of selected checkboxes changes. If more than one checkbox is selected, both the catalog_name and description states will be cleared.

// The third useEffect with an empty dependency array [] is used to fetch the catalog data from the Firestore database when the component mounts. It calls the getCatalog function to retrieve the data and store it in the rows state.

// useState: This hook is used to define several pieces of local state in the functional component. Each useState function creates a state variable and its corresponding setter function.

// selectedCount: Represents the number of checkboxes selected in the table. It is updated using the setSelectedCount function.

// catalog_name: Represents the value of the "Catalog name" text field. It is updated using the setCatalogName function.

// description: Represents the value of the "Description" text field. It is updated using the setDescriptionCat function.

// rows: Represents the data fetched from the Firestore database. It is set using the setRows function from the useAppStore custom hook.

// selectedRow: Represents the currently selected row in the table. It is updated using the setSelectedRow function.

// formid: Represents the ID of the form, but it is currently not used in the code.

// Event Handler Functions:

// handleCheckboxChange: This function is called when a checkbox in the table is checked or unchecked. It updates the selectedCount state based on whether the checkbox is checked or unchecked. If a checkbox is unchecked, the selectedRow, catalog_name, and description states will be cleared.

// handleCatalogName: This function is called when the value of the "Catalog name" text field changes. It updates the catalog_name state with the new value entered by the user.

// handleCatDescription: This function is called when the value of the "Description" text field changes. It updates the description state with the new value entered by the user.

// editData: This function is called when a row is edited. It updates the selectedRow state with the data of the selected row, including id, catalog_name, and description.

// CRUD Functions:

// getCatalog: This function is responsible for fetching data from the Firestore database and updating the rows state with the retrieved data.

// addCatalog: This function is called when the "Add Category" button is clicked. It validates the input fields and adds a new catalog entry to the Firestore database using the addDoc function.

// deleteCatalog: This function is called when the "Delete" button is clicked for a selected row. It displays a confirmation dialog using Swal.fire and deletes the selected catalog entry from the Firestore database using the deleteApi function.

// deleteApi: This function is responsible for the actual deletion of the catalog entry from the Firestore database using the deleteDoc function.

// updateCatalog: This function is called when the "Save" button is clicked for a selected row. It updates the selected catalog entry in the Firestore database using the updateDoc function. It also handles validation to ensure that all required fields are filled before updating.

// CancelSelectCatalog: This function is called when the "Cancel" button is clicked for a selected row. It resets the selectedRow, catalog_name, description, and selectedCount states, effectively canceling the edit operation.

// Overall, the component is responsible for rendering a catalog list with options to add, edit, and delete catalog entries. It uses Firebase Firestore for data storage and retrieval. The component also handles enabling/disabling text fields and clearing data based on the number of selected checkboxes.
