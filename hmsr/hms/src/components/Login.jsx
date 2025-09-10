// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AppNavbar from './AppNavbar';
// import api from '../api';

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await api.post('login/', formData);
//       console.log('Login API response:', response.data);

//       const { access, refresh, role, username } = response.data;

//       if (!access) {
//         alert('No access token received!');
//         setLoading(false);
//         return;
//       }

//       // ✅ Store tokens & user details
//       localStorage.setItem('access', access);
//       if (refresh) localStorage.setItem('refresh', refresh);
//       localStorage.setItem('role', role || '');
//       localStorage.setItem('username', username || '');

//       // ✅ Redirect based on role
//       if (role === 'admin') navigate('/admin-dashboard');
//       else if (role === 'doctor') navigate('/doctor-dashboard');
//       else if (role === 'patient') navigate('/patient-dashboard');
//       else {
//         alert('Unknown role. Contact admin.');
//         localStorage.clear();
//       }

//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       alert(error.response?.data?.detail || 'Login failed. Please check credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <AppNavbar />
//       <div className="container mt-5">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
//           <div className="mb-3">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               required
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               required
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import api from '../api';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('login/', formData);
      console.log('Login API response:', response.data);

      const { access, refresh, role, username } = response.data;

      if (!access) {
        alert('No access token received!');
        setLoading(false);
        return;
      }

      // ✅ Store tokens & user details
      localStorage.setItem('access', access);
      if (refresh) localStorage.setItem('refresh', refresh);
      localStorage.setItem('role', role || '');
      localStorage.setItem('username', username || '');

      // ✅ Redirect based on role
      if (role === 'admin') navigate('/admin-dashboard');
      else if (role === 'doctor') navigate('/doctor-dashboard');
      else if (role === 'patient') navigate('/patient-dashboard');
      else {
        alert('Unknown role. Contact admin.');
        localStorage.clear();
      }

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.detail || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
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
          <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label className="fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-4">
              <label className="fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold rounded-pill py-2"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center mt-3">
            Not registered?{' '}
            <Link to="/register" className="fw-bold text-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
