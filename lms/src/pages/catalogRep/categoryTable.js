import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";

import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  get,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useAppStore } from "../../AppStore";
import { Timestamp } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Category({ onCheckboxChange, setSelectedRow }) {
  const setRows = useAppStore(state => state.setRows);
  const rows = useAppStore(state => state.rows);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const empCollectionRef = collection(db, "catalog");

  // Fetch data from Firestore and update the rows state
  const getCatalog = async () => {
    const querySnapshot = await getDocs(empCollectionRef);
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(data);
  };

  useEffect(() => {
    getCatalog();
  }, []);

  const handleCheckboxChange = event => {
    const isChecked = event.target.checked;
    onCheckboxChange(isChecked);
  };

  const editData = (id, catalog_name, description) => {
    setSelectedRow({ id, catalog_name, description });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table fullWidth aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell> {/* Empty cell for checkbox */}
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Details</TableCell>
              <TableCell align="right">Created</TableCell>
              <TableCell align="right">Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Checkbox
                      onChange={handleCheckboxChange}
                      onClick={() =>
                        editData(row.id, row.catalog_name, row.description)
                      }
                    />
                  </TableCell>
                  <TableCell>{row.catalog_name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">
                    {" "}
                    {row.createdDate && row.createdDate instanceof Timestamp
                      ? row.createdDate.toDate().toLocaleDateString()
                      : null}
                  </TableCell>
                  <TableCell align="right">{row.updated}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
