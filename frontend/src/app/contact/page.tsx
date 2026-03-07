'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-sm hover:opacity-80">← Back to Home</Link>
          <h1 className="text-4xl font-bold mt-4">Contact Us</h1>
          <p>Get in touch with Apollo Hospital</p>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">📍 Address</h3>
                <p className="text-gray-600">123 Medical Complex, New Delhi, India</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📞 Phone</h3>
                <p className="text-gray-600">+91-11-4141-2000</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">📧 Email</h3>
                <p className="text-gray-600">info@apollohospital.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">🕐 Hours</h3>
                <p className="text-gray-600">24/7 Emergency Service</p>
                <p className="text-gray-600">OPD: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded text-green-700">
                ✅ Message sent! We'll contact you soon.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
              <div className="mb-4">
                <label className="block font-semibold mb-2">Name</label>
                <input type="text" className="w-full border px-4 py-2 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Email</label>
                <input type="email" className="w-full border px-4 py-2 rounded" required />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Subject</label>
                <input type="text" className="w-full border px-4 py-2 rounded" required />
              </div>
              <div className="mb-6">
                <label className="block font-semibold mb-2">Message</label>
                <textarea className="w-full border px-4 py-2 rounded h-32" required />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
