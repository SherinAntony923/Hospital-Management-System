# 🏥 Hospital Management System (HMS)

A full-stack Hospital Management System built with **Django REST Framework (backend)** and **React (frontend)**.  

This project provides role-based access for **Admins, Doctors, and Patients** with features like patient registration, doctor management, appointment booking, billing, pharmacy, and reports.

---

## ✨ Features

### 🔹 Backend (Django + DRF)
- Custom User Model with roles: **Admin, Doctor, Patient**
- JWT authentication for secure login/logout
- Doctor profile management (specialization, department, experience)
- Patient registration and session handling
- Appointment scheduling and approval
- Billing and pharmacy management
- API endpoints for all modules

### 🔹 Frontend (React + Vite)
- Responsive UI with role-based dashboards
- **Patient Dashboard**: book doctor, billing, profile management
- **Doctor Dashboard**: manage appointments, prescribe medicines
- **Admin Dashboard**: manage doctors, patients, departments, appointments
- Pharmacy and Laboratory modules
- Real-time notifications (basic)

---

## ⚡ How to Run

### 🔧 Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate     # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

🎨 Frontend Setup
cd frontend
npm install
npm run dev


By default, frontend runs at:
👉 http://localhost:5173