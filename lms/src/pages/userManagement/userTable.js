// Import the necessary dependencies
import React, { useState, useEffect } from "react";
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
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const rows = [];

export default function StickyHeadTable() {
  //modal//
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Perform form submission logic here
    console.log("Submitted username:", username);
    console.log("Submitted password:", password);
    handleClose();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    borderRadius: 5,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //table

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const empCollectionRef = collection(db, "users");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async id => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getUsers();
  };

  const filterData = v => {
    if (v) {
      setRows([v]);
    } else {
      setRows([]);
      getUsers();
    }
  };

  return (
    <>
      {/* modal */}
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <AddUser closeEvent={handleClose} />
          </Box>
        </Modal>
      </div>

      {/* header */}
      <Typography gutterBottom variant="h5" component="div">
        Products List
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        className="my-2 mb-2"
        sx={{ marginBottom: "20px", width: "80%", alignContent: "center" }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={rows => rows.firstName || ""}
          renderInput={params => (
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
          endIcon={<AddCircleIcon />}
          onClick={handleOpen}
        >
          Add
        </Button>
      </Stack>
      <Paper
        sx={{
          width: "80%",
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
                {/* {columns.map(column => ( */}
                <TableCell
                  // key={column.id}
                  align="left"
                  style={{ minWidth: "100px" }}
                >
                  Firstname
                </TableCell>
                <TableCell
                  // key={column.id}
                  align="left"
                  style={{ minWidth: "100px" }}
                >
                  Lastname
                </TableCell>
                <TableCell
                  // key={column.id}
                  align="left"
                  style={{ minWidth: "100px" }}
                >
                  Age
                </TableCell>
                <TableCell
                  // key={column.id}
                  align="left"
                  // style={{ minWidth: "100px" }}
                >
                  Actions
                </TableCell>

                {/* ))} */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}>
                      {/* {columns.map(column => {
                      const value = row[column.id];
                      return ( */}
                      <TableCell key={row.id} align="left">
                        {row.firstName}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.lastName}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        {row.age}
                      </TableCell>
                      <TableCell key={row.id} align="left">
                        <Stack spacing={2} direction="row">
                          <EditIcon
                            style={{
                              fontSize: "20px",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            className="cursor-pointer"
                            // onClick={() => editUser(row.id)}
                          />
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "darkred",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteUser(row.id);
                            }}
                          />
                        </Stack>
                      </TableCell>

                      {/* ); })} */}
                    </TableRow>
                  );
                })}
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
