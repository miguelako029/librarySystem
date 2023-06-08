import React from "react";
import SideBar from "../components/sidebar/sidebar";
import TopBar from "../components/topbar/topbar";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography, Box, CardActionArea } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function home() {
  return (
    <>
      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, marginLeft: "20px", marginRight: "20px" }}
        >
          {" "}
          <h1>Dashboard</h1>
          <Grid container spacing={2}>
            <Grid item xs={1} sm={6} md={4} lg={11}>
              <Stack spacing={4} direction="row">
                <Card sx={{ borderRadius: 7 }}>
                  <CardActionArea
                    sx={{
                      width: 415,
                      height: 200,
                      backgroundColor: "#FAEBD7",
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Find Book
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card sx={{ borderRadius: 7 }}>
                  <CardActionArea
                    sx={{
                      width: 415,
                      height: 200,
                      backgroundColor: "#FFFFE0",
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Find Catalog
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card sx={{ borderRadius: 7 }}>
                  <CardActionArea
                    sx={{
                      width: 415,
                      height: 200,
                      backgroundColor: "#FFDAB9",
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Manage Book
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
                <Card sx={{ borderRadius: 7 }}>
                  <CardActionArea
                    sx={{
                      width: 415,
                      height: 200,
                      backgroundColor: "#FFF5EE",
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Manage Account
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
