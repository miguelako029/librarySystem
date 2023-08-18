import { React, useState, useEffect } from "react";
import SideBar from "../../components/sidebar/sidebar";
import TopBar from "../../components/topbar/topbar";

import { Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Plus from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Modal from "@mui/material/Modal";
import AddBooks from "../books/addBook";

// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useAppStore } from "../../AppStore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import Swal from "sweetalert2";

export default function Books() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const empCollectionRef = collection(db, "books");
  const setRows = useAppStore((state) => state.setRows);
  const rows = useAppStore((state) => state.rows);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const querySnapshot = await getDocs(empCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setRows(data);
  };

  const deleteBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    getBooks();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <AddBooks closeEvent={handleClose} />
        </Box>
      </Modal>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <AddBooks closeEvent={handleClose} />
        </Box>
      </Modal> */}

      <TopBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {" "}
          <h1>Books</h1>
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
            // onChange={(e, v) => filterData(v)}
            getOptionLabel={(row) => row.name || ""}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
          /> */}
          <Button
            sx={{ marginBottom: 3, float: "left" }}
            primary
            variant="contained"
            startIcon={<Plus />}
            onClick={handleOpen}
          >
            New Book
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Book ID</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Author(s):</TableCell>
                  <TableCell align="left">Publication Year</TableCell>
                  <TableCell align="left">Genre/Category</TableCell>
                  <TableCell align="left">Description/Summary</TableCell>
                  <TableCell align="left">Language</TableCell>
                  <TableCell align="left">Publisher</TableCell>
                  <TableCell align="left">Total Copies</TableCell>
                  <TableCell align="left">Available Copies</TableCell>
                  <TableCell align="left">Location</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.bookID}
                      </TableCell>
                      <TableCell align="left">{row.bookTitle}</TableCell>
                      <TableCell align="left">{row.bookAuthor}</TableCell>
                      <TableCell align="left">
                        {row.bookPublicationYear instanceof Timestamp
                          ? row.bookPublicationYear
                              .toDate()
                              .toLocaleDateString()
                          : ""}
                      </TableCell>
                      <TableCell align="left">{row.bookGenre}</TableCell>
                      <TableCell align="left">{row.bookDesc}</TableCell>
                      <TableCell align="left">{row.bookLanguage}</TableCell>
                      <TableCell align="left">{row.bookPublisher}</TableCell>
                      <TableCell align="left">{row.bookTotal}</TableCell>
                      <TableCell align="left">{row.bookAvailCopies}</TableCell>
                      <TableCell align="left">{row.bookLoc}</TableCell>
                      <TableCell align="center">
                        <EditIcon
                          style={{
                            fontSize: "20px",
                            color: "blue",
                            cursor: "pointer",
                            marginleft: 8,
                          }}
                          className="cursor-pointer"
                        />
                        <DeleteIcon
                          style={{
                            fontSize: "20px",
                            color: "darkred",
                            cursor: "pointer",
                          }}
                          onClick={() => deleteBook(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
