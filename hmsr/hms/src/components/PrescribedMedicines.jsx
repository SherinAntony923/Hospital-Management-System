// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// const PrescribedMedicines = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if token exists
//     const token = localStorage.getItem("access");
//     if (!token) {
//       alert("Please login to view prescribed medicines.");
//       navigate("/login");
//       return;
//     }

//     // Fetch prescriptions
//     const fetchPrescriptions = async () => {
//       try {
//         const res = await api.get("/patient/prescriptions/");
//         setPrescriptions(res.data);
//       } catch (err) {
//         console.error("Error fetching prescriptions:", err.response || err);
//         if (err.response && err.response.status === 401) {
//           alert("Session expired. Please login again.");
//           navigate("/login");
//         } else {
//           alert("Failed to fetch prescriptions.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrescriptions();
//   }, [navigate]);

//   const goToStore = () => navigate("/store");

//   if (loading) return <p className="container mt-4">Loading prescriptions...</p>;

//   return (
//     <div className="container mt-4">
//       <h2>🩺 Prescribed Medicines</h2>

//       {prescriptions.length === 0 ? (
//         <p>No medicines have been prescribed yet.</p>
//       ) : (
//         <ul className="list-group">
//           {prescriptions.map((p) => (
//             <li
//               key={p.id}
//               className="list-group-item d-flex justify-content-between align-items-center"
//             >
//               <div>
//                 <strong>{p.medicine_name}</strong>
//                 <br />
//                 Quantity: {p.quantity}
//                 {p.notes && (
//                   <div>
//                     <em>Notes: {p.notes}</em>
//                   </div>
//                 )}
//                 <div>
//                   <small>Prescribed by: {p.doctor_name}</small>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {prescriptions.length > 0 && (
//         <button className="btn btn-primary mt-3" onClick={goToStore}>
//           Go to Store 🛍️
//         </button>
//       )}
//     </div>
//   );
// };

// export default PrescribedMedicines;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const PrescribedMedicines = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      alert("Please login to view prescribed medicines.");
      navigate("/login");
      return;
    }

    const fetchPrescriptions = async () => {
      try {
        const res = await api.get("/patient/prescriptions/");
        setPrescriptions(res.data);
      } catch (err) {
        console.error("Error fetching prescriptions:", err.response || err);
        if (err.response && err.response.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        } else {
          alert("Failed to fetch prescriptions.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [navigate]);

  const goToStore = () => navigate("/store");

  if (loading)
    return (
      <p style={{ maxWidth: "800px", margin: "20px auto", fontSize: "16px" }}>
        Loading prescriptions...
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>
        🩺 Prescribed Medicines
      </h2>

      {prescriptions.length === 0 ? (
        <p style={{ fontSize: "16px", color: "#555" }}>
          No medicines have been prescribed yet.
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {prescriptions.map((p) => (
            <li
              key={p.id}
              style={{
                padding: "15px",
                marginBottom: "12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                background: "#f9f9f9",
              }}
            >
              <div>
                <strong style={{ fontSize: "16px", color: "#222" }}>
                  {p.medicine_name}
                </strong>
                <br />
                <span style={{ fontSize: "14px", color: "#555" }}>
                  Quantity: {p.quantity}
                </span>
                {p.notes && (
                  <div style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
                    <em>Notes: {p.notes}</em>
                  </div>
                )}
                <div style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>
                  Prescribed by: {p.doctor_name}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {prescriptions.length > 0 && (
        <button
          onClick={goToStore}
          style={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Go to Store 🛍️
        </button>
      )}
    </div>
  );
};

export default PrescribedMedicines;
