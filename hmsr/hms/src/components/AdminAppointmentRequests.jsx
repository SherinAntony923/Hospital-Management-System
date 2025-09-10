// components/AdminAppointmentRequests.jsx
// import React, { useEffect, useState } from 'react';
// import api from '../api';

// const AdminAppointmentRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [editing, setEditing] = useState(null); // { id, date, time }

//   const fetchRequests = () => {
//     api.get('/appointment-requests/?status=pending')
//       .then(res => setRequests(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const openScheduler = (r) => {
//     setEditing({ id: r.id, date: r.date || new Date().toISOString().split('T')[0], time: r.time || '10:00' });
//   };

//   const closeScheduler = () => setEditing(null);

//   const handleScheduleSave = (e) => {
//     e.preventDefault();
//     api.put(`/appointment-requests/${editing.id}/schedule/`, { date: editing.date, time: editing.time })
//       .then(() => {
//         alert('Scheduled — doctor has been notified.');
//         fetchRequests();
//         closeScheduler();
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Failed to schedule.');
//       });
//   };

// const handleDelete = (id) => {
//   if (!window.confirm('Cancel this request?')) return;
//   api.delete(`/appointment-requests/${id}/delete/`)
//     .then(() => {
//       alert('Request cancelled.');
//       fetchRequests();
//     })
//     .catch(err => {
//       console.error(err);
//       alert('Failed to cancel request.');
//     });
// };

//   return (
//     <div className="container mt-4">
//       <h3>Appointment Requests (Pending)</h3>
//       {requests.length === 0 ? <p>No pending requests.</p> : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Patient</th>
//               <th>Doctor</th>
//               <th>Department</th>
//               <th>Requested Date</th>
//               <th>Time</th>
//               <th>Reason</th>
//               <th>Created At</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map(r => (
//               <tr key={r.id}>
//                 <td>{r.patient_name}</td>
//                 <td>{r.doctor_name}</td>
//                 <td>{r.department_name}</td>
//                 <td>{r.date}</td>
//                 <td>{r.time}</td>
//                 <td>{r.reason}</td>
//                 <td>{new Date(r.created_at).toLocaleString()}</td>
//                 <td>
//                   <button className="btn btn-sm btn-primary me-2" onClick={() => openScheduler(r)}>Schedule</button>
//                   <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Scheduler modal-like inline */}
//       {editing && (
//         <div className="card mt-3 p-3">
//           <h5>Schedule request #{editing.id}</h5>
//           <form onSubmit={handleScheduleSave} className="row g-2 align-items-end">
//             <div className="col-auto">
//               <label className="form-label">Date</label>
//               <input type="date" className="form-control" value={editing.date}
//                 onChange={e => setEditing({...editing, date: e.target.value})} required />
//             </div>
//             <div className="col-auto">
//               <label className="form-label">Time</label>
//               <input type="time" className="form-control" value={editing.time}
//                 onChange={e => setEditing({...editing, time: e.target.value})} required />
//             </div>
//             <div className="col-auto">
//               <button className="btn btn-success">Save & Notify Doctor</button>
//               <button type="button" className="btn btn-secondary ms-2" onClick={closeScheduler}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminAppointmentRequests;

// components/AdminAppointmentRequests.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Sidebar & layout CSS

const AdminAppointmentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [editing, setEditing] = useState(null); // { id, date, time }
  const navigate = useNavigate();

  const fetchRequests = () => {
    api.get('/appointment-requests/?status=pending')
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const openScheduler = (r) => {
    setEditing({ id: r.id, date: r.date || new Date().toISOString().split('T')[0], time: r.time || '10:00' });
  };

  const closeScheduler = () => setEditing(null);

  const handleScheduleSave = (e) => {
    e.preventDefault();
    api.put(`/appointment-requests/${editing.id}/schedule/`, { date: editing.date, time: editing.time })
      .then(() => {
        alert('Scheduled — doctor has been notified.');
        fetchRequests();
        closeScheduler();
      })
      .catch(err => {
        console.error(err);
        alert('Failed to schedule.');
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Cancel this request?')) return;
    api.delete(`/appointment-requests/${id}/delete/`)
      .then(() => {
        alert('Request cancelled.');
        fetchRequests();
      })
      .catch(err => {
        console.error(err);
        alert('Failed to cancel request.');
      });
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

        {/* Appointment Requests */}
        <div className="admin-content-area" style={{ paddingTop: '20px' }}>
          <h3>Appointment Requests (Pending)</h3>
          {requests.length === 0 ? <p>No pending requests.</p> : (
            <div style={{ overflowX: 'auto' }}>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Requested Date</th>
                    <th>Time</th>
                    <th>Reason</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id}>
                      <td>{r.patient_name}</td>
                      <td>{r.doctor_name}</td>
                      <td>{r.department_name}</td>
                      <td>{r.date}</td>
                      <td>{r.time}</td>
                      <td>{r.reason}</td>
                      <td>{new Date(r.created_at).toLocaleString()}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => openScheduler(r)}>Schedule</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Scheduler modal-like inline */}
          {editing && (
            <div
              className="card mt-3 p-3"
              style={{
                maxWidth: '500px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                borderRadius: '8px',
              }}
            >
              <h5>Schedule request #{editing.id}</h5>
              <form onSubmit={handleScheduleSave} className="row g-2 align-items-end">
                <div className="col-auto">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" value={editing.date}
                    onChange={e => setEditing({...editing, date: e.target.value})} required />
                </div>
                <div className="col-auto">
                  <label className="form-label">Time</label>
                  <input type="time" className="form-control" value={editing.time}
                    onChange={e => setEditing({...editing, time: e.target.value})} required />
                </div>
                <div className="col-auto">
                  <button className="btn btn-success">Save & Notify Doctor</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={closeScheduler}>Cancel</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAppointmentRequests;
