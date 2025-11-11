import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import AdminHome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";
import UploadProduct from "./pages/UploadProduct";

function App() {
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
      {/* ✅ Navbar must be inside Router */}
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

export default App;
