import React from "react";
import SideBar from "./components/sidebar/sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/userManagement/users";
import Books from "./pages/books/books";
import BookManagement from "./pages/books/bookTable";
import Reservation from "./pages/reservation";
import Catalog from "./pages/catalogRep/catalogs";
import CatalogSettings from "./pages/catalogRep/catalogSettings";
import BookLoan from "./pages/books/bookloan";
import Login from "../src/authentication/login";
import "../src/App.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" exact element={<Dashboard />}></Route>

            <Route path="/catalog" exact element={<Catalog />}></Route>
            <Route path="/catalogsearch" exact element={<Books />}></Route>

            <Route path="/bookLoan" exact element={<BookLoan />}></Route>
            <Route path="/reservation" exact element={<Reservation />}></Route>
            <Route path="/userSettings" exact element={<Users />}></Route>
            <Route
              path="/catalogSettings"
              exact
              element={<CatalogSettings />}
            ></Route>
            <Route
              path="/bookSettings"
              exact
              element={<BookManagement />}
            ></Route>

            <Route path="/login" exact element={<Login />}></Route>
            {/* <Route
              path="/bookSettings"
              exact
              element={<BookManagement />}
            ></Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
