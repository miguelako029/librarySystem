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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/lab";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function AddUser({ closeEvent }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const handleDateTimeChange = dateTime => {
    setSelectedDateTime(dateTime);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Submitted name:", name);
    console.log("Submitted email:", email);
    console.log("Submitted gender:", gender);
    console.log("Submitted membership type:", membershipType);
    handleClose();
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
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          alignContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Divider sx={{ color: "#919191" }}>
          <p>User Details</p>
        </Divider>
        <TextField
          required
          id="filled-required"
          label="Email Address"
          sx={{ width: "61ch" }}
          fullWidth
          type="email"
        />

        <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ width: "61ch" }}
          required
        />
        <TextField
          required
          id="filled-required"
          label="First Name"
          sx={{ width: "40ch" }}
        />
        <TextField
          required
          id="filled-required"
          label="Last Name"
          sx={{ width: "40ch" }}
        />
        <TextField
          required
          id="filled-required"
          label="Age"
          type="number"
          sx={{ width: "40ch" }}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            {/* <DatePicker
              label="Birthday"
              required
              id="filled-required"
              variant="filled"
              sx={{ width: "40ch" }}
            /> */}
          </DemoContainer>
        </LocalizationProvider>

        {/* <Divider sx={{ color: "#919191" }}>
          <p>Home Address</p>
        </Divider>

        <TextField label="Address Line 1" required sx={{ width: "61ch" }} />
        <TextField label="Address Line 2" required sx={{ width: "61ch" }} />
        <TextField label="City" required sx={{ width: "40ch" }} />
        <TextField label="State" required sx={{ width: "40ch" }} />
        <TextField label="ZIP Code" required sx={{ width: "40ch" }} />
        <FormLabel
          component="legend"
          sx={{ marginLeft: 1, marginTop: 3, marginBottom: 2 }}
        >
          Member Type
          <RadioGroup
            aria-label="membership-type"
            value={membershipType}
            onChange={e => setMembershipType(e.target.value)}
            row
          >
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel
              value="Custodian"
              control={<Radio />}
              label="Custodian"
            />
            <FormControlLabel
              value="Student"
              control={<Radio />}
              label="Student"
            />
          </RadioGroup>
        </FormLabel>

        <FormControl component="fieldset" sx={{ mt: 2 }}></FormControl> */}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: "100%", marginTop: 2, marginBottom: 2 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}
