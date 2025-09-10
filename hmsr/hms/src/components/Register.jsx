// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phone: '',
//   });

//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({ 
//       ...formData, 
//       [e.target.name]: e.target.value 
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response =await axios.post("http://localhost:8000/api/register/", formData)


//       if (response.status === 201) {
//         setSuccess('Registered successfully! Redirecting to login...');
//         setTimeout(() => navigate('/login'), 2000);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       setError('Registration failed. Please check your inputs.');
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '500px' }}>
//       <h2 className="mb-4">Patient Registration</h2>

//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="form-group mb-3">
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             className="form-control"
//             required
//             onChange={handleChange}
//             value={formData.username}
//           />
//         </div>

//         <div className="form-group mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             className="form-control"
//             required
//             onChange={handleChange}
//             value={formData.email}
//           />
//         </div>

//         <div className="form-group mb-3">
//           <label>Phone</label>
//           <input
//             type="text"
//             name="phone"
//             className="form-control"
//             required
//             onChange={handleChange}
//             value={formData.phone}
//           />
//         </div>

//         <div className="form-group mb-4">
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             required
//             onChange={handleChange}
//             value={formData.password}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppNavbar from './AppNavbar';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post("http://localhost:8000/api/register/", formData);

      if (response.status === 201) {
        setSuccess('Registered successfully! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please check your inputs.');
    }
  };

  return (
    <>
      <AppNavbar />

      {/* Background Section */}
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <div
          className="card shadow-lg p-4"
          style={{
            maxWidth: '500px',
            width: '100%',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h2 className="text-center mb-4 fw-bold text-primary">Patient Registration</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="fw-semibold">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                required
                onChange={handleChange}
                value={formData.username}
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="form-group mb-3">
              <label className="fw-semibold">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                required
                onChange={handleChange}
                value={formData.phone}
              />
            </div>

            <div className="form-group mb-4">
              <label className="fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold rounded-pill py-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
