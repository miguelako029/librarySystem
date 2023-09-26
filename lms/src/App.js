import React, { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/userManagement/users";
import Books from "./pages/books/books";
import BookManagement from "./pages/books/bookTable";
import Reservation from "./pages/reservation";
import Cart from "./pages/cart/cart";
import CatalogSettings from "./pages/catalogRep/catalogSettings";
import BookLoan from "./pages/books/bookloan";
import Login from "./authentication/login";
import "./App.css";
import { AuthContextProvide } from "./components/context/AuthenticatorContext"; // Correct import path

export default function App() {
  const { currentUser } = useContext(AuthContextProvide);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/catalogsearch"
            element={
              <RequireAuth>
                <Books />
              </RequireAuth>
            }
          />
          <Route
            path="/bookLoan"
            element={
              <RequireAuth>
                <BookLoan />
              </RequireAuth>
            }
          />
          <Route
            path="/reservation"
            element={
              <RequireAuth>
                <Reservation />
              </RequireAuth>
            }
          />
          <Route
            path="/userSettings"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/catalogSettings"
            element={
              <RequireAuth>
                <CatalogSettings />
              </RequireAuth>
            }
          />
          <Route
            path="/bookSettings"
            element={
              <RequireAuth>
                <BookManagement />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
