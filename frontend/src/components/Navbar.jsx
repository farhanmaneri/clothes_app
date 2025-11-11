import React from "react";
import { Link } from "react-router-dom";
export default function Navbar({ isAdmin, setIsAdmin }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Cloth Store</h1>

      <div className="flex gap-4 items-center">
        <Link to="/" className="hover:text-gray-200">
          Home
        </Link>
        {/* <Link to="/products" className="hover:text-gray-200">
          Products
        </Link> */}

        {isAdmin ? (
          <>
            <Link to="/admin/home" className="hover:text-gray-200">
              Admin Home
            </Link>
            <Link
              to="/admin/upload"
              className="hover:text-gray-200 bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Upload
            </Link>
            <button
              onClick={() => setIsAdmin(false)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin/login" className="hover:text-gray-200">
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
}

