// import React, { useState, useEffect } from "react";
// import { Button, ListItemText } from "@mui/material";
// import { List, ListItem } from "@mui/material";
// import { useParams, Link } from "react-router-dom"; // Import useParams to get the catalog id from the URL

// import { db } from "../../firebase-config";
// import { collection, getDocs } from "firebase/firestore";
// import { useAppStore } from "../../AppStore";

// const empCollectionRef = collection(db, "catalog");

// const Catalog = () => {
//   const setRows = useAppStore((state) => state.setRows);
//   const { id } = useParams(); // Get the catalog id from the URL
//   const [catalogs, setCatalogs] = useState([]); // Initialize catalogs as an empty array

//   const getCatalogs = async () => {
//     const data = await getDocs(empCollectionRef);
//     const catalogData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//     setCatalogs(catalogData); // Update the state with fetched catalogs
//   };

//   useEffect(() => {
//     getCatalogs(); // Fetch catalogs when the component mounts
//   }, []);

//   const books = {
//     Fiction: ["Book 1", "Book 2", "Book 3"],
//     "Non-fiction": ["Book A", "Book B", "Book C"],
//     Science: ["Book X", "Book Y", "Book Z"],
//     History: ["Book I", "Book II", "Book III"],
//   };

//   // Ensure that the selected catalog id is valid
//   if (!id || !books[id]) {
//     return <div>Catalog not found.</div>;
//   }

//   return (
//     <>
//       {catalogs.map((catalog, index) => (
//         <Button
//           variant="contained"
//           key={index}
//           component={Link}
//           to={`/catalog/${catalog.id}`}
//           sx={{ margin: "2px" }}
//         >
//           {catalog.catalog_name}
//         </Button>
//       ))}
//       <List>
//         {books[id].map((book, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={book} />
//           </ListItem>
//         ))}
//       </List>
//     </>
//   );
// };

// export default Catalog;
