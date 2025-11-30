import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import UploadProduct from "./pages/UploadProduct";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedAdmin = localStorage.getItem("isAdmin");
    if (storedAdmin === "true") setIsAdmin(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  return (
    <Router>
      <ScrollToTop />
      <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/home" element={<AdminHome />} />
        <Route
          path="/admin/login"
          element={<AdminLogin setIsAdmin={setIsAdmin} />}
        />
        <Route path="/admin/upload" element={<UploadProduct />} />
      </Routes>
    </Router>
  );
}
