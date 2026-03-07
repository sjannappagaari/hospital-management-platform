import Link from 'next/link';

export default function Doctors() {
  const doctors = [
    {
      id: 'doc-1',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      experience: 15,
      fee: '₹500',
    },
    {
      id: 'doc-2',
      name: 'Dr. Priya Sharma',
      specialization: 'Orthopedics',
      experience: 12,
      fee: '₹400',
    },
    {
      id: 'doc-3',
      name: 'Dr. Amit Singh',
      specialization: 'Neurology',
      experience: 10,
      fee: '₹450',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-sm hover:opacity-80">← Back to Home</Link>
          <h1 className="text-4xl font-bold mt-4">Our Doctors</h1>
          <p>Expert medical professionals at your service</p>
        </div>
      </header>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="bg-gray-200 h-48 flex items-center justify-center text-6xl">👨‍⚕️</div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialization}</p>
                  <p className="text-gray-600 mb-2">{doctor.experience} years experience</p>
                  <p className="text-lg font-bold text-gray-800 mb-4">Consultation: {doctor.fee}</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
