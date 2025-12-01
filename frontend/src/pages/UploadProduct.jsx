import React, { useState } from "react";
import { useUploadProductMutation } from "../features/apiSlice";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const [uploadProduct, { isLoading }] = useUploadProductMutation();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "", // ✅ new field
  });
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", form.image);
    formData.append("category", form.category); // ✅ send category

    await uploadProduct(formData);
    setSuccess(true);

    // Reset form
    setForm({
      title: "",
      description: "",
      price: "",
      image: null,
      category: "",
    });
    setPreview(null);
  };

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

        {/* ✅ Image Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-contain border rounded"
            />
          </div>
        )}

        <input
          type="file"
          onChange={handleFile}
          className="w-full px-4 py-2 border rounded bg-gray-50"
          required
        />

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

        {/* ✅ Category Dropdown */}
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Category</option>
          <option value="gent">Gent</option>
          <option value="ladies">Ladies</option>
        </select>

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
