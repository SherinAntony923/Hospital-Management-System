// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// const DoctorScheduledAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const res = await api.get("/doctor/scheduled-appointments/");
//       setAppointments(res.data);
//     } catch (err) {
//       console.error("Appointments fetch error:", err.response?.data || err);
//       alert("Failed to fetch appointments");
//     }
//   };

//   const handlePrescribe = (patientId) => {
//     // Navigate to the prescription page for this patient
//     navigate(`/doctor/prescribe/${patientId}`);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Scheduled Appointments</h2>
//       {appointments.length === 0 && <p>No accepted appointments yet.</p>}
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Patient</th>
//             <th>Date</th>
//             <th>Time</th>
//             <th>Reason</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {appointments.map((appt) => (
//             <tr key={appt.id}>
//               <td>{appt.patient_name}</td>
//               <td>{appt.date}</td>
//               <td>{appt.time}</td>
//               <td>{appt.reason}</td>
//               <td>
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handlePrescribe(appt.patient)}
//                 >
//                   Prescribe
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DoctorScheduledAppointments;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const DoctorScheduledAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/doctor/scheduled-appointments/");
      setAppointments(res.data);
    } catch (err) {
      console.error("Appointments fetch error:", err.response?.data || err);
      alert("Failed to fetch appointments");
    }
  };

  const handlePrescribe = (patientId) => {
    navigate(`/doctor/prescribe/${patientId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  // Inline CSS
  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f8f9fa",
    },
    sidebar: {
      width: "220px",
      backgroundColor: "#0d6efd",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      padding: "20px 0",
      minHeight: "100vh",
    },
    sidebarLink: {
      color: "#fff",
      textDecoration: "none",
      padding: "12px 20px",
      display: "block",
      fontWeight: "600",
      marginBottom: "5px",
      borderRadius: "5px",
      transition: "0.3s",
    },
    mainContent: {
      flexGrow: 1,
      padding: "20px 30px",
    },
    topBar: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: "20px",
    },
    logoutBtn: {
      padding: "8px 16px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#dc3545",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
    },
    heading: {
      marginBottom: "20px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    th: {
      backgroundColor: "#0d6efd",
      color: "#fff",
      textAlign: "left",
      padding: "12px",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
    },
    actionBtn: {
      padding: "6px 12px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#0d6efd",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "13px",
    },
    noAppointments: {
      textAlign: "center",
      color: "#888",
      padding: "15px 0",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Doctor Panel</h3>
        <Link to="/doctor-dashboard" style={styles.sidebarLink}>Inbox</Link>
        <Link to="/doctor/appointments" style={styles.sidebarLink}>Appointments</Link>
        <Link to="/doctor/scheduled-appointments" style={styles.sidebarLink}>Scheduled Appointments</Link>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.topBar}>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>

        <h2 style={styles.heading}>Scheduled Appointments</h2>

        {appointments.length === 0 ? (
          <p style={styles.noAppointments}>No accepted appointments yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Patient</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Time</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td style={styles.td}>{appt.patient_name}</td>
                  <td style={styles.td}>{appt.date}</td>
                  <td style={styles.td}>{appt.time}</td>
                  <td style={styles.td}>{appt.reason}</td>
                  <td style={styles.td}>
                    <button
                      style={styles.actionBtn}
                      onClick={() => handlePrescribe(appt.patient)}
                    >
                      Prescribe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorScheduledAppointments;
