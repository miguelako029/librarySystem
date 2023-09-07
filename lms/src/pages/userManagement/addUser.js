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

import { Timestamp } from "firebase/firestore";

import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../../AppStore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase-config";

export default function AddUser({ closeEvent }) {
  //modal
  const [open, setOpen] = useState(false);
  //form

  const [fname, setFname] = useState("");
  const [Mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContact] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [address, setAddress] = useState("");
  const [StateP, setStateP] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");

  // const [rows, setRows] = useState([]);

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
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const createUser = async () => {
    try {
      if (
        fname.trim() === "" ||
        Mname.trim() === "" ||
        lname.trim() === "" ||
        emailAdd.trim() === "" || // Make sure to declare or retrieve emailAdd
        contactNo.trim() === "" ||
        address.trim() === "" ||
        // (birthday && birthday.trim && birthday.trim() === "") ||
        city.trim() === "" ||
        postal.trim() === "" ||
        country.trim() === ""
      ) {
        closeEvent();
        Swal.fire("Error", "Please complete all the fields", "error").then(
          () => {
            setError(true);
          }
        );
        // Prevent adding user if any field is empty
      } else {
        const birthdayDate = new Date(birthday);
        if (isNaN(birthdayDate.getTime())) {
          // Handle invalid date input
          console.error("Invalid date format");
          return;
        }
        const birthdayTimestamp = Timestamp.fromMillis(birthdayDate.getTime());

        // Create a new user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailAdd, // Make sure to declare or retrieve emailAdd
          password // Make sure to declare or retrieve password
        );

        // User created successfully, you can access user information like this:
        const user = userCredential.user;
        console.log(user);

        // Continue with your code to add the user to Firestore
        await addDoc(empCollectionRef, {
          fname: fname,
          mname: Mname,
          lname: lname,
          emailAdd: emailAdd,
          password: password,
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
    } catch (error) {
      // Handle any errors that occur during user creation
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      // You can display an error message here if needed
    }
  };

  const getUsers = async () => {
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
        Add New User
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            error={error && fname.trim() === ""}
            label="First Name"
            type="string"
            value={fname}
            onChange={handleFnameChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            error={error && Mname.trim() === ""}
            label="Middle Name"
            type="string"
            value={Mname}
            onChange={handleMnameChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            error={error && lname.trim() === ""}
            value={lname}
            onChange={handleLnameChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Email Address"
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
            label="Password"
            error={error && password.trim() === ""}
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Contact No."
            error={error && contactNo.trim() === ""}
            value={contactNo}
            onChange={handleContactChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              // error={error && birthday.trim() === ""}
              variant="outlined"
              required
              sx={{ minWidth: "100%" }}
              value={birthday}
              onChange={handleBirthdayChange}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Address"
            error={error && address.trim() === ""}
            value={address}
            onChange={handleAddressChange}
            placeholder="Street No/Street Name/Unit No/Floor/Block/Barangay"
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="State/Province"
            error={error && StateP.trim() === ""}
            value={StateP}
            onChange={handleStatePChange}
            placeholder="Region"
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="City"
            error={error && city.trim() === ""}
            value={city}
            onChange={handleCityChange}
            placeholder="City"
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Postal code"
            error={error && postal.trim() === ""}
            value={postal}
            onChange={handlePostalChange}
            placeholder="0000"
            required
            type="number"
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Country"
            error={error && country.trim() === ""}
            value={country}
            onChange={handleCountryChange}
            placeholder="Country"
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
