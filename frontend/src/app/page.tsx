'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HospitalInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  description: string;
  totalBeds: number;
  totalDoctors: number;
  totalStaff: number;
  foundedYear: number;
}

export default function Home() {
  const [hospital, setHospital] = useState<HospitalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/hospital')
      .then(res => res.json())
      .then(data => {
        setHospital(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch hospital info:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const hospitalName = hospital?.name || 'Apollo Hospital';
  const hospitalPhone = hospital?.phone || '+91-11-4141-2000';
  const hospitalAddress = hospital?.address || '123 Medical Complex, New Delhi';
  const hospitalDescription = hospital?.description || 'Leading multi-specialty hospital providing world-class healthcare';
  const totalBeds = hospital?.totalBeds || 500;
  const totalDoctors = hospital?.totalDoctors || 200;
  const totalStaff = hospital?.totalStaff || 1000;
  const foundedYear = hospital?.foundedYear || 2010;

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">🏥 {hospitalName}</div>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/departments" className="hover:text-blue-600">Departments</Link>
            <Link href="/doctors" className="hover:text-blue-600">Doctors</Link>
            <Link href="/appointments" className="hover:text-blue-600">Book Appointment</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to {hospitalName}</h1>
          <p className="text-xl mb-8">{hospitalDescription}</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Book Appointment Now
          </button>
        </div>
      </section>

      {/* Hospital Info Section */}
      <section className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">📞 Phone</p>
              <p className="text-lg font-semibold text-blue-600">{hospitalPhone}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">📍 Location</p>
              <p className="text-sm font-semibold">{hospitalAddress}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 text-sm">ℹ️ Email</p>
              <p className="text-sm font-semibold">{hospital?.email || 'info@hospital.com'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Emergency Care', icon: '🚑' },
              { title: '24/7 ICU Support', icon: '🏨' },
              { title: 'Expert Surgeons', icon: '⚕️' },
              { title: 'Modern Technology', icon: '🔬' },
              { title: 'Patient Care', icon: '💙' },
              { title: 'Online Consultation', icon: '💻' },
            ].map((service, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2">Quality service for your health needs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {['Cardiology', 'Orthopedics', 'Neurology', 'Oncology', 'Pediatrics'].map((dept, i) => (
              <Link key={i} href={`/departments/${dept.toLowerCase()}`}>
                <div className="bg-white p-6 rounded-lg hover:shadow-lg cursor-pointer text-center">
                  <h3 className="font-semibold text-lg">{dept}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: `${totalBeds}+`, label: 'Hospital Beds' },
              { number: `${totalDoctors}+`, label: 'Expert Doctors' },
              { number: `${totalStaff}+`, label: 'Staff Members' },
              { number: '50K+', label: 'Happy Patients' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 {hospitalName}. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Providing quality healthcare since {foundedYear}</p>
        </div>
      </footer>
    </div>
  );
}
