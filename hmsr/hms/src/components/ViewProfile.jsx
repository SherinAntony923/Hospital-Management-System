import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import hospitalBg from "../assets/hospital.jpg"; // ✅ import background image

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("patient/profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error loading profile", err));
  }, []);

  const handleUpdate = () => {
    navigate("/update-profile");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      api
        .delete("patient/profile/")
        .then(() => {
          alert("Account deleted");
          localStorage.clear();
          navigate("/login");
        })
        .catch((err) => {
          alert(
            "Delete failed: " +
              (err.response?.data?.detail || "Not authorized")
          );
        });
    }
  };

  /* === Inline Styles === */
  const pageStyle = {
    backgroundImage: `url(${hospitalBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const containerStyle = {
    maxWidth: "600px",
    width: "100%",
    margin: "20px auto",
    padding: "30px",
    background: "rgba(255, 255, 255, 0.9)", // ✅ transparent white overlay
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
  };

  const headingStyle = {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: "25px",
    color: "#2c3e50",
    fontSize: "1.8rem",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  };

  const listStyle = {
    listStyle: "none",
    padding: 0,
    marginBottom: "20px",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const listItemStyle = {
    padding: "14px 18px",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#34495e",
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #eaeaea",
  };

  const buttonStyle = {
    fontSize: "0.95rem",
    padding: "10px 18px",
    borderRadius: "8px",
    minWidth: "120px",
    marginRight: "10px",
    border: "none",
    cursor: "pointer",
  };

  const warningBtn = {
    ...buttonStyle,
    backgroundColor: "#f39c12",
    color: "white",
  };

  const dangerBtn = {
    ...buttonStyle,
    backgroundColor: "#e74c3c",
    color: "white",
    marginRight: 0,
  };

  // Responsive tweak for small screens
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h2 style={headingStyle}>Your Profile</h2>
        {profile ? (
          <>
            <ul style={listStyle}>
              <li style={listItemStyle}>Username: {profile.username}</li>
              <li style={listItemStyle}>Phone: {profile.phone}</li>
              <li style={listItemStyle}>Email: {profile.email}</li>
            </ul>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "10px",
              }}
            >
              <button style={warningBtn} onClick={handleUpdate}>
                Update Profile
              </button>
              <button style={dangerBtn} onClick={handleDelete}>
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
