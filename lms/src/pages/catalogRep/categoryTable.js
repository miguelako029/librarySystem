import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

export default function Category({ onCheckboxChange }) {
  const [rows, setRows] = useState([]);
  const [isButtonVisible, setButtonVisible] = useState(false);

  // Fetch data from Firestore and update the rows state
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(data);
    };

    fetchData();
  }, []);

  const handleCheckboxChange = event => {
    const isChecked = event.target.checked;
    onCheckboxChange(isChecked);
    setButtonVisible(isChecked);
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
            {rows.map(data => (
              <TableRow
                key={data.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Checkbox onClick={handleCheckboxChange} />
                </TableCell>
                <TableCell>{data.category_name}</TableCell>
                <TableCell align="right">{data.description}</TableCell>
                <TableCell align="right">{data.created}</TableCell>
                <TableCell align="right">{data.updated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
