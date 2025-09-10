// import React, { useState, useEffect } from 'react';
// import api from '../api';

// const DoctorManager = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [editDoctorId, setEditDoctorId] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     specialization: '',
//     department: '',
//     experience: '',
//   });
//   const [selectedDepartment, setSelectedDepartment] = useState('all'); // 'all' means show all

//   useEffect(() => {
//     fetchDoctors();
//     fetchDepartments();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const res = await api.get('/doctors/');
//       setDoctors(res.data);
//     } catch (err) {
//       console.error('Error fetching doctors:', err);
//     }
//   };

//   const fetchDepartments = async () => {
//     try {
//       const res = await api.get('/departments/');
//       setDepartments(res.data);
//     } catch (err) {
//       console.error('Error fetching departments:', err);
//     }
//   };

//   const handleEdit = (doctor) => {
//     setEditDoctorId(doctor.id);
//     setFormData({
//       username: doctor.username || '',
//       email: doctor.email || '',
//       specialization: doctor.specialization || '',
//       department: doctor.department_id || '',  // make sure backend sends department_id
//       experience: doctor.experience?.toString() || '',
//     });
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//       const updatedData = {
//         ...formData,
//         experience: parseInt(formData.experience) || 0,
//       };
//       await api.put(`/doctors/${editDoctorId}/update/`, updatedData);
//       setEditDoctorId(null);
//       fetchDoctors();
//     } catch (err) {
//       console.error('Error updating doctor:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/doctors/${id}/delete/`);
//       fetchDoctors();
//     } catch (err) {
//       console.error('Error deleting doctor:', err);
//     }
//   };

//   // Filter doctors based on selected department
//   const filteredDoctors = selectedDepartment === 'all'
//     ? doctors
//     : doctors.filter(doc => doc.department_id === selectedDepartment);

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Doctor Management</h2>

//       {/* Department filter buttons */}
//       <div className="mb-3">
//         <button
//           className={`btn btn-sm me-2 ${selectedDepartment === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
//           onClick={() => setSelectedDepartment('all')}
//         >
//           All
//         </button>
//         {departments.map(dept => (
//           <button
//             key={dept.id}
//             className={`btn btn-sm me-2 ${selectedDepartment === dept.id ? 'btn-primary' : 'btn-outline-primary'}`}
//             onClick={() => setSelectedDepartment(dept.id)}
//           >
//             {dept.name}
//           </button>
//         ))}
//       </div>

//       <table className="table table-bordered">
//         <thead className="table-dark">
//           <tr>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Specialization</th>
//             <th>Department</th>
//             <th>Experience</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredDoctors.map((doc) => (
//             <tr key={doc.id}>
//               <td>
//                 {editDoctorId === doc.id ? (
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   doc.username
//                 )}
//               </td>
//               <td>
//                 {editDoctorId === doc.id ? (
//                   <input
//                     type="email"
//                     className="form-control"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   doc.email
//                 )}
//               </td>
//               <td>
//                 {editDoctorId === doc.id ? (
//                   <input
//                     type="text"
//                     className="form-control"
//                     name="specialization"
//                     value={formData.specialization}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   doc.specialization || 'N/A'
//                 )}
//               </td>
//               <td>
//                 {editDoctorId === doc.id ? (
//                   <select
//                     className="form-control"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                   >
//                     <option value="">-- Select Department --</option>
//                     {departments.map((dept) => (
//                       <option key={dept.id} value={dept.id}>
//                         {dept.name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   doc.department || 'N/A'
//                 )}
//               </td>
//               <td>
//                 {editDoctorId === doc.id ? (
//                   <input
//                     type="number"
//                     className="form-control"
//                     name="experience"
//                     value={formData.experience}
//                     onChange={handleChange}
//                   />
//                 ) : (
//                   doc.experience || 'N/A'
//                 )}
//               </td>
//               <td>
//                 {editDoctorId === doc.id ? (
//                   <button className="btn btn-success btn-sm" onClick={handleUpdate}>
//                     Save
//                   </button>
//                 ) : (
//                   <>
//                     <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(doc)}>
//                       Edit
//                     </button>
//                     <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc.id)}>
//                       Delete
//                     </button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//           {filteredDoctors.length === 0 && (
//             <tr>
//               <td colSpan="6" className="text-center">No doctors found for this department.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DoctorManager;
import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // reuse the AdminDashboard sidebar CSS

const DoctorManager = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editDoctorId, setEditDoctorId] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    specialization: '',
    department: '',
    experience: '',
  });
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get('/doctors/');
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await api.get('/departments/');
      setDepartments(res.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const handleEdit = (doctor) => {
    setEditDoctorId(doctor.id);
    setFormData({
      username: doctor.username || '',
      email: doctor.email || '',
      specialization: doctor.specialization || '',
      department: doctor.department_id || '',
      experience: doctor.experience?.toString() || '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...formData,
        experience: parseInt(formData.experience) || 0,
      };
      await api.put(`/doctors/${editDoctorId}/update/`, updatedData);
      setEditDoctorId(null);
      fetchDoctors();
    } catch (err) {
      console.error('Error updating doctor:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/doctors/${id}/delete/`);
      fetchDoctors();
    } catch (err) {
      console.error('Error deleting doctor:', err);
    }
  };

  const filteredDoctors = selectedDepartment === 'all'
    ? doctors
    : doctors.filter(doc => doc.department_id === selectedDepartment);

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
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </nav>

        {/* Doctor Manager Content */}
        <div className="admin-content-area">
          <h2 className="mb-4">Doctor Management</h2>

          {/* Department filter buttons */}
          <div className="mb-3">
            <button
              className={`btn btn-sm me-2 ${selectedDepartment === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedDepartment('all')}
            >
              All
            </button>
            {departments.map(dept => (
              <button
                key={dept.id}
                className={`btn btn-sm me-2 ${selectedDepartment === dept.id ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setSelectedDepartment(dept.id)}
              >
                {dept.name}
              </button>
            ))}
          </div>

          {/* Doctor Table */}
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Experience</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doc) => (
                <tr key={doc.id}>
                  <td>{editDoctorId === doc.id ? <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} /> : doc.username}</td>
                  <td>{editDoctorId === doc.id ? <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} /> : doc.email}</td>
                  <td>{editDoctorId === doc.id ? <input type="text" className="form-control" name="specialization" value={formData.specialization} onChange={handleChange} /> : (doc.specialization || 'N/A')}</td>
                  <td>{editDoctorId === doc.id ? (
                    <select className="form-control" name="department" value={formData.department} onChange={handleChange}>
                      <option value="">-- Select Department --</option>
                      {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                    </select>
                  ) : (doc.department || 'N/A')}</td>
                  <td>{editDoctorId === doc.id ? <input type="number" className="form-control" name="experience" value={formData.experience} onChange={handleChange} /> : (doc.experience || 'N/A')}</td>
                  <td>
                    {editDoctorId === doc.id ? (
                      <button className="btn btn-success btn-sm" onClick={handleUpdate}>Save</button>
                    ) : (
                      <>
                        <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(doc)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filteredDoctors.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No doctors found for this department.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorManager;
