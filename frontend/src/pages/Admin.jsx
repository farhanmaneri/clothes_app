import React from "react";
import { useUploadProductMutation } from "../features/apiSlice";
import { useState } from "react";
import { Navigate } from "react-router-dom";
export default function Admin() {
  const [uploadProduct, { isLoading }] = useUploadProductMutation();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image);
    await uploadProduct(formData);
    setSuccess(true);
    setForm({ title: "", description: "", price: "", image: null });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setAuthenticated(true);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleAuth}
          className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
            Admin Login
          </h2>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-blue-600 text-center">
          Upload New Product
        </h2>

        {success && (
          <p className="text-green-600 text-center font-medium">
            ✅ Product uploaded successfully!
          </p>
        )}

        <input
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price (Rs)"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          onChange={handleFile}
          className="w-full px-4 py-2 border rounded bg-gray-50"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Uploading…" : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
