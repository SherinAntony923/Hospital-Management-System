// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const PatientDashboard = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     navigate('/login');
//   };

//   return (
//     <>
//       {/* Top Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container-fluid">
//           <span
//             className="navbar-brand"
//             style={{ cursor: 'pointer' }}
//             onClick={() => navigate('/patient-dashboard')}
//           >
//             Patient Portal
//           </span>

//           <div className="d-flex ms-auto align-items-center">
//             <button
//               className="btn btn-light me-2"
//               onClick={() => navigate('/patient-dashboard')}
//             >
//               Home
//             </button>
//             <button
//               className="btn btn-info me-2"
//               onClick={() => navigate('/view-profile')}
//             >
//               View Profile
//             </button>
//             <button
//               className="btn btn-secondary me-2"
//               onClick={() => navigate('/purchased-items')}
//             >
//               🛒 Purchased Items
//             </button>
//             <button className="btn btn-dark" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mt-4">
//         <h2>Patient Dashboard</h2>
//         <p>Welcome! Use the menu or the buttons below to navigate.</p>

//         {/* Action Buttons */}
//         <div className="d-flex gap-3 mt-3 flex-wrap">
//           <button
//             className="btn btn-primary"
//             onClick={() => navigate('/patient-doctors')}
//           >
//             View Doctors
//           </button>

//           <button
//             className="btn btn-success"
//             onClick={() => navigate('/patient/appointment-requests')}
//           >
//             My Appointment Requests
//           </button>

//           <button
//             className="btn btn-warning"
//             onClick={() => navigate('/store')}
//           >
//             🛍️ Go to Store
//           </button>

//           <button
//             className="btn btn-secondary"
//             onClick={() => navigate('/cart')}
//           >
//             🛒 My Cart
//           </button>

//           <button
//             className="btn btn-outline-primary"
//             onClick={() => navigate('/prescribed-medicines')}
//           >
//             View Prescribed Medicines
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PatientDashboard;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PatientDashboard.css"; // ✅ custom CSS

const PatientDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-title">Patient Portal</h3>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/patient-doctors")}>👨‍⚕️ View Doctors</li>
          <li onClick={() => navigate("/patient/appointment-requests")}>
            📅 My Appointment Requests
          </li>
          <li onClick={() => navigate("/store")}>🛍️ Go to Store</li>
          <li onClick={() => navigate("/cart")}>🛒 My Cart</li>
          <li onClick={() => navigate("/prescribed-medicines")}>
            💊 Prescribed Medicines
          </li>
          <li onClick={() => navigate("/purchased-items")}>
            📦 Purchased Items
          </li>
        </ul>
      </aside>

      {/* Main Section */}
      <div className="main-content">
        {/* Top Navbar */}
        <nav className="top-navbar">
          <div className="d-flex ms-auto align-items-center gap-2">
            <button
              className="btn btn-info"
              onClick={() => navigate("/view-profile")}
            >
              View Profile
            </button>
            <button className="btn btn-dark" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="content-area">
          <h2>Patient Dashboard</h2>
          <p>Welcome! Use the sidebar to navigate through your options.</p>

          {/* ✅ Added Image */}
          <img
            src="https://images.pexels.com/photos/4031818/pexels-photo-4031818.jpeg"
            alt="Healthcare"
            className="dashboard-image"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
