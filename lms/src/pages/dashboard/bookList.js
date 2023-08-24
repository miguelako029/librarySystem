// import React from "react";
// import { useParams } from "react-router-dom";
// import { List, ListItem, ListItemText } from "@mui/material";

// const books = {
//   Fiction: ["Book 1", "Book 2", "Book 3"],
//   "Non-fiction": ["Book A", "Book B", "Book C"],
//   Science: ["Book X", "Book Y", "Book Z"],
//   History: ["Book I", "Book II", "Book III"],
// };

// const BookList = () => {
//   const { id } = useParams();

//   return (
//     <div>
//       <h2>Books in {id} Catalog</h2>
//       <List>
//         {books[id].map((book, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={book} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default BookList;
