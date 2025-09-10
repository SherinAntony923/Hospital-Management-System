// import React from 'react';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Admin Dashboard</h2>
//       <p className="mb-4">Manage doctors, departments, patients, appointments, and items.</p>

//       <div className="row g-3">
//         <div className="col-md-3">
//           <Link to="/admin/doctors" className="btn btn-primary w-100">Doctor Manager</Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/admin/add-doctor" className="btn btn-outline-primary w-100">➕ Add Doctor</Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/admin/patients" className="btn btn-success w-100">Patient Records</Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/admin/departments" className="btn btn-info w-100">Department Manager</Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/admin/appointment-requests" className="btn btn-warning w-100">
//             Manage Appointment Requests
//           </Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/admin/appointments" className="btn btn-warning w-100">
//             Appointment Scheduler
//           </Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/admin/add-items" className="btn btn-dark w-100">➕ Add Items</Link>
//         </div>
//         <div className="col-md-3">
//           <Link to="/admin/view-items" className="btn btn-secondary w-100">📦 View Items</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import patientImage from "../assets/hospital.jpg"; 


const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
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
          {/* <button className="btn btn-info" onClick={() => navigate("/view-profile")}>
            View Profile
          </button> */}
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        {/* Content Area */}
<div className="admin-content-area">
  <h2>Admin Dashboard</h2>
  <p>Manage doctors, departments, patients, appointments, and items.</p>

  <div className="dashboard-image-container">
    <img src={patientImage} alt="Admin Dashboard" />
  </div>
</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
