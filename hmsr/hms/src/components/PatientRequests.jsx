import React, { useEffect, useState } from "react";
import api from "../api";
import hospitalImg from "../assets/hospital.jpg"; // ✅ Import background image

const PatientRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = () => {
    api
      .get("patient/appointment-requests/")
      .then((res) => setRequests(res.data))
      .catch((err) =>
        console.error("Failed to fetch appointment requests:", err)
      );
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${hospitalImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          width: "95%",
          maxWidth: "1000px",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          My Appointment Requests
        </h3>

        {requests.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "16px", color: "#555" }}>
            No appointment requests yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: "#3498db",
                    color: "white",
                  }}
                >
                  <th style={{ padding: "12px" }}>Doctor</th>
                  <th style={{ padding: "12px" }}>Department</th>
                  <th style={{ padding: "12px" }}>Requested Date</th>
                  <th style={{ padding: "12px" }}>Time</th>
                  <th style={{ padding: "12px" }}>Reason</th>
                  <th style={{ padding: "12px" }}>Status</th>
                  <th style={{ padding: "12px" }}>Decline Reason</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr
                    key={r.id}
                    style={{
                      borderBottom: "1px solid #ddd",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <td style={{ padding: "12px" }}>{r.doctor_name}</td>
                    <td style={{ padding: "12px" }}>{r.department_name}</td>
                    <td style={{ padding: "12px" }}>{r.date}</td>
                    <td style={{ padding: "12px" }}>{r.time}</td>
                    <td style={{ padding: "12px" }}>{r.reason}</td>
                    <td style={{ padding: "12px" }}>
                      {r.status === "pending" && (
                        <span
                          style={{
                            backgroundColor: "#f1c40f",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "12px",
                          }}
                        >
                          Pending
                        </span>
                      )}
                      {r.status === "accepted" && (
                        <span
                          style={{
                            backgroundColor: "#27ae60",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "12px",
                          }}
                        >
                          Accepted
                        </span>
                      )}
                      {r.status === "declined" && (
                        <span
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            fontSize: "12px",
                          }}
                        >
                          Declined
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px" }}>
                      {r.decline_reason || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientRequests;
