// import React, { useEffect, useState } from 'react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';
// import './PatientDoctors.css';


// const PatientDoctors = () => {
//   const [departments, setDepartments] = useState([]);
//   const [allDoctors, setAllDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [selectedDeptId, setSelectedDeptId] = useState('all');

//   const [showModal, setShowModal] = useState(false);
//   const [bookingDoctor, setBookingDoctor] = useState(null);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('10:00');
//   const [reason, setReason] = useState('General Consultation');

//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('access');
//     console.log('Token before API calls:', token);
//     if (!token) {
//       console.warn("No token found, redirecting to login.");
//       navigate('/login');
//       return;
//     }

//     api.get('departments/')
//       .then(res => setDepartments(res.data))
//       .catch(err => console.error('Error fetching departments:', err));

//     api.get('patient/doctors/')
//       .then(res => {
//         if (Array.isArray(res.data) && res.data.length > 0 && res.data[0].doctors) {
//           const doctors = res.data.flatMap(dept => dept.doctors);
//           setAllDoctors(doctors);
//           setFilteredDoctors(doctors);
//         } else {
//           setAllDoctors(res.data);
//           setFilteredDoctors(res.data);
//         }
//       })
//       .catch(err => console.error('Error fetching doctors:', err));
//   }, [navigate]);

//   const handleDepartmentChange = (e) => {
//     const deptId = e.target.value;
//     setSelectedDeptId(deptId);
//     if (deptId === 'all') {
//       setFilteredDoctors(allDoctors);
//     } else {
//       setFilteredDoctors(allDoctors.filter(doc => doc.department_id === parseInt(deptId)));
//     }
//   };

//   const openBookingModal = (doctor) => {
//     setBookingDoctor(doctor);
//     const today = new Date().toISOString().split('T')[0];
//     setDate(today);
//     setTime('10:00');
//     setReason('General Consultation');
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setBookingDoctor(null);
//   };

//   const handleBookSubmit = (e) => {
//     e.preventDefault();
//     if (!bookingDoctor) return;

//     const appointmentData = {
//       doctor: bookingDoctor.id,
//       department: bookingDoctor.department_id,
//       date,
//       time,
//       reason,
//     };

//     // <-- DO NOT override headers here! interceptor adds Authorization automatically
// api.post('appointment-requests/create/', appointmentData)
//   .then(() => {
//     closeModal();
//     alert('Request sent successfully!');
//   })
//   .catch(err => {
//     console.error('Error sending appointment request:', err);
//     const msg = err?.response?.data?.detail || 'Failed to send request.';
//     alert(msg);
//   });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Available Doctors</h2>

//       <div className="mb-3">
//         <label htmlFor="departmentSelect" className="form-label">
//           Filter by Department:
//         </label>
//         <select
//           id="departmentSelect"
//           name="departmentSelect"
//           className="form-select"
//           value={selectedDeptId}
//           onChange={handleDepartmentChange}
//           autoComplete="off"
//         >
//           <option value="all">All Departments</option>
//           {departments.map(dept => (
//             <option key={dept.id} value={dept.id}>{dept.name}</option>
//           ))}
//         </select>
//       </div>

//       {filteredDoctors.length > 0 ? (
//         <div className="row">
//           {filteredDoctors.map(doc => (
//             <div className="col-md-4" key={doc.id}>
//               <div className="card mb-3">
//                 <div className="card-body">
//                   <h5 className="card-title">{doc.username}</h5>
//                   <p className="card-text">
//                     <strong>Department:</strong> {doc.department} <br />
//                     <strong>Specialization:</strong> {doc.specialization} <br />
//                     <strong>Experience:</strong> {doc.experience} years
//                   </p>
//                   <button
//                     className="btn btn-primary me-2"
//                     onClick={() => navigate(`/chat/${doc.id}`)}
//                   >
//                     Chat
//                   </button>
//                   <button
//                     className="btn btn-success"
//                     onClick={() => openBookingModal(doc)}
//                   >
//                     Book Appointment
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-muted">No doctors found for this department.</p>
//       )}

//       {showModal && bookingDoctor && (
//         <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
//           <div className="modal-dialog" role="document">
//             <form className="modal-content" onSubmit={handleBookSubmit}>
//               <div className="modal-header">
//                 <h5 className="modal-title">Book: {bookingDoctor.username}</h5>
//                 <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-2">
//                   <label htmlFor="appointmentDate" className="form-label">Date</label>
//                   <input
//                     id="appointmentDate"
//                     name="appointmentDate"
//                     type="date"
//                     className="form-control"
//                     value={date}
//                     onChange={e => setDate(e.target.value)}
//                     autoComplete="date"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label htmlFor="appointmentTime" className="form-label">Time</label>
//                   <input
//                     id="appointmentTime"
//                     name="appointmentTime"
//                     type="time"
//                     className="form-control"
//                     value={time}
//                     onChange={e => setTime(e.target.value)}
//                     autoComplete="off"
//                     required
//                   />
//                 </div>
//                 <div className="mb-2">
//                   <label htmlFor="appointmentReason" className="form-label">Reason</label>
//                   <textarea
//                     id="appointmentReason"
//                     name="appointmentReason"
//                     className="form-control"
//                     value={reason}
//                     onChange={e => setReason(e.target.value)}
//                     autoComplete="off"
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
//                 <button type="submit" className="btn btn-success">Send Request</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PatientDoctors;


import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './PatientDoctors.css';

const PatientDoctors = () => {
  const [departments, setDepartments] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDeptId, setSelectedDeptId] = useState('all');

  const [showModal, setShowModal] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [reason, setReason] = useState('General Consultation');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    api.get('departments/')
      .then(res => setDepartments(res.data))
      .catch(err => console.error('Error fetching departments:', err));

    api.get('patient/doctors/')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0 && res.data[0].doctors) {
          const doctors = res.data.flatMap(dept => dept.doctors);
          setAllDoctors(doctors);
          setFilteredDoctors(doctors);
        } else {
          setAllDoctors(res.data);
          setFilteredDoctors(res.data);
        }
      })
      .catch(err => console.error('Error fetching doctors:', err));
  }, [navigate]);

  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    setSelectedDeptId(deptId);
    if (deptId === 'all') {
      setFilteredDoctors(allDoctors);
    } else {
      setFilteredDoctors(allDoctors.filter(doc => doc.department_id === parseInt(deptId)));
    }
  };

  const openBookingModal = (doctor) => {
    setBookingDoctor(doctor);
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setTime('10:00');
    setReason('General Consultation');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setBookingDoctor(null);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!bookingDoctor) return;

    const appointmentData = {
      doctor: bookingDoctor.id,
      department: bookingDoctor.department_id,
      date,
      time,
      reason,
    };

    api.post('appointment-requests/create/', appointmentData)
      .then(() => {
        closeModal();
        alert('Request sent successfully!');
      })
      .catch(err => {
        const msg = err?.response?.data?.detail || 'Failed to send request.';
        alert(msg);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3 className="sidebar-title">Patient Portal</h3>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/patient-doctors")}>👨‍⚕️ View Doctors</li>
          <li onClick={() => navigate("/patient/appointment-requests")}>
            📅 My Appointment Requests
          </li>
          <li onClick={() => navigate("/store")}>🛍️ Go to Store</li>
          <li onClick={() => navigate("/cart")}>🛒 My Cart</li>
          <li onClick={() => navigate("/prescribed-medicines")}>
            💊 Prescribed Medicines
          </li>
          <li onClick={() => navigate("/purchased-items")}>
            📦 Purchased Items
          </li>
        </ul>
      </aside>

      {/* Main Section */}
      <div className="main-content">
        {/* Top Navbar */}
        <nav className="top-navbar">
          <div className="d-flex ms-auto align-items-center gap-2">
            <button
              className="btn btn-info"
              onClick={() => navigate("/view-profile")}
            >
              View Profile
            </button>
            <button className="btn btn-dark" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>

        {/* Doctors Listing */}
        <div className="content-area">
          <h2>Available Doctors</h2>

          <div className="mb-3">
            <label htmlFor="departmentSelect" className="form-label">
              Filter by Department:
            </label>
            <select
              id="departmentSelect"
              className="form-select"
              value={selectedDeptId}
              onChange={handleDepartmentChange}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="row">
              {filteredDoctors.map(doc => (
                <div className="col-md-4" key={doc.id}>
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{doc.username}</h5>
                      <p className="card-text">
                        <strong>Department:</strong> {doc.department} <br />
                        <strong>Specialization:</strong> {doc.specialization} <br />
                        <strong>Experience:</strong> {doc.experience} years
                      </p>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => navigate(`/chat/${doc.id}`)}
                      >
                        Chat
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => openBookingModal(doc)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No doctors found for this department.</p>
          )}

          {/* Modal */}
          {showModal && bookingDoctor && (
            <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
              <div className="modal-dialog" role="document">
                <form className="modal-content" onSubmit={handleBookSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Book: {bookingDoctor.username}</h5>
                    <button type="button" className="btn-close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-2">
                      <label htmlFor="appointmentDate" className="form-label">Date</label>
                      <input
                        id="appointmentDate"
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="appointmentTime" className="form-label">Time</label>
                      <input
                        id="appointmentTime"
                        type="time"
                        className="form-control"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="appointmentReason" className="form-label">Reason</label>
                      <textarea
                        id="appointmentReason"
                        className="form-control"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="btn btn-success">Send Request</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDoctors;
