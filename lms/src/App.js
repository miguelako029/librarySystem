import React from "react";
import SideBar from "./components/sidebar/sidebar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Users from "./pages/users";
import Books from "./pages/books";
import Categories from "./pages/categories";
import Tables from "./pages/tableSchedule";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />}></Route>
          <Route path="/users" exact element={<Users />}></Route>
          <Route path="/books" exact element={<Books />}></Route>
          <Route path="/categories" exact element={<Categories />}></Route>
          <Route path="/tables" exact element={<Tables />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
