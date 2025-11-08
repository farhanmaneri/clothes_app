import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import AdminProducts from "./pages/AdminProducts.";
import AdminHome from "./pages/AdminHome";
import FloatingWhatsApp from "./components/FloatingWhatsapp";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/home" element={<AdminHome />} />
      </Routes>
      <FloatingWhatsApp />
    </Router>
  );
}
