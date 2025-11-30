import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductCard({ product, isAdmin, onEdit, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const whatsappNumber = "923320926641"; // Replace with your number
  const message = `Hi, I am interested in buying this item:\n\nTitle: ${product.title}\nPrice: Rs ${product.price}\nImage: ${product.imageUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const isOutOfStock = product.stock === 0 || product.status === "out";

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition duration-300 transform hover:-translate-y-1 overflow-hidden relative">
      {/* Out of Stock Tag */}
      {isOutOfStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <img
        src={product.imageUrl}
        alt={product.title}
        onClick={() => setIsModalOpen(true)} // ✅ open modal on click
        className={`w-full h-auto object-contain cursor-pointer ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">Rs {product.price}</p>

        {/* WhatsApp Order Icon */}
        {!isOutOfStock && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-green-600 hover:text-green-700 text-sm"
            title="Order Now via WhatsApp"
          >
            <FaWhatsapp className="text-lg" />
            Order Now
          </a>
        )}

        {isAdmin && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onEdit(product)}
              className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* ✅ Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)} // close when clicking outside
        >
          <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              ✕
            </button>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
