import React from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../features/apiSlice";
import { useState } from "react";
export default function AdminProducts() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", description: "" });

  const startEdit = (product) => {
    setEditId(product._id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
    });
  };

  const handleUpdate = async () => {
    await updateProduct({ id: editId, data: form });
    setEditId(null);
  };

  const handleDelete = async (id) => {
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
                <div className="space-y-2">
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full border px-3 py-1 rounded"
                  />
                  <input
                    value={form.price}
                    type="number"
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="w-full border px-3 py-1 rounded"
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full border px-3 py-1 rounded"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p>{p.description}</p>
                  <p className="text-blue-600 font-bold">Rs {p.price}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => startEdit(p)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
