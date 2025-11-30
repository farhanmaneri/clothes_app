import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ eye icons

const passWord = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminLogin({ setIsAdmin }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === passWord) {
      setIsAdmin(true); // ✅ enables Upload + Logout
      navigate("/admin/home");
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Admin Login</h2>

        {/* Password input with eye icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // ✅ toggle type
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded pr-10"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
