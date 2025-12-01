import React, { useState } from "react";
import { useGetProductsQuery } from "../features/apiSlice";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const [filter, setFilter] = useState("all");

  // ✅ Filter products based on selected category
  const filteredProducts =
    filter === "gent"
      ? products.filter((p) => p.category === "gent")
      : filter === "ladies"
      ? products.filter((p) => p.category === "ladies")
      : products;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Our Products
      </h2>

      {/* ✅ Sticky Filter Bar */}
      <div className="sticky top-16 bg-gray-50 py-3 z-40 flex justify-center gap-4 mb-8 shadow-md">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("gent")}
          className={`px-4 py-2 rounded ${
            filter === "gent"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Gent
        </button>
        <button
          onClick={() => setFilter("ladies")}
          className={`px-4 py-2 rounded ${
            filter === "ladies"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Ladies
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No {filter !== "all" ? filter : ""} products available.
        </p>
      )}
    </div>
  );
}
