// import React, { useEffect, useState } from 'react';
// import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';

// const AppNavbar = () => {
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);

//   const isLoggedIn = !!localStorage.getItem('access');

//   useEffect(() => {
//     const token = localStorage.getItem('access');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setRole(decoded.role); // assuming your JWT has "role"
//       } catch (error) {
//         console.error('Invalid token', error);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     navigate('/login');
//   };

//   return (
//     <BootstrapNavbar bg="primary" variant="dark" expand="lg">
//       <Container>
//         <LinkContainer to="/">
//           <BootstrapNavbar.Brand>My Hospital</BootstrapNavbar.Brand>
//         </LinkContainer>
//         <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
//         <BootstrapNavbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <LinkContainer to="/">
//               <Nav.Link>Home</Nav.Link>
//             </LinkContainer>

//             {isLoggedIn ? (
//               <>
//                 <LinkContainer to="/view-profile">
//                   <Nav.Link>View Profile</Nav.Link>
//                 </LinkContainer>

//                 {role === 'patient' && (
//                   <>
//                     <LinkContainer to="/patient-doctors">
//                       <Nav.Link>Doctors</Nav.Link>
//                     </LinkContainer>
//                     <LinkContainer to="/appointments">
//                       <Nav.Link>Book Appointment</Nav.Link>
//                     </LinkContainer>
//                     <LinkContainer to="/chat">
//                       <Nav.Link>Chat</Nav.Link>
//                     </LinkContainer>
//                   </>
//                 )}

//                 <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
//               </>
//             ) : (
//               <>
//                 <LinkContainer to="/about">
//                   <Nav.Link>About</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/register">
//                   <Nav.Link>Register</Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/login">
//                   <Nav.Link>Login</Nav.Link>
//                 </LinkContainer>
//               </>
//             )}
//           </Nav>
//         </BootstrapNavbar.Collapse>
//       </Container>
//     </BootstrapNavbar>
//   );
// };

// export default AppNavbar;
import React, { useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode'; // ✅ Vite-compatible import

const AppNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);

  const isLoggedIn = !!localStorage.getItem('access');

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      try {
        const decoded = jwtDecode.default(token); // ✅ use .default
        setRole(decoded.role);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      {/* Inline CSS */}
      <style>
        {`
          .custom-navbar {
            background: linear-gradient(90deg, #007bff, #00c6ff);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            padding: 0.8rem 1rem;
            transition: all 0.3s ease;
          }
          .brand-gradient {
            background: linear-gradient(90deg, #00ffe0, #007bff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
            font-size: 1.8rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          }
          .custom-navbar .nav-link {
            color: #fff !important;
            margin-right: 1rem;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          .custom-navbar .nav-link:hover {
            color: #fff !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            transform: translateY(-2px);
          }
          .custom-navbar .nav-link.active {
            border-bottom: 2px solid #00ffe0;
            font-weight: 600;
          }
          .logout-link {
            color: #fff !important;
            background-color: #ff4d4f;
            padding: 5px 12px;
            border-radius: 20px;
            margin-left: 10px;
            font-weight: 500;
            transition: all 0.3s ease;
          }
          .logout-link:hover {
            background-color: #e60000;
            color: #fff !important;
            transform: translateY(-2px);
          }
          @media (max-width: 768px) {
            .custom-navbar .nav-link {
              margin: 0.3rem 0;
            }
          }
        `}
      </style>

      <BootstrapNavbar expand="lg" className="custom-navbar" sticky="top">
        <Container>
          <LinkContainer to="/">
            <BootstrapNavbar.Brand className="brand-gradient">My Hospital</BootstrapNavbar.Brand>
          </LinkContainer>
          <BootstrapNavbar.Toggle aria-controls="navbar-nav" />
          <BootstrapNavbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link active={location.pathname === '/'}>Home</Nav.Link>
              </LinkContainer>

              {isLoggedIn ? (
                <>
                  <LinkContainer to="/view-profile">
                    <Nav.Link active={location.pathname === '/view-profile'}>Profile</Nav.Link>
                  </LinkContainer>

                  {role === 'patient' && (
                    <>
                      <LinkContainer to="/patient-doctors">
                        <Nav.Link active={location.pathname === '/patient-doctors'}>Doctors</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/appointments">
                        <Nav.Link active={location.pathname === '/appointments'}>Appointments</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/chat">
                        <Nav.Link active={location.pathname === '/chat'}>Chat</Nav.Link>
                      </LinkContainer>
                    </>
                  )}

                  <Nav.Link onClick={handleLogout} className="logout-link">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/about">
                    <Nav.Link active={location.pathname === '/about'}>About</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link active={location.pathname === '/register'}>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link active={location.pathname === '/login'}>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

export default AppNavbar;
