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
import { collection, getDocs, updateDoc, get, doc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";
import { useAppStore } from "../../AppStore";

export default function EditUser({ fid, closeEvent }) {
  const [open, setOpen] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  // const [rows, setRows] = useState([]);
  const setRows = useAppStore(state => state.setRows);
  const empCollectionRef = collection(db, "users");
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("FID:" + fid.id);
    setFname(fid.fname);
    console.log("FID:" + fid.fname);
    setLname(fid.lname);
    setAge(fid.age);
  }, [fid]);

  const handleFnameChange = event => {
    setFname(event.target.value);
  };
  const handleLnameChange = event => {
    setLname(event.target.value);
  };
  const handleAgeChange = event => {
    setAge(event.target.value);
  };

  const updateUser = async () => {
    if (fname.trim() === "" || lname.trim() === "" || age.trim() === "") {
      closeEvent();
      Swal.fire("Error", "Please complete all the field", "error").then(() => {
        setError(true);
      });
      // Prevent adding user if any field is empty
    } else {
      const userDoc = doc(db, "users", fid.id);
      const newfields = {
        fname: fname,
        lname: lname,
        age: age,
      };
      await updateDoc(userDoc, newfields);
      getUsers();
      closeEvent();
      Swal.fire("Submitted!", "Your file has been submitted.", "success");
    }
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
            size="small"
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
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Age"
            error={error && age.trim() === ""}
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
            onClick={updateUser}
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
