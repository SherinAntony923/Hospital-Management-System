// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';

// const AdminAddDoctor = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     specialization: '',
//     department: '',
//     experience: '',
//   });

//   const [departments, setDepartments] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   // Fetch departments for dropdown
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await api.get('/departments/');
//         setDepartments(response.data);
//       } catch (err) {
//         console.error('Failed to fetch departments:', err);
//       }
//     };

//     fetchDepartments();
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await api.post('/create-doctor/', formData);
//       alert('Doctor created successfully!');
//       navigate('/admin/doctors'); // navigate to doctor list
//     } catch (err) {
//       if (err.response && err.response.data) {
//         // Show specific error from backend
//         const errorData = err.response.data;
//         const errorMsg = Object.values(errorData).flat().join(', ');
//         setError(errorMsg);
//       } else {
//         setError('An unexpected error occurred.');
//       }
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>
//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="w-full p-2 border rounded"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="specialization"
//           placeholder="Specialization"
//           className="w-full p-2 border rounded"
//           value={formData.specialization}
//           onChange={handleChange}
//           required
//         />
//         <select
//           name="department"
//           className="w-full p-2 border rounded"
//           value={formData.department}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Department</option>
//           {departments.map(dep => (
//             <option key={dep.id} value={dep.id}>{dep.name}</option>
//           ))}
//         </select>
//         <input
//           type="number"
//           name="experience"
//           placeholder="Experience (years)"
//           className="w-full p-2 border rounded"
//           value={formData.experience}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Add Doctor
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminAddDoctor;


import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Sidebar & layout CSS

const AdminAddDoctor = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    specialization: '',
    department: '',
    experience: '',
  });

  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/departments/');
        setDepartments(response.data);
      } catch (err) {
        console.error('Failed to fetch departments:', err);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post('/create-doctor/', formData);
      alert('Doctor created successfully!');
      navigate('/admin/doctors');
    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMsg = Object.values(errorData).flat().join(', ');
        setError(errorMsg);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h3>Admin Panel</h3>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/admin/doctors")}>Doctor Manager</li>
          <li onClick={() => navigate("/admin/add-doctor")}>➕ Add Doctor</li>
          <li onClick={() => navigate("/admin/patients")}>Patient Records</li>
          <li onClick={() => navigate("/admin/departments")}>Department Manager</li>
          <li onClick={() => navigate("/admin/appointment-requests")}>Manage Appointment Requests</li>
          <li onClick={() => navigate("/admin/appointments")}>Appointment Scheduler</li>
          <li onClick={() => navigate("/admin/add-items")}>➕ Add Items</li>
          <li onClick={() => navigate("/admin/view-items")}>📦 View Items</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="admin-main-content">
        {/* Top Navbar */}
        <nav className="admin-top-navbar">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Add Doctor Form */}
        <div
          className="admin-content-area"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '30px',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '500px',
              background: '#fff',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#0d6efd' }}>Add Doctor</h2>
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              >
                <option value="">Select Department</option>
                {departments.map(dep => (
                  <option key={dep.id} value={dep.id}>{dep.name}</option>
                ))}
              </select>
              <input
                type="number"
                name="experience"
                placeholder="Experience (years)"
                value={formData.experience}
                onChange={handleChange}
                required
                style={{
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#0d6efd',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  transition: 'background 0.3s',
                }}
                onMouseOver={e => (e.target.style.background = '#0b5ed7')}
                onMouseOut={e => (e.target.style.background = '#0d6efd')}
              >
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddDoctor;
