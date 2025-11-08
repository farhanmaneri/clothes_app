import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  const whatsappNumber = "923001234567"; // Replace with your number
  const message = encodeURIComponent(
    "Hi, I have a question about your products."
  );
  const link = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 z-50"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
}
