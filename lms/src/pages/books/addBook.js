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

  const [fname, setFname] = useState("");
  const [Mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [contactNo, setContact] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [address, setAddress] = useState("");
  const [StateP, setStateP] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");

  const [catalog, setCatalogs] = useState([]); // State to store catalog data
  const [selectedCatalog, setSelectedCatalog] = useState("");
  const [selectedLang, setSelectedLang] = useState(""); // State to store selected catalog
  const [options, setOptions] = useState([]); // Define a state variable and its setter
  // const [rows, setRows] = useState([]);
  const [data, setData] = useState([]); // State to hold the fetched data

  //handling
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "users");
  const [error, setError] = useState(false);

  const handleFnameChange = (event) => {
    setFname(event.target.value);
  };
  const handleMnameChange = (event) => {
    setMname(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLname(event.target.value);
  };
  const handleEmailAddChange = (event) => {
    setEmailAdd(event.target.value);
  };
  const handleBirthdayChange = (date) => {
    setBirthday(date);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleStatePChange = (event) => {
    setStateP(event.target.value);
  };
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handlePostalChange = (event) => {
    setPostal(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  const handleContactChange = (event) => {
    setContact(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleCatalogChange = (event) => {
    setSelectedCatalog(event.target.value);
    console.log(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setSelectedLang(event.target.value);
    console.log(event.target.value);
  };

  const createUser = async () => {
    if (
      fname.trim() === "" ||
      Mname.trim() === "" ||
      lname.trim() === "" ||
      emailAdd.trim() === "" ||
      contactNo.trim() === "" ||
      address.trim() === "" ||
      // (birthday && birthday.trim && birthday.trim() === "") ||
      city.trim() === "" ||
      postal.trim() === "" ||
      country.trim() === ""
    ) {
      closeEvent();
      Swal.fire("Error", "Please complete all the field", "error").then(() => {
        setError(true);
      });
      // Prevent adding user if any field is empty
    } else {
      const birthdayDate = new Date(birthday);
      if (isNaN(birthdayDate.getTime())) {
        // Handle invalid date input
        console.error("Invalid date format");
        return;
      }
      const birthdayTimestamp = Timestamp.fromMillis(birthdayDate.getTime());

      await addDoc(empCollectionRef, {
        fname: fname,
        mname: Mname,
        lname: lname,
        emailAdd: emailAdd,
        contactNo: contactNo,
        birthday: birthdayTimestamp,
        address: address,
        city: city,
        StateP: StateP,
        postal: postal,
        country: country,
        age: age,
        createdDate: serverTimestamp(),
      });

      console.log(birthday);
      getUsers();
      closeEvent();
      setFname("");
      setMname("");
      setLname("");
      setEmailAdd("");
      setContact("");
      setBirthday(null);
      setAddress("");
      setStateP("");
      setCountry("");
      setPostal("");
      setCity("");

      Swal.fire("Submitted!", "Your file has been submitted.", "success");
    }

    const user = {
      fname,
      lname,
      age,
    };
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
            error={error && fname.trim() === ""}
            label="Book Title"
            type="string"
            value={fname}
            onChange={handleFnameChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Book Author"
            error={error && emailAdd.trim() === ""}
            value={emailAdd}
            onChange={handleEmailAddChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Publisher"
            error={error && city.trim() === ""}
            value={city}
            onChange={handleCityChange}
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Description/Summary"
            error={error && address.trim() === ""}
            value={address}
            onChange={handleAddressChange}
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
              // error={error && birthday.trim() === ""}
              variant="outlined"
              required
              label="Publication Year"
              sx={{ minWidth: "100%" }}
              value={birthday}
              onChange={handleBirthdayChange}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={4}>
          {/* <TextField
            id="outlined-basic"
            label="Language"
            error={error && StateP.trim() === ""}
            value={StateP}
            onChange={handleStatePChange}
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          /> */}
          <FormControl fullWidth>
            <InputLabel>Select a Language</InputLabel>
            <Select
              value={selectedLang}
              onChange={handleLanguageChange}
              label="Select a Language"
            >
              {langArray.map((lang) => (
                <MenuItem key={lang.code} value={lang.code}>
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
            error={error && postal.trim() === ""}
            value={postal}
            onChange={handlePostalChange}
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
            error={error && country.trim() === ""}
            value={country}
            onChange={handleCountryChange}
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Location"
            error={error && country.trim() === ""}
            value={country}
            onChange={handleCountryChange}
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
            onClick={createUser}
            // disabled={
            //   fname.trim() === "" || lname.trim() === "" || age.trim() === ""
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
