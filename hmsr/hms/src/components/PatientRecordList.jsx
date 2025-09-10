// import React, { useEffect, useState } from 'react';
// import api from '../api';

// const PatientRecordList = () => {
//   const [patients, setPatients] = useState([]);

//   const fetchPatients = async () => {
//     try {
//       const res = await api.get('/patients/');
//       setPatients(res.data);
//     } catch (error) {
//       console.error('Failed to fetch patients:', error);
//     }
//   };

//   const toggleStatus = async (id) => {
//     try {
//       const res = await api.post(`/patients/${id}/toggle/`);
//       const updated = patients.map((p) =>
//         p.id === id ? { ...p, is_active: res.data.is_active } : p
//       );
//       setPatients(updated);
//     } catch (error) {
//       console.error('Failed to toggle status:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h3>Registered Patients</h3>
//       {patients.length === 0 ? (
//         <p>No patients found.</p>
//       ) : (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Date Joined</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {patients.map((patient) => (
//               <tr key={patient.id}>
//                 <td>{patient.username}</td>
//                 <td>{patient.email}</td>
//                 <td>{patient.is_active ? 'Active' : 'Inactive'}</td>
//                 <td>{new Date(patient.date_joined).toLocaleDateString()}</td>
//                 <td>
//                   <button
//                     className={`btn ${patient.is_active ? 'btn-danger' : 'btn-success'}`}
//                     onClick={() => toggleStatus(patient.id)}
//                   >
//                     {patient.is_active ? 'Deactivate' : 'Activate'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default PatientRecordList;

import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // reuse the AdminDashboard CSS

const PatientRecordList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await api.get('/patients/');
      setPatients(res.data);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    }
  };

  const toggleStatus = async (id) => {
    try {
      const res = await api.post(`/patients/${id}/toggle/`);
      const updated = patients.map((p) =>
        p.id === id ? { ...p, is_active: res.data.is_active } : p
      );
      setPatients(updated);
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

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

        {/* Patient Record Content */}
        <div className="admin-content-area">
          <h3>Registered Patients</h3>
          {patients.length === 0 ? (
            <p>No patients found.</p>
          ) : (
            <table className="table table-bordered mt-3">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date Joined</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.username}</td>
                    <td>{patient.email}</td>
                    <td>{patient.is_active ? 'Active' : 'Inactive'}</td>
                    <td>{new Date(patient.date_joined).toLocaleDateString()}</td>
                    <td>
                      <button
                        className={`btn ${patient.is_active ? 'btn-danger' : 'btn-success'}`}
                        onClick={() => toggleStatus(patient.id)}
                      >
                        {patient.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecordList;
