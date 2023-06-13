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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { db } from "../../firebase-config";
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
// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

const rows = [];

export default function StickyHeadTable() {
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
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: "10px",
        boxShadow: "2",
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Products List
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        className="my-2 mb-2"
        sx={{ marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300 }}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={rows => rows.firstName || ""}
          renderInput={params => (
            <TextField {...params} size="small" label="Search Products" />
          )}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button variant="contained" endIcon={<AddCircleIcon />}>
          Add
        </Button>
      </Stack>
      <TableContainer
        sx={{
          maxHeight: 440,
          marginLeft: "20px",
          paddingRight: "50px",
          marginBottom: "20px",
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
                style={{ minWidth: "100px" }}
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
  );
}
