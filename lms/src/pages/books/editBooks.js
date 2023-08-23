import React, { useState, useEffect } from "react";
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
// import { Timestamp } from "firebase/firestore";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import {
  collection,
  getDocs,
  updateDoc,
  get,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../../AppStore";
import languagesData from "../../assets/json/languages.json";
import { InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";

export default function EditBook({ fid, closeEvent }) {
  const [open, setOpen] = useState(false);
  const [bookTitle, setbookTitle] = useState("");
  const [bookAuthor, setbookAuthor] = useState("");

  const [bookPublicationYear, setbookPublicationYear] = useState(null);
  const [bookDesc, setbookDesc] = useState("");
  const [bookGenre, setbookGenre] = useState("");

  const [bookPublisher, setbookPublisher] = useState("");
  const [bookTotal, setbookTotal] = useState("");
  const [bookAvailCopies, setbookAvailCopies] = useState("");
  const [bookLoc, setbookLoc] = useState("");

  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [selectedLang, setSelectedLang] = useState(""); // State to store selected catalog
  const [catalog, setCatalogs] = useState([]); // State to store catalog data

  const [options, setOptions] = useState([]);
  // const [rows, setRows] = useState([]);
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "books");
  const [error, setError] = useState(false);

  useEffect(() => {
    setbookTitle(fid.bookTitle);
    setbookAuthor(fid.bookAuthor);
    setbookPublicationYear(fid.bookPublicationYear);
    setbookDesc(fid.bookDesc);
    setSelectedCatalog(fid.bookGenre);
    setSelectedLang(fid.bookLanguage);
    setbookLoc(fid.bookLoc);
    setbookPublisher(fid.bookPublisher);
    setbookTotal(fid.bookTotal);
    setbookAvailCopies(fid.bookAvailCopies);
  }, [fid]);

  const handlebookTitleChange = (event) => {
    setbookTitle(event.target.value);
  };

  const handlebookAuthorChange = (event) => {
    setbookAuthor(event.target.value);
  };
  const handlebookPublicationYearChange = (date) => {
    setbookPublicationYear(Timestamp.fromDate(date.toDate()));
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
  }, []);

  const saveBookUpdate = async () => {
    if (bookTitle.trim() === "" || bookAuthor.trim() === "") {
      closeEvent();
      Swal.fire("Error", "Please complete all the field", "error").then(() => {
        setError(true);
      });
      // Prevent adding books if any field is empty
    } else {
      const bookDoc = doc(db, "books", fid.id);
      const newfields = {
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        bookPublisher: bookPublisher,
        bookDesc: bookDesc,
        bookPublicationYear: bookPublicationYear,
        bookGenre: selectedCatalog,
        bookLanguage: selectedLang,
        bookLoc: bookLoc,
        bookTotal: bookTotal,
        bookAvailCopies: bookAvailCopies,
        updatedDate: serverTimestamp(),
      };
      await updateDoc(bookDoc, newfields);
      getBooks();
      closeEvent();
      Swal.fire("Updated!", "Your details has been updated.", "success");
    }
  };

  const getBooks = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

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
        Edit Book Details
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
            >
              {catalog.map((catalog) => (
                <MenuItem key={catalog.id} value={catalog.name}>
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
              value={
                bookPublicationYear instanceof Timestamp
                  ? dayjs(bookPublicationYear.toDate())
                  : null
              }
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
            onClick={saveBookUpdate}
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
