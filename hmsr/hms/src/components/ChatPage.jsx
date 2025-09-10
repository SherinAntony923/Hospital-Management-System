import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import hospitalImg from "../assets/hospital.jpg"; // ✅ import background

const ChatPage = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const messagesEndRef = useRef(null);

  const loggedInUserId = parseInt(localStorage.getItem('user_id'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = () => {
    api.get(`chat/${userId}/`)
      .then(res => {
        setMessages(res.data);
        scrollToBottom();
      })
      .catch(err => console.error('Error fetching messages:', err));
  };

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    api.post(`chat/${userId}/`, { message: newMsg })
      .then(res => {
        setMessages(prev => [...prev, res.data]);
        setNewMsg('');
        scrollToBottom();
      })
      .catch(err => console.error('Error sending message:', err));
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [userId]);

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
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          padding: "20px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h4
          style={{
            textAlign: "center",
            marginBottom: "15px",
            fontWeight: "bold",
            color: "#0d6efd"
          }}
        >
          💬 Chat
        </h4>

        {/* Chat Messages */}
        <div
          style={{
            flex: 1,
            height: "350px",
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            marginBottom: "15px"
          }}
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                textAlign: msg.sender === loggedInUserId ? 'right' : 'left',
                margin: "8px 0"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: "15px",
                  maxWidth: "70%",
                  wordWrap: "break-word",
                  backgroundColor: msg.sender === loggedInUserId ? "#0d6efd" : "#e5e5ea",
                  color: msg.sender === loggedInUserId ? "#fff" : "#000",
                }}
              >
                <strong>{msg.sender_name}: </strong>{msg.message}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "14px"
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: "#0d6efd",
              color: "white",
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
