// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../api';

// const DoctorDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     api.get('doctor/inbox/')
//       .then(res => setMessages(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     navigate('/login');
//   };

//   return (
//     <>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/doctor-dashboard">Doctor Panel</Link>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/doctor-dashboard">Inbox</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/doctor/appointments">Appointments</Link>
//               </li>
//              <li className="nav-item">
//                <Link className="nav-link" to="/doctor/scheduled-appointments">Scheduled Appointments</Link>
//              </li>
//             </ul>

//             <div className="d-flex align-items-center">
//               <button className="btn btn-outline-light" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Inbox */}
//       <div className="container mt-4">
//         <h2>Patient Messages</h2>
//         <ul className="list-group">
//           {messages.length > 0 ? (
//             messages.map(msg => (
//               <li key={msg.id} className="list-group-item d-flex justify-content-between align-items-center">
//                 <div>
//                   <strong>{msg.sender_name}</strong> <br />
//                   <small>{msg.message}</small>
//                 </div>
//                 <div>
//                   <Link to={`/chat/${msg.sender}`} className="btn btn-primary btn-sm me-2">
//                     Reply
//                   </Link>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <li className="list-group-item">No messages yet.</li>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default DoctorDashboard;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const DoctorDashboard = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('doctor/inbox/')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  // Inline CSS styles
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
    replyBtn: {
      padding: '6px 12px',
      backgroundColor: '#0d6efd',
      border: 'none',
      color: '#fff',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '13px',
      textDecoration: 'none',
    },
    noMessages: {
      textAlign: 'center',
      color: '#888',
      padding: '15px 0',
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

        <h2 style={styles.heading}>Patient Messages</h2>
        <ul style={styles.listGroup}>
          {messages.length > 0 ? (
            messages.map(msg => (
              <li
                key={msg.id}
                style={styles.listItem}
                onMouseEnter={e => e.currentTarget.style.boxShadow = styles.listItemHover.boxShadow}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div>
                  <strong>{msg.sender_name}</strong> <br />
                  <small>{msg.message}</small>
                </div>
                <Link to={`/chat/${msg.sender}`} style={styles.replyBtn}>
                  Reply
                </Link>
              </li>
            ))
          ) : (
            <li style={styles.noMessages}>No messages yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
