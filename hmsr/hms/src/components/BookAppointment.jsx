import React, { useState, useEffect } from "react";
import api from "../api"; // your axios instance

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    doctor: "",
    department: "",
    date: "",
    time: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch doctors & departments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, departmentsRes] = await Promise.all([
          api.get("/doctors/"),
          api.get("/departments/"),
        ]);
        setDoctors(doctorsRes.data);
        setDepartments(departmentsRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await api.post("/appointment-requests/create/", formData);
      setSuccessMessage("Appointment request submitted successfully!");
      setFormData({
        doctor: "",
        department: "",
        date: "",
        time: "",
        reason: "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrorMessage("Failed to submit appointment request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Book an Appointment</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Department */}
        <div>
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor */}
        <div>
          <label>Doctor:</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                Dr. {doc.first_name} {doc.last_name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Time */}
        <div>
          <label>Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>

        {/* Reason */}
        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;
