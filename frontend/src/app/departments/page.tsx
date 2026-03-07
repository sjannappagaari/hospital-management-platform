import Link from 'next/link';

export default function Departments() {
  const departments = [
    {
      id: 'dept-1',
      name: 'Cardiology',
      description: 'Heart and cardiovascular care',
      doctors: 15,
    },
    {
      id: 'dept-2',
      name: 'Orthopedics',
      description: 'Bone and joint surgery',
      doctors: 12,
    },
    {
      id: 'dept-3',
      name: 'Neurology',
      description: 'Nervous system care',
      doctors: 10,
    },
    {
      id: 'dept-4',
      name: 'Oncology',
      description: 'Cancer treatment',
      doctors: 8,
    },
    {
      id: 'dept-5',
      name: 'Pediatrics',
      description: 'Child care and treatment',
      doctors: 18,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-sm hover:opacity-80">← Back to Home</Link>
          <h1 className="text-4xl font-bold mt-4">Our Departments</h1>
          <p>Specialized care across multiple medical fields</p>
        </div>
      </header>

      {/* Departments Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept) => (
              <div key={dept.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-blue-600 mb-2">{dept.name}</h2>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{dept.doctors} doctors available</span>
                  <Link
                    href={`/doctors?dept=${dept.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    View Doctors
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
