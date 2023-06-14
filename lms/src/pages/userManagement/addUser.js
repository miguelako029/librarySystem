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

export default function AddUser({ closeEvent }) {
  const [open, setOpen] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  // const [rows, setRows] = useState([]);
  const setRows = useAppStore(state => state.setRows);
  const empCollectionRef = collection(db, "users");

  // const [membershipType, setMembershipType] = useState("");
  // const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   // Perform form submission logic here
  //   console.log("Submitted name:", name);
  //   console.log("Submitted email:", email);
  //   console.log("Submitted gender:", gender);
  //   console.log("Submitted membership type:", membershipType);
  //   handleClose();
  // };

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
    Swal.fire("Submitted!", "Your file has been submitted.", "success");
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
            label="First Name"
            value={fname}
            onChange={handleFnameChange}
            variant="outlined"
            required
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="Last Name"
            value={lname}
            onChange={handleLnameChange}
            variant="outlined"
            required
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Age"
            value={age}
            onChange={handleAgeChange}
            placeholder="20"
            required
            type="number"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={createUser}
            sx={{ minWidth: "100%" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
