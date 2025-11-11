import React from "react";
import { useGetProductsQuery } from "../features/apiSlice";
import ProductCard from "../components/ProductCard";
export default function Home() {
  const { data: products = [], isLoading } = useGetProductsQuery();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">
Our Products      </h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
