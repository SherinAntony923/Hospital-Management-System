// import React, { useEffect, useState } from 'react';
// import api from '../api';

// const UpdateProfile = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     phone: '',
//     email: '', // now editable
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('access');
//     if (!token) {
//       alert('User not authenticated. Redirecting to login.');
//       window.location.href = '/login';
//       return;
//     }

//     api.get('patient/profile/')
//       .then(res => {
//         const { username, phone, email } = res.data;
//         setFormData({ username, phone, email });
//       })
//       .catch(err => {
//         alert('Error fetching profile: ' + (err.response?.data?.detail || 'Unauthorized'));
//         console.error('Error loading profile', err);
//       });
//   }, []);

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     // ✅ Removed strict username regex check
//     const dataToSend = {
//       username: formData.username,
//       phone: formData.phone,
//       email: formData.email, // ✅ send email to backend
//     };

//     api.put('patient/profile/', dataToSend)
//       .then(res => {
//         alert('Profile updated successfully');
//       })
//       .catch(err => {
//         console.error('PUT error:', err.response);
//         alert('Update failed: ' + (err.response?.data?.detail || JSON.stringify(err.response?.data)));
//       });
//   };

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete your account?")) {
//       api.delete('patient/profile/')
//         .then(() => {
//           alert('Account deleted');
//           localStorage.clear();
//           window.location.href = '/login';
//         })
//         .catch(err => {
//           alert('Delete failed: ' + (err.response?.data?.detail || 'Not authorized'));
//         });
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Update Profile</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="form-control mb-2"
//           placeholder="Email"
//         />
//         <input
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           className="form-control mb-2"
//           placeholder="Username"
//         />
//         <input
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="form-control mb-2"
//           placeholder="Phone Number"
//         />
//         <button type="submit" className="btn btn-primary me-2">Update</button>
//         <button type="button" onClick={handleDelete} className="btn btn-danger">Delete Account</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;


import React, { useEffect, useState } from 'react';
import api from '../api';
import hospitalImg from '../assets/hospital.jpg'; // ✅ Import background

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '', // now editable
  });

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      alert('User not authenticated. Redirecting to login.');
      window.location.href = '/login';
      return;
    }

    api.get('patient/profile/')
      .then(res => {
        const { username, phone, email } = res.data;
        setFormData({ username, phone, email });
      })
      .catch(err => {
        alert('Error fetching profile: ' + (err.response?.data?.detail || 'Unauthorized'));
        console.error('Error loading profile', err);
      });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const dataToSend = {
      username: formData.username,
      phone: formData.phone,
      email: formData.email,
    };

    api.put('patient/profile/', dataToSend)
      .then(res => {
        alert('Profile updated successfully');
      })
      .catch(err => {
        console.error('PUT error:', err.response);
        alert('Update failed: ' + (err.response?.data?.detail || JSON.stringify(err.response?.data)));
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      api.delete('patient/profile/')
        .then(() => {
          alert('Account deleted');
          localStorage.clear();
          window.location.href = '/login';
        })
        .catch(err => {
          alert('Delete failed: ' + (err.response?.data?.detail || 'Not authorized'));
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${hospitalImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}>
          Update Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                marginRight: "10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
