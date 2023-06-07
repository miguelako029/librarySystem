import React from "react";
import SideBar from "./components/sidebar/sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Books from "./pages/books";
import BookManagement from "./pages/bookManagement";
import Tables from "./pages/tableReservation";
import TablesManagement from "./pages/tableManagement";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />}></Route>

          <Route path="/bookloan" exact element={<Books />}></Route>
          <Route path="/tablereserve" exact element={<Tables />}></Route>

          <Route path="/people" exact element={<Users />}></Route>
          <Route
            path="/booksettings"
            exact
            element={<BookManagement />}
          ></Route>
          <Route
            path="/tablesettings"
            exact
            element={<TablesManagement />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
