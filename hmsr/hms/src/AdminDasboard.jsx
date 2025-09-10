import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/doctors">Manage Doctors</Link></li>
        <li><Link to="/patients">Manage Patients</Link></li>
        <li><Link to="/departments">Manage Departments</Link></li>
        <li><Link to="/appointments">Manage Appointments</Link></li>
        <li><Link to="/billing">View Billing</Link></li>
        <li><Link to="/pharmacy">Manage Pharmacy</Link></li>
        <li><Link to="/laboratory">Manage Laboratory</Link></li>
        <li><Link to="/equipment">Manage Equipment</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
