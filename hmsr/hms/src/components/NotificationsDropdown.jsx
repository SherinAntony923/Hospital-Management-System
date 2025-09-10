// components/NotificationsDropdown.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = () => {
    api.get('/notifications/')
      .then(res => setNotifications(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const markRead = (id) => {
    api.post(`/notifications/${id}/read/`)
      .then(() => fetchNotifications())
      .catch(err => console.error(err));
  };

  return (
    <div className="nav-item dropdown ms-3">
      <button className="btn btn-outline-light position-relative" onClick={() => setOpen(!open)}>
        Notifications
        {unreadCount > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{unreadCount}</span>}
      </button>

      {open && (
        <div className="dropdown-menu show p-2" style={{ minWidth: 300 }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Notifications</strong>
            <button className="btn btn-sm btn-link" onClick={fetchNotifications}>Refresh</button>
          </div>
          {notifications.length === 0 ? <p className="text-muted">No notifications.</p> : (
            notifications.map(n => (
              <div key={n.id} className="dropdown-item d-flex justify-content-between align-items-start">
                <div style={{ maxWidth: 220 }}>
                  <small className="text-muted">{new Date(n.created_at).toLocaleString()}</small>
                  <div>{n.message}</div>
                </div>
                <div>
                  {!n.is_read && <button className="btn btn-sm btn-primary" onClick={() => markRead(n.id)}>Mark</button>}
                </div>
              </div>
            ))
          )}
          <div className="mt-2">
            <Link to="/notifications" className="btn btn-sm btn-outline-secondary w-100">View all</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
