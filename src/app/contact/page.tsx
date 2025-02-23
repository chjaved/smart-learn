"use client"; // Ensures this is a client-side component

import { useState } from "react";
import Footer from "@/components/Footer"; // Import Footer Component

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the backend)
    console.log(formData);
    alert("Your message has been submitted!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-8 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-4">Get in Touch</h2>
          <div className="text-center text-gray-700 mb-8">
            <p>
              We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to drop us a message.
            </p>
          </div>

          {/* Contact Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-blue-100 rounded-full shadow-lg mb-4">
                <i className="fas fa-envelope text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-gray-600 text-center">contact@smartlearn.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-green-100 rounded-full shadow-lg mb-4">
                <i className="fas fa-phone-alt text-4xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-gray-600 text-center">+123 456 7890</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-4 bg-red-100 rounded-full shadow-lg mb-4">
                <i className="fas fa-map-marker-alt text-4xl text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Location</h3>
              <p className="text-gray-600 text-center">123 Learning St, Education City, Country</p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Write your message"
                rows={5}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
              Submit
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
