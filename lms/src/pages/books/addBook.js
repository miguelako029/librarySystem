import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Modal,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  IconButton,
  Box,
  Divider,
  useStepContext,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import axios from "axios";

import { Timestamp } from "firebase/firestore";

import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../../AppStore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { InputLabel, MenuItem, Select } from "@mui/material";
import languagesData from "../../assets/json/languages.json";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function AddBooks({ closeEvent }) {
  //modal
  const [open, setOpen] = useState(false);
  //form

  const [bookTitle, setbookTitle] = useState("");
  const [bookAuthor, setbookAuthor] = useState("");

  const [bookPublicationYear, setbookPublicationYear] = useState(null);
  const [bookDesc, setbookDesc] = useState("");
  const [bookGenre, setbookGenre] = useState("");

  const [bookPublisher, setbookPublisher] = useState("");
  const [bookTotal, setbookTotal] = useState("");
  const [bookAvailCopies, setbookAvailCopies] = useState("");
  const [bookLoc, setbookLoc] = useState("");

  const [catalog, setCatalogs] = useState([]); // State to store catalog data
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [selectedLang, setSelectedLang] = useState(""); // State to store selected catalog
  const [options, setOptions] = useState([]); // Define a state variable and its setter
  // const [rows, setRows] = useState([]);
  const [data, setData] = useState([]); // State to hold the fetched data

  //handling
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "books");
  const [error, setError] = useState(false);

  const handlebookTitleChange = (event) => {
    setbookTitle(event.target.value);
  };

  const handlebookAuthorChange = (event) => {
    setbookAuthor(event.target.value);
  };
  const handlebookPublicationYearChange = (date) => {
    setbookPublicationYear(date);
  };

  const handlebookDescChange = (event) => {
    setbookDesc(event.target.value);
  };

  const handlebookPublisherChange = (event) => {
    setbookPublisher(event.target.value);
  };
  const handlebookTotalChange = (event) => {
    setbookTotal(event.target.value);
  };
  const handlebookAvailCopiesChange = (event) => {
    setbookAvailCopies(event.target.value);
  };

  const handleLocChange = (event) => {
    setbookLoc(event.target.value);
  };

  const handleCatalogChange = (event) => {
    setSelectedCatalog(event.target.value);
    console.log(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLang(event.target.value);
    console.log(event.target.value);
  };

  const getBookList = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log("Table refreshed!"); // Add this line
  };

  const submitBook = async () => {
    if (
      bookTitle.trim() === "" ||
      bookAuthor.trim() === "" ||
      // (bookPublicationYear && bookPublicationYear.trim && bookPublicationYear.trim() === "") ||
      bookPublisher.trim() === "" ||
      bookTotal.trim() === "" ||
      bookAvailCopies.trim() === ""
    ) {
      closeEvent();
      Swal.fire("Error", "Please complete all the field", "error").then(() => {
        setError(true);
      });
      // Prevent adding user if any field is empty
    } else {
      const bookPublicationYearDate = new Date(bookPublicationYear);
      if (isNaN(bookPublicationYearDate.getTime())) {
        // Handle invalid date input
        console.error("Invalid date format");
        return;
      }
      const bookPublicationYearTimestamp = Timestamp.fromMillis(
        bookPublicationYearDate.getTime()
      );

      await addDoc(empCollectionRef, {
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        bookPublicationYear: bookPublicationYearTimestamp,
        bookGenre: selectedCatalog,
        bookDesc: bookDesc,
        bookPublisher: bookPublisher,
        bookTotal: bookTotal,
        bookAvailCopies: bookAvailCopies,
        bookLoc: bookLoc,
        bookLanguage: selectedLang,
        createdDate: serverTimestamp(),
        updatedDate: serverTimestamp(),
      });

      console.log(bookPublicationYear);

      closeEvent();
      setbookTitle("");

      setbookAuthor("");

      setbookPublicationYear(null);
      setbookGenre("");

      setbookAvailCopies("");
      setbookTotal("");
      setbookPublisher("");

      Swal.fire("Submitted!", "Your file has been submitted.", "success").then(
        () => {
          // Refresh the table after success
          getBookList();
          window.location.reload();
        }
      );
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const langArray = Object.keys(languagesData).map((isoCode) => ({
    code: isoCode,
    name: languagesData[isoCode].name,
    nativeName: languagesData[isoCode].nativeName,
  }));

  useEffect(() => {
    // Function to fetch catalog data from Firestore
    const fetchCatalogs = async () => {
      const catalogCollection = collection(db, "catalog"); // Replace "catalogs" with your collection name
      const querySnapshot = await getDocs(catalogCollection);
      const catalogData = [];

      querySnapshot.forEach((doc) => {
        // Assuming your catalog documents have a field called "name"
        const catalogName = doc.data().catalog_name;
        catalogData.push({ id: doc.id, name: catalogName });
      });

      setCatalogs(catalogData);
      console.log("Fetched Catalog Data:", catalogData);
    };

    fetchCatalogs();
  }, []); // Run this effect once on component mount

  return (
    <>
      <Typography
        id="keep-mounted-modal-title"
        variant="h6"
        component="h2"
        sx={{ textAlign: "left", marginBottom: "20px" }}
      >
        <IconButton
          style={{ float: "right", top: "-10px", right: "-10px" }}
          onClick={closeEvent}
        >
          <CloseIcon />
        </IconButton>{" "}
        Add Book
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            error={error && bookTitle.trim() === ""}
            label="Book Title"
            type="string"
            value={bookTitle}
            onChange={handlebookTitleChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Book Author"
            error={error && bookAuthor.trim() === ""}
            value={bookAuthor}
            onChange={handlebookAuthorChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Publisher"
            error={error && bookPublisher.trim() === ""}
            value={bookPublisher}
            onChange={handlebookPublisherChange}
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Description/Summary"
            error={error && bookDesc.trim() === ""}
            value={bookDesc}
            onChange={handlebookDescChange}
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Selected Catalog
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Selected Catalog"
              value={selectedCatalog}
              onChange={handleCatalogChange}
              // onChange={handleChange}
            >
              {catalog.map((catalog) => (
                <MenuItem key={catalog.id} value={catalog.id}>
                  {catalog.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // error={error && bookPublicationYear.trim() === ""}
              variant="outlined"
              required
              label="Publication Year"
              sx={{ minWidth: "100%" }}
              value={bookPublicationYear}
              onChange={handlebookPublicationYearChange}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Select a Language</InputLabel>
            <Select
              value={selectedLang}
              onChange={handleLanguageChange}
              label="Select a Language"
            >
              {langArray.map((lang) => (
                <MenuItem key={lang.code} value={lang.nativeName}>
                  {lang.name} - {lang.nativeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Total Copies"
            error={error && bookTotal.trim() === ""}
            value={bookTotal}
            onChange={handlebookTotalChange}
            required
            type="number"
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Available Copies"
            error={error && bookAvailCopies.trim() === ""}
            value={bookAvailCopies}
            onChange={handlebookAvailCopiesChange}
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Location"
            error={error && bookAvailCopies.trim() === ""}
            value={bookLoc}
            onChange={handleLocChange}
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Typography>Signature:</Typography>
          <SignatureCanvas
            ref={sigCanvasRef}
            canvasProps={{
              height: 200,
              width: 300,
              className: "signature-canvas",
            }}
            sx={{ minWidth: "200%", border: "1px solid #eeeeee" }}
          />
          <Button
            variant="contained"
            onClick={captureSignature}
            sx={{ minWidth: "100%" }}
          >
            Capture Signature
          </Button>
        </Grid> */}
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={submitBook}
            // disabled={
            //   bookTitle.trim() === "" || lname.trim() === "" || age.trim() === ""
            // }
            sx={{ minWidth: "100%" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
