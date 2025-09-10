// import React, { useState, useEffect } from 'react';
// import axios from '../api';

// const DepartmentManager = () => {
//   const [name, setName] = useState('');
//   const [departments, setDepartments] = useState([]);
//   const [editId, setEditId] = useState(null);

//   // Fetch departments from backend
//   const fetchDepartments = async () => {
//     try {
//       const res = await axios.get('/departments/');
//       setDepartments(res.data);
//     } catch (error) {
//       console.error('Failed to fetch departments:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   // Add or update department
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await axios.put(`/departments/${editId}/`, { name });
//       } else {
//         await axios.post('/departments/', { name });
//       }
//       setName('');
//       setEditId(null);
//       fetchDepartments();
//     } catch (err) {
//       alert('Error saving department');
//     }
//   };

//   // Delete department
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this department?')) {
//       try {
//         await axios.delete(`/departments/${id}/`);
//         fetchDepartments();
//       } catch (error) {
//         alert('Error deleting department');
//       }
//     }
//   };

//   // Edit department
//   const handleEdit = (dep) => {
//     setName(dep.name);
//     setEditId(dep.id);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Manage Departments</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           className="form-control my-2"
//           placeholder="Department Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           required
//         />
//         <button className="btn btn-success">
//           {editId ? 'Update Department' : 'Add Department'}
//         </button>
//         {editId && (
//           <button className="btn btn-secondary ms-2" onClick={() => { setEditId(null); setName(''); }}>
//             Cancel
//           </button>
//         )}
//       </form>

//       <h4 className="mt-4">Existing Departments</h4>
//       <ul className="list-group">
//         {departments.map(dep => (
//           <li key={dep.id} className="list-group-item d-flex justify-content-between align-items-center">
//             <span>{dep.name}</span>
//             <div>
//               <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(dep)}>Edit</button>
//               <button className="btn btn-sm btn-danger" onClick={() => handleDelete(dep.id)}>Delete</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DepartmentManager;

import React, { useState, useEffect } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // reuse AdminDashboard CSS

const DepartmentManager = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/departments/');
      setDepartments(res.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Add or update department
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/departments/${editId}/`, { name });
      } else {
        await axios.post('/departments/', { name });
      }
      setName('');
      setEditId(null);
      fetchDepartments();
    } catch (err) {
      alert('Error saving department');
    }
  };

  // Delete department
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`/departments/${id}/`);
        fetchDepartments();
      } catch (error) {
        alert('Error deleting department');
      }
    }
  };

  // Edit department
  const handleEdit = (dep) => {
    setName(dep.name);
    setEditId(dep.id);
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

        {/* Department Manager Content */}
        <div className="admin-content-area">
          <h2>Manage Departments</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control my-2"
              placeholder="Department Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <button className="btn btn-success">
              {editId ? 'Update Department' : 'Add Department'}
            </button>
            {editId && (
              <button
                className="btn btn-secondary ms-2"
                onClick={() => { setEditId(null); setName(''); }}
              >
                Cancel
              </button>
            )}
          </form>

          <h4 className="mt-4">Existing Departments</h4>
          <ul className="list-group">
            {departments.map(dep => (
              <li key={dep.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{dep.name}</span>
                <div>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(dep)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(dep.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManager;
