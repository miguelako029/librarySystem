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
import { Timestamp } from "firebase/firestore";

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
} from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../../AppStore";

import dayjs from "dayjs";

export default function EditUser({ fid, closeEvent }) {
  const [open, setOpen] = useState(false);
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContact] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [address, setAddress] = useState("");
  const [stateP, setStateP] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  // const [rows, setRows] = useState([]);
  const setRows = useAppStore((state) => state.setRows);
  const empCollectionRef = collection(db, "users");
  const [error, setError] = useState(false);

  useEffect(() => {
    setFname(fid.fname);
    setLname(fid.lname);
    setMname(fid.mname);
    setEmailAdd(fid.emailAdd);
    setPassword(fid.password);
    setContact(fid.contactNo);
    setBirthday(fid.birthday);
    setAddress(fid.address);
    setStateP(fid.stateP);
    setCity(fid.city);
    setPostal(fid.postal);
    setCountry(fid.country);
  }, [fid]);

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
    setBirthday(Timestamp.fromDate(date.toDate())); // Convert the selected date to a Firebase Timestamp
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

  const updateUser = async () => {
    if (fname.trim() === "" || lname.trim() === "" || mname.trim() === "") {
      closeEvent();
      Swal.fire("Error", "Please complete all the field", "error").then(() => {
        setError(true);
      });
      // Prevent adding user if any field is empty
    } else {
      const userDoc = doc(db, "users", fid.id);
      const newfields = {
        fname: fname,
        mname: mname,
        lname: lname,
        emailAdd: emailAdd,
        password: password,
        contactNo: contactNo,
        birthday: birthday,
        address: address,
        stateP: stateP,
        city: city,
        postal: postal,
        country: country,
        updatedDate: serverTimestamp(),
      };
      await updateDoc(userDoc, newfields);
      getUsers();
      closeEvent();
      Swal.fire("Updated!", "Your details has been updated.", "success");
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
        Edit New User
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
            error={error && mname.trim() === ""}
            label="Middle Name"
            type="string"
            value={mname}
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
              value={birthday ? dayjs(birthday.toDate()) : null}
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
            error={error && stateP.trim() === ""}
            value={stateP}
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
            onClick={updateUser}
            // disabled={
            //   fname.trim() === "" || lname.trim() === "" || age.trim() === ""
            // }
            sx={{
              minWidth: "100%",
              background: "#FFFF8F",
              color: "#000000",
              "&:hover": {
                background: "#FFBF00",
                color: "#000000", // Set the desired background color on hover
              },
            }}
          >
            Save changes
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
