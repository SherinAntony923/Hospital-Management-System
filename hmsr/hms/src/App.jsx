import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import ViewProfile from './components/ViewProfile';
import UpdateProfile from './components/UpdateProfile';
import DoctorManager from './components/DoctorManager';
import PatientRecordList from './components/PatientRecordList';
import DepartmentManager from './components/DepartmentManager';
import AppointmentScheduler from './components/AppointmentScheduler';
import AdminAddDoctor from './components/AdminAddDoctor';
import DeleteProfile from './components/DeleteProfile';
import PatientDoctors from './components/PatientDoctors';
import ChatPage from './components/ChatPage';

import PatientRequests from './components/PatientRequests';
import AdminAppointmentRequests from './components/AdminAppointmentRequests';
import DoctorAppointments from './components/DoctorAppointments';
import NotificationsDropdown from './components/NotificationsDropdown';
import DoctorScheduledAppointments from './components/DoctorScheduledAppointments';
import AdminAddItems from './components/AdminAddItems';
import AdminViewItems from './components/AdminViewItems';
import Store from './components/Store';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import CheckoutWithPayment from './components/CheckoutWithPayment';
import PurchasedItems from "./components/PurchasedItems";
import PrescribedMedicines from "./components/PrescribedMedicines";
import PrescribeMedicines from "./components/PrescribeMedicines";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />

        {/* Profile */}
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/delete-profile" element={<DeleteProfile />} />

        {/* Admin Module */}
        <Route path="/admin/doctors" element={<DoctorManager />} />
        <Route path="/admin/patients" element={<PatientRecordList />} />
        <Route path="/admin/departments" element={<DepartmentManager />} />
        <Route path="/admin/appointments" element={<AppointmentScheduler />} />
        <Route path="/admin/add-doctor" element={<AdminAddDoctor />} />
        <Route path="/admin/appointment-requests" element={<AdminAppointmentRequests />} />

        <Route path="/admin/add-items" element={<AdminAddItems />} />
        <Route path="/admin/view-items" element={<AdminViewItems />} />

        {/* Patient Module */}
        <Route path="/patient-doctors" element={<PatientDoctors />} />
        <Route path="/patient/appointment-requests" element={<PatientRequests />} />

        {/* Store / Shopping */}
         <Route path="/store" element={<Store />} />
         <Route path="/cart" element={<Cart />} />
         <Route path="/checkout" element={<Checkout />} />
         <Route path="/checkout-payment" element={<CheckoutWithPayment />} />
         <Route path="/purchased-items" element={<PurchasedItems />} />



        {/* Doctor Module */}
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/scheduled-appointments" element={<DoctorScheduledAppointments />} />

        <Route path="/prescribed-medicines" element={<PrescribedMedicines />} />
        <Route path="/doctor/prescribe/:patientId" element={<PrescribeMedicines />} />

        {/* Chat + Notifications */}
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationsDropdown />} />
      </Routes>
    </Router>
  );
}

export default App;
