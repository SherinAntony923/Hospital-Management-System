// components/DeleteProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const DeleteProfile = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    api.delete('patient/profile/')
      .then(res => {
        alert('Account deleted successfully');

        // ✅ Correct token key (matches api.js)
        localStorage.removeItem('access');
        localStorage.removeItem('refresh'); // optional, for good cleanup

        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to delete account. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
      <h3>Delete Account</h3>
      <p className="text-danger">Warning: This action is irreversible!</p>
      <button className="btn btn-danger" onClick={handleDelete}>
        Confirm Delete
      </button>
    </div>
  );
};

export default DeleteProfile;
