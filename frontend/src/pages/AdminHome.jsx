import React from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../features/apiSlice";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

export default function AdminHome() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", description: "" });

  const handleEdit = (product) => {
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
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Admin Product View
      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) =>
            editId === product._id ? (
              <div
                key={product._id}
                className="bg-white p-4 rounded shadow space-y-2"
              >
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border px-3 py-1 rounded"
                />
                <input
                  value={form.price}
                  type="number"
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
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
              <ProductCard
                key={product._id}
                product={product}
                isAdmin={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
