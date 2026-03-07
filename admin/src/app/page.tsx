'use client';

import { useState } from 'react';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogin = (e: any) => {
    e.preventDefault();
    if (email === 'admin@hospitaldemo.in' && password === 'Admin@123') {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-2 text-blue-600">Apollo Hospital</h1>
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">Admin Dashboard</h2>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                placeholder="admin@hospitaldemo.in"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border px-4 py-2 rounded"
                placeholder="Admin@123"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm text-gray-600"><strong>Demo Credentials:</strong></p>
            <p className="text-sm text-gray-600">Email: admin@hospitaldemo.in</p>
            <p className="text-sm text-gray-600">Password: Admin@123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">🏥 Apollo Hospital Admin</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
          <nav className="space-y-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === 'doctors' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              👨‍⚕️ Doctors
            </button>
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === 'appointments' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              📅 Appointments
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === 'departments' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              🏢 Departments
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === 'blog' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              📝 Blog
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`}
            >
              ⚙️ Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Doctors', value: '200', icon: '👨‍⚕️' },
                  { label: 'Total Patients', value: '50K', icon: '👥' },
                  { label: 'Appointments Today', value: '45', icon: '📅' },
                  { label: 'Hospital Beds', value: '500', icon: '🏨' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded shadow">
                    <div className="text-2xl mb-2">{stat.icon}</div>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Recent Appointments</h3>
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2">Patient</th>
                      <th className="text-left px-4 py-2">Doctor</th>
                      <th className="text-left px-4 py-2">Date</th>
                      <th className="text-left px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { patient: 'Arjun Singh', doctor: 'Dr. Rajesh Kumar', date: '2026-03-15', status: 'Approved' },
                      { patient: 'Meera Gupta', doctor: 'Dr. Priya Sharma', date: '2026-03-16', status: 'Pending' },
                      { patient: 'Ravi Patel', doctor: 'Dr. Amit Singh', date: '2026-03-17', status: 'Approved' },
                    ].map((apt, i) => (
                      <tr key={i} className="border-t">
                        <td className="px-4 py-2">{apt.patient}</td>
                        <td className="px-4 py-2">{apt.doctor}</td>
                        <td className="px-4 py-2">{apt.date}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            apt.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Manage Doctors</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
                + Add New Doctor
              </button>
              <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2">Name</th>
                      <th className="text-left px-4 py-2">Specialization</th>
                      <th className="text-left px-4 py-2">Experience</th>
                      <th className="text-left px-4 py-2">Fee</th>
                      <th className="text-left px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: 'Dr. Rajesh Kumar', spec: 'Cardiology', exp: '15 years', fee: '₹500' },
                      { id: 2, name: 'Dr. Priya Sharma', spec: 'Orthopedics', exp: '12 years', fee: '₹400' },
                      { id: 3, name: 'Dr. Amit Singh', spec: 'Neurology', exp: '10 years', fee: '₹450' },
                    ].map((doc) => (
                      <tr key={doc.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{doc.name}</td>
                        <td className="px-4 py-2">{doc.spec}</td>
                        <td className="px-4 py-2">{doc.exp}</td>
                        <td className="px-4 py-2">{doc.fee}</td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 hover:underline mr-4">Edit</button>
                          <button className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Manage Appointments</h2>
              <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2">Patient</th>
                      <th className="text-left px-4 py-2">Doctor</th>
                      <th className="text-left px-4 py-2">Date & Time</th>
                      <th className="text-left px-4 py-2">Status</th>
                      <th className="text-left px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, patient: 'Arjun Singh', doctor: 'Dr. Rajesh Kumar', time: '2026-03-15 10:00 AM', status: 'Approved' },
                      { id: 2, patient: 'Meera Gupta', doctor: 'Dr. Priya Sharma', time: '2026-03-16 02:30 PM', status: 'Pending' },
                    ].map((apt) => (
                      <tr key={apt.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{apt.patient}</td>
                        <td className="px-4 py-2">{apt.doctor}</td>
                        <td className="px-4 py-2">{apt.time}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded text-sm ${
                            apt.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 hover:underline mr-4">View</button>
                          <button className="text-orange-600 hover:underline mr-4">Approve</button>
                          <button className="text-red-600 hover:underline">Reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Departments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Cardiology', 'Orthopedics', 'Neurology', 'Oncology'].map((dept, i) => (
                  <div key={i} className="bg-white p-6 rounded shadow">
                    <h3 className="font-semibold text-lg mb-2">{dept}</h3>
                    <p className="text-gray-600 mb-4">Manage department details and doctors</p>
                    <button className="text-blue-600 hover:underline">Edit Department</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'blog' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Manage Blog Posts</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-700">
                + New Blog Post
              </button>
              <div className="bg-white rounded shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-2">Title</th>
                      <th className="text-left px-4 py-2">Author</th>
                      <th className="text-left px-4 py-2">Date</th>
                      <th className="text-left px-4 py-2">Status</th>
                      <th className="text-left px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, title: 'Understanding Heart Disease', author: 'Dr. Rajesh Kumar', date: '2026-02-15', status: 'Published' },
                      { id: 2, title: 'Joint Health and Exercise', author: 'Dr. Priya Sharma', date: '2026-02-20', status: 'Published' },
                    ].map((post) => (
                      <tr key={post.id} className="border-t hover:bg-gray-50">
                        <td className="px-4 py-2">{post.title}</td>
                        <td className="px-4 py-2">{post.author}</td>
                        <td className="px-4 py-2">{post.date}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 rounded text-sm bg-green-100 text-green-800">
                            {post.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 hover:underline mr-4">Edit</button>
                          <button className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Settings</h2>
              <div className="bg-white p-6 rounded shadow max-w-md">
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Hospital Name</label>
                  <input
                    type="text"
                    defaultValue="Apollo Hospital"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Contact Email</label>
                  <input
                    type="email"
                    defaultValue="info@apollohospital.com"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    defaultValue="+91-11-4141-2000"
                    className="w-full border px-4 py-2 rounded"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
