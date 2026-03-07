'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Appointments() {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    doctor: '',
    date: '',
    time: '',
    reason: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <h1 className="text-4xl font-bold mt-4">Book an Appointment</h1>
          <p>Schedule your visit with our expert doctors</p>
        </div>
      </header>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded text-green-700">
              ✅ Appointment request submitted! We'll confirm shortly.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg">
            <div className="mb-4">
              <label className="block font-semibold mb-2">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Select Doctor</label>
              <select
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
                required
              >
                <option value="">Choose a doctor...</option>
                <option value="doc-1">Dr. Rajesh Kumar (Cardiology)</option>
                <option value="doc-2">Dr. Priya Sharma (Orthopedics)</option>
                <option value="doc-3">Dr. Amit Singh (Neurology)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-semibold mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded"
                  required
                >
                  <option value="">Select time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Reason for Visit</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded h-32"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
