import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Link,
} from "@mui/material";

import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in with:", loginData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form
          onSubmit={handleLoginSubmit}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={loginData.email}
            onChange={handleLoginChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
          >
            Sign In
          </Button>
        </form>
        <Link href="#" variant="body2" sx={{ marginTop: "1rem" }}>
          Forgot password?
        </Link>
      </Paper>
    </Container>
  );
}
