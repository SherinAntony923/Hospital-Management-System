// // components/DoctorAppointments.jsx
// import React, { useEffect, useState } from 'react';
// import api from '../api';

// const DoctorAppointments = () => {
//   const [requests, setRequests] = useState([]);
//   const [declineBox, setDeclineBox] = useState({ open: false, id: null, reason: '' });

//   const fetchRequests = () => {
//     api.get('/doctor/appointments/')
//       .then(res => setRequests(res.data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const handleAccept = (id) => {
//     api.post(`/doctor/appointments/${id}/respond/`, { action: 'accept' })
//       .then(() => {
//         alert('Accepted.');
//         fetchRequests();
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Failed to accept.');
//       });
//   };

//   const openDecline = (id) => setDeclineBox({ open: true, id, reason: '' });

//   const closeDecline = () => setDeclineBox({ open: false, id: null, reason: '' });

//   const submitDecline = (e) => {
//     e.preventDefault();
//     api.post(`/doctor/appointments/${declineBox.id}/respond/`, { action: 'decline', decline_reason: declineBox.reason })
//       .then(() => {
//         alert('Declined.');
//         fetchRequests();
//         closeDecline();
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Failed to decline.');
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h3>Assigned Appointment Requests</h3>
//       {requests.length === 0 ? <p>No requests assigned to you.</p> : (
//         <div className="list-group">
//           {requests.map(r => (
//             <div key={r.id} className="list-group-item">
//               <div className="d-flex justify-content-between">
//                 <div>
//                   <strong>{r.patient_name}</strong> — {r.department_name} <br />
//                   <small>{r.date} at {r.time}</small>
//                   <p className="mb-1">{r.reason}</p>
//                 </div>
//                 <div>
//                   <button className="btn btn-success btn-sm me-2" onClick={() => handleAccept(r.id)}>Accept</button>
//                   <button className="btn btn-danger btn-sm" onClick={() => openDecline(r.id)}>Decline</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Decline box */}
//       {declineBox.open && (
//         <div className="card mt-3 p-3">
//           <h5>Decline request #{declineBox.id}</h5>
//           <form onSubmit={submitDecline}>
//             <div className="mb-2">
//               <label className="form-label">Reason</label>
//               <textarea className="form-control" required value={declineBox.reason} onChange={e => setDeclineBox({...declineBox, reason: e.target.value})} />
//             </div>
//             <button className="btn btn-danger">Submit Decline</button>
//             <button type="button" className="btn btn-secondary ms-2" onClick={closeDecline}>Cancel</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorAppointments;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const DoctorAppointments = () => {
  const [requests, setRequests] = useState([]);
  const [declineBox, setDeclineBox] = useState({ open: false, id: null, reason: '' });
  const navigate = useNavigate();

  const fetchRequests = () => {
    api.get('/doctor/appointments/')
      .then(res => setRequests(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = (id) => {
    api.post(`/doctor/appointments/${id}/respond/`, { action: 'accept' })
      .then(() => {
        alert('Accepted.');
        fetchRequests();
      })
      .catch(err => {
        console.error(err);
        alert('Failed to accept.');
      });
  };

  const openDecline = (id) => setDeclineBox({ open: true, id, reason: '' });
  const closeDecline = () => setDeclineBox({ open: false, id: null, reason: '' });

  const submitDecline = (e) => {
    e.preventDefault();
    api.post(`/doctor/appointments/${declineBox.id}/respond/`, { action: 'decline', decline_reason: declineBox.reason })
      .then(() => {
        alert('Declined.');
        fetchRequests();
        closeDecline();
      })
      .catch(err => {
        console.error(err);
        alert('Failed to decline.');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  // Inline CSS
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f8f9fa',
    },
    sidebar: {
      width: '220px',
      backgroundColor: '#0d6efd',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 0',
      minHeight: '100vh',
    },
    sidebarLink: {
      color: '#fff',
      textDecoration: 'none',
      padding: '12px 20px',
      display: 'block',
      fontWeight: '600',
      marginBottom: '5px',
      borderRadius: '5px',
      transition: '0.3s',
    },
    sidebarLinkHover: {
      backgroundColor: '#0b5ed7',
    },
    mainContent: {
      flexGrow: 1,
      padding: '20px 30px',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: '20px',
    },
    logoutBtn: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#dc3545',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: '600',
    },
    heading: {
      marginBottom: '20px',
      color: '#333',
    },
    listGroup: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 20px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '10px',
      transition: '0.3s',
    },
    listItemHover: {
      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    },
    actionBtn: {
      padding: '6px 12px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px',
      marginRight: '5px',
    },
    acceptBtn: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    declineBtn: {
      backgroundColor: '#dc3545',
      color: '#fff',
    },
    declineCard: {
      backgroundColor: '#fff',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginTop: '20px',
      maxWidth: '500px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px',
      outline: 'none',
    },
    submitBtn: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#dc3545',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: '600',
    },
    cancelBtn: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#6c757d',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: '600',
      marginLeft: '10px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Doctor Panel</h3>
        <Link to="/doctor-dashboard" style={styles.sidebarLink}>Inbox</Link>
        <Link to="/doctor/appointments" style={styles.sidebarLink}>Appointments</Link>
        <Link to="/doctor/scheduled-appointments" style={styles.sidebarLink}>Scheduled Appointments</Link>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.topBar}>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>

        <h3 style={styles.heading}>Assigned Appointment Requests</h3>

        {requests.length === 0 ? (
          <p>No requests assigned to you.</p>
        ) : (
          <ul style={styles.listGroup}>
            {requests.map(r => (
              <li
                key={r.id}
                style={styles.listItem}
                onMouseEnter={e => e.currentTarget.style.boxShadow = styles.listItemHover.boxShadow}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div>
                  <strong>{r.patient_name}</strong> — {r.department_name} <br />
                  <small>{r.date} at {r.time}</small>
                  <p className="mb-1">{r.reason}</p>
                </div>
                <div>
                  <button style={{ ...styles.actionBtn, ...styles.acceptBtn }} onClick={() => handleAccept(r.id)}>Accept</button>
                  <button style={{ ...styles.actionBtn, ...styles.declineBtn }} onClick={() => openDecline(r.id)}>Decline</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Decline Box */}
        {declineBox.open && (
          <div style={styles.declineCard}>
            <h5>Decline request #{declineBox.id}</h5>
            <form onSubmit={submitDecline}>
              <div style={styles.formGroup}>
                <label>Reason</label>
                <textarea
                  style={styles.textarea}
                  required
                  value={declineBox.reason}
                  onChange={e => setDeclineBox({ ...declineBox, reason: e.target.value })}
                />
              </div>
              <button style={styles.submitBtn}>Submit Decline</button>
              <button type="button" style={styles.cancelBtn} onClick={closeDecline}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
