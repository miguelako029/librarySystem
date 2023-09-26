import React, { useState, useEffect, useContext } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase-config";
import AddUser from "../userManagement/addUser";
import EditUser from "../userManagement/editUser";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAppStore } from "../../AppStore";
import { Timestamp } from "firebase/firestore";

import { AuthContextProvide } from "../../components/context/AuthenticatorContext"; // Correct import path

export default function StickyHeadTable() {
  const { currentUser } = useContext(AuthContextProvide);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [page, setPage] = useState(0);
  const [formid, setFormid] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const empCollectionRef = collection(db, "cart");
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenUser = () => {
    setOpenUser(true);
  };

  const handleCloseUser = () => {
    setOpenUser(false);
  };

  useEffect(() => {
    getUserCart();
  }, []);

  console.log(currentUser);
  useEffect(() => {
    getUserCart();
  }, []);

  // Helper function to merge rows with the same book and add bookQty
  const mergeRows = (data) => {
    const mergedData = [];
    const seenBooks = new Set();

    data.forEach((item) => {
      if (!seenBooks.has(item.book)) {
        // Add the item to the mergedData if book hasn't been seen before
        seenBooks.add(item.book);
        mergedData.push(item);
      } else {
        // Find the existing item in mergedData and add the bookQty
        const existingItem = mergedData.find(
          (mergedItem) => mergedItem.book === item.book
        );
        if (existingItem) {
          existingItem.bookQty += item.bookQty;
        }
      }
    });

    return mergedData;
  };

  console.log(currentUser);
  const getUserCart = async () => {
    const querySnapshot = await getDocs(empCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // Filter the data array to include only items where userId matches currentUser.uid
    const filteredData = data.filter((item) => item.userId === currentUser.uid);

    // Merge rows with the same book and add bookQty
    const mergedData = mergeRows(filteredData);

    // Log the merged data
    console.log("Merged Data:", mergedData);

    // Set the merged data in the state
    setRows(mergedData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //   const deleteUser = (id) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.value) {
  //         deleteApi(id);
  //       }
  //     });
  //   };

  //   const deleteApi = async (id) => {
  //     const userDoc = doc(db, "users", id);
  //     await deleteDoc(userDoc);
  //     Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //     getUsers();
  //   };

  //   const filterData = (v) => {
  //     if (v) {
  //       setRows([v]);
  //     } else {
  //       setRows([]);
  //       getUsers();
  //     }
  //   };

  //   const editData = (
  //     id,
  //     fname,
  //     lname,
  //     mname,
  //     emailAdd,
  //     password,
  //     contactNo,
  //     birthday,
  //     address,
  //     stateP,
  //     city,
  //     postal,
  //     country
  //   ) => {
  //     const data = {
  //       id: id,
  //       fname: fname,
  //       lname: lname,
  //       mname: mname,
  //       emailAdd: emailAdd,
  //       password: password,
  //       contactNo: contactNo,
  //       birthday: birthday,
  //       address: address,
  //       stateP: stateP,
  //       city: city,
  //       postal: postal,
  //       country: country,
  //     };
  //     setFormid(data);
  //     handleOpenUser();
  //     console.log(id);
  //   };

  // const row = {
  //   birthday: row.birthday, // Example birthday value
  // };

  return (
    <>
      {/* Modal */}
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "auto",
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
            "@media (prefers-reduced-motion: no-preference)": {
              // width: 400,
              // transform: "translate(-87%, -110%)",
            },
          }}
        >
          <AddUser closeEvent={handleClose} />
        </Box>
      </Modal>

      <Modal
        keepMounted
        open={openUser}
        onClose={handleCloseUser}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            height: "auto",
            bgcolor: "background.paper",
            borderRadius: 5,
            boxShadow: 24,
            p: 4,
          }}
        >
          <EditUser closeEvent={handleCloseUser} fid={formid} />
        </Box>
      </Modal>

      {/* Header */}
      <Typography gutterBottom variant="h5" component="div">
        Products List
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        className="my-2 mb-2"
        sx={{ marginBottom: "20px", alignContent: "center" }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(row) => row.fname || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Search" />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          New User
        </Button>
      </Stack>
      <Paper
        sx={{
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "2",
        }}
      >
        <TableContainer
          sx={{
            maxHeight: 440,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Book Id
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  UserId
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Qty
                </TableCell>

                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell align="left">{row.book}</TableCell>
                    <TableCell align="left">{row.userId}</TableCell>
                    <TableCell align="left">{row.bookQty}</TableCell>
                    {/* <TableCell align="left">{row.emailAdd}</TableCell>
                    <TableCell align="left">{row.contactNo}</TableCell>
                    <TableCell align="left">
                      {" "}
                      {row.birthday && row.birthday instanceof Timestamp
                        ? row.birthday.toDate().toLocaleDateString()
                        : ""}
                    </TableCell>
                    <TableCell align="left">
                      {row.address +
                        ", " +
                        row.city +
                        ", " +
                        row.StateP +
                        ", " +
                        row.country +
                        ", " +
                        row.postal}
                    </TableCell>
                    <TableCell align="left">
                      {" "}
                      {row.createdDate && row.createdDate instanceof Timestamp
                        ? row.createdDate.toDate().toLocaleDateString()
                        : null}
                    </TableCell> */}

                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                          }}
                          className="cursor-pointer"
                          onClick={() =>
                            editData(
                              row.id,
                              row.fname,
                              row.lname,
                              row.mname,
                              row.emailAdd,
                              row.password,
                              row.contactNo,
                              row.birthday,
                              row.address,
                              row.StateP,
                              row.city,
                              row.postal,
                              row.country
                            )
                          }
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteUser(row.id)}
                        />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
