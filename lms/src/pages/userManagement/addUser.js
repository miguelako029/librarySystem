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
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../../AppStore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/lab";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import SignatureCanvas from "react-signature-canvas";

export default function AddUser({ closeEvent }) {
  //modal
  const [open, setOpen] = useState(false);
  //form
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  // const [rows, setRows] = useState([]);

  //handling
  const setRows = useAppStore(state => state.setRows);
  const empCollectionRef = collection(db, "users");
  const [error, setError] = useState(false);

  const handleFnameChange = event => {
    setFname(event.target.value);
  };
  const handleLnameChange = event => {
    setLname(event.target.value);
  };
  const handleAgeChange = event => {
    setAge(event.target.value);
  };

  const createUser = async () => {
    if (fname.trim() === "" || lname.trim() === "" || age.trim() === "") {
      closeEvent();
      Swal.fire("Error", "Please complete all the field", "error").then(() => {
        setError(true);
      });
      // Prevent adding user if any field is empty
    } else {
      await addDoc(empCollectionRef, {
        fname: fname,
        lname: lname,
        age: age,
      });
      getUsers();
      closeEvent();

      console.log(fname);
      console.log(lname);
      console.log(age);
      setFname("");
      setLname("");
      setAge("");
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
    setRows(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const sigCanvasRef = useRef(null);

  const captureSignature = () => {
    const base64Image = sigCanvasRef.current.toDataURL();
    // Use the base64Image as needed (e.g., save to database or display preview)
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
        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
            error={error && lname.trim() === ""}
            value={lname}
            onChange={handleLnameChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Contact No."
            error={error && lname.trim() === ""}
            value={lname}
            onChange={handleLnameChange}
            variant="outlined"
            required
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker variant="outlined" required sx={{ minWidth: "100%" }} />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Address"
            error={error && age.trim() === ""}
            value={age}
            onChange={handleAgeChange}
            placeholder="20"
            required
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="City"
            error={error && age.trim() === ""}
            value={age}
            onChange={handleAgeChange}
            placeholder="20"
            required
            type="number"
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Postal code"
            error={error && age.trim() === ""}
            value={age}
            onChange={handleAgeChange}
            placeholder="20"
            required
            type="number"
            variant="outlined"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Country"
            error={error && age.trim() === ""}
            value={age}
            onChange={handleAgeChange}
            placeholder="20"
            required
            type="number"
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
