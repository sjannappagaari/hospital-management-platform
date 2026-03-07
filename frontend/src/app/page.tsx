import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apollo Hospital - Quality Healthcare',
  description: 'Leading multi-specialty hospital providing world-class healthcare services',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">🏥 Apollo Hospital</div>
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
          <h1 className="text-5xl font-bold mb-4">Welcome to Apollo Hospital</h1>
          <p className="text-xl mb-8">Leading multi-specialty hospital providing world-class healthcare</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Book Appointment Now
          </button>
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
              { number: '500+', label: 'Hospital Beds' },
              { number: '200+', label: 'Expert Doctors' },
              { number: '1000+', label: 'Staff Members' },
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
          <p>&copy; 2026 Apollo Hospital. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Providing quality healthcare since 2010</p>
        </div>
      </footer>
    </div>
  );
}
