import React, { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../features/apiSlice";

export default function AdminProducts() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", description: "" });
  const [preview, setPreview] = useState(null);

  const startEdit = (product) => {
    setEditId(product._id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
    });
    setPreview(product.imageUrl); // ✔ Show image preview during edit
  };

  const handleUpdate = async () => {
    await updateProduct({ id: editId, data: form });
    setEditId(null);
    setPreview(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this product? This cannot be undone!"
    );
    if (!confirmDelete) return;

    await deleteProduct(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Manage Products</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow">
              {editId === p._id ? (
                <>
                  {/* ✔ Image Preview */}
                  {preview && (
                    <div className="mb-3">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-64 object-contain border rounded"
                      />
                    </div>
                  )}

                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full border px-3 py-1 rounded mb-2"
                    placeholder="Product Title"
                  />

                  <input
                    value={form.price}
                    type="number"
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full border px-3 py-1 rounded mb-2"
                    placeholder="Price"
                  />

                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full border px-3 py-1 rounded mb-2"
                    placeholder="Description"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditId(null);
                        setPreview(null);
                      }}
                      className="bg-gray-500 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* ✔ Show image in normal mode */}
                  {p.imageUrl && (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-64 object-cover rounded mb-2"
                    />
                  )}

                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p>{p.description}</p>
                  <p className="text-blue-600 font-bold">Rs {p.price}</p>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
