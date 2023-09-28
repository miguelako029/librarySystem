import React, { useState, useEffect, useContext } from "react";
import {
  ButtonGroup,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Button,
  Modal,
  Box,
  Stack,
} from "@mui/material";

import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useAppStore } from "../../AppStore";
import { AuthContextProvide } from "../../components/context/AuthenticatorContext";
import AddUser from "../userManagement/addUser";
import EditUser from "../userManagement/editUser";
import { db } from "../../firebase-config";

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
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenUser = () => setOpenUser(true);
  const handleCloseUser = () => setOpenUser(false);

  useEffect(() => {
    getUserCart();
  }, []);

  const mergeRows = (data) => {
    const mergedData = [];
    const seenBooks = new Set();

    data.forEach((item) => {
      if (!seenBooks.has(item.book)) {
        seenBooks.add(item.book);
        mergedData.push(item);
      } else {
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

  const getUserCart = async () => {
    const querySnapshot = await getDocs(empCollectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const filteredData = data.filter((item) => item.userId === currentUser.uid);
    const mergedData = mergeRows(filteredData);

    setRows(mergedData);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [counter, setCounter] = useState(0);
  const handleIncrement = () => setCounter(counter + 1);
  const handleDecrement = () => setCounter(counter - 1);

  return (
    <>
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
                  Item
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Quantity
                </TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    style={{
                      backgroundColor:
                        selectedRow?.id === row.id ? "#f0f0f0" : "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <TableCell align="left">{row.bookName}</TableCell>
                    <TableCell align="left">
                      <ButtonGroup
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button onClick={handleDecrement}>-</Button>
                        <Button>{row.bookQty + counter}</Button>
                        <Button onClick={handleIncrement}>+</Button>
                      </ButtonGroup>
                    </TableCell>
                    <TableCell align="left" position="fixed">
                      <Stack spacing={2} direction="row">
                        <div
                          style={{
                            bottom: 0,
                            right: 0,
                            margin: "10px",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => deleteUser(row.id)}
                          >
                            Delete
                          </Button>
                        </div>
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
