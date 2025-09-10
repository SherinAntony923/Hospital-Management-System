// // components/AppointmentScheduler.jsx
// import React, { useEffect, useState } from 'react';
// import api from '../api';

// const AppointmentScheduler = () => {
//   const [appointments, setAppointments] = useState([]);

//   // Fetch only accepted appointments
//   const fetchAppointments = () => {
//     api.get('/appointment-requests/?status=accepted')
//       .then(res => setAppointments(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   // Cancel appointment
//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to cancel this appointment?')) {
//       api.delete(`/appointment-requests/${id}/delete/`)
//         .then(() => {
//           alert('Appointment cancelled.');
//           fetchAppointments();
//         })
//         .catch(err => {
//           console.error(err);
//           alert('Failed to cancel appointment.');
//         });
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Scheduled Appointments</h3>
//       {appointments.length === 0 ? (
//         <p>No scheduled appointments.</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Patient</th>
//               <th>Doctor</th>
//               <th>Department</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Reason</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {appointments.map(appt => (
//               <tr key={appt.id}>
//                 <td>{appt.patient_name}</td>
//                 <td>{appt.doctor_name}</td>
//                 <td>{appt.department_name}</td>
//                 <td>{appt.date}</td>
//                 <td>{appt.time}</td>
//                 <td>{appt.reason}</td>
//                 <td>
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleDelete(appt.id)}
//                   >
//                     Cancel
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

// export default AppointmentScheduler;


// components/AppointmentScheduler.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Fetch only accepted appointments
  const fetchAppointments = () => {
    api.get('/appointment-requests/?status=accepted')
      .then(res => setAppointments(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Cancel appointment
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      api.delete(`/appointment-requests/${id}/delete/`)
        .then(() => {
          alert('Appointment cancelled.');
          fetchAppointments();
        })
        .catch(err => {
          console.error(err);
          alert('Failed to cancel appointment.');
        });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Inline CSS
  const sidebarStyle = {
    width: '250px',
    background: '#0d6efd',
    color: '#fff',
    padding: '20px',
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const sidebarHeader = {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    textAlign: 'center',
    borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
    paddingBottom: '10px',
    width: '100%',
  };

  const sidebarItem = {
    padding: '12px 15px',
    margin: '8px 0',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'background 0.3s, transform 0.2s',
  };

  const mainContentStyle = {
    marginLeft: '250px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const topNavbarStyle = {
    background: '#fff',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottom: '1px solid #dee2e6',
    position: 'sticky',
    top: 0,
    zIndex: 10,
  };

  const contentAreaStyle = {
    padding: '30px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const btnDanger = {
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <h3 style={sidebarHeader}>Admin Panel</h3>
        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
          <li style={sidebarItem} onClick={() => navigate("/admin/doctors")}>Doctor Manager</li>
          <li style={sidebarItem} onClick={() => navigate("/admin/add-doctor")}>➕ Add Doctor</li>
          <li style={sidebarItem} onClick={() => navigate("/admin/patients")}>Patient Records</li>
          <li style={sidebarItem} onClick={() => navigate("/admin/departments")}>Department Manager</li>
          <li style={sidebarItem} onClick={() => navigate("/admin/appointment-requests")}>Manage Appointment Requests</li>
          <li style={sidebarItem} onClick={() => navigate("/admin/appointments")}>Appointment Scheduler</li>
          <li style={sidebarItem} onClick={() => navigate("/admin/add-items")}>➕ Add Items</li>
          <li style={sidebarItem} onClick={() => navigate("/admin/view-items")}>📦 View Items</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Top Navbar */}
        <nav style={topNavbarStyle}>
          <button style={btnDanger} onClick={handleLogout}>Logout</button>
        </nav>

        {/* Appointment Scheduler */}
        <div style={contentAreaStyle}>
          <h3>Scheduled Appointments</h3>
          {appointments.length === 0 ? (
            <p>No scheduled appointments.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-bordered" style={tableStyle}>
                <thead>
                  <tr style={{ background: '#343a40', color: '#fff' }}>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map(appt => (
                    <tr key={appt.id} style={{ background: '#fff' }}>
                      <td>{appt.patient_name}</td>
                      <td>{appt.doctor_name}</td>
                      <td>{appt.department_name}</td>
                      <td>{appt.date}</td>
                      <td>{appt.time}</td>
                      <td>{appt.reason}</td>
                      <td>
                        <button style={btnDanger} onClick={() => handleDelete(appt.id)}>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
