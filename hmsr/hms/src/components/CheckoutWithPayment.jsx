import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

const CheckoutWithPayment = () => {
  const location = useLocation();
  const cart = location.state?.items || JSON.parse(localStorage.getItem("cart")) || [];

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayNow = async (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) return alert("Please fill all card details!");
    if (cart.length === 0) return alert("No items in cart.");

    setLoading(true);
    try {
      // Call demo backend WITHOUT sending Authorization header
      const res = await api.post(
        "create-payment-intent/",
        { items: cart },
        { headers: { Authorization: "" } } // explicitly empty
      );
      console.log("Fake client_secret:", res.data.client_secret);

      setTimeout(() => {
        setLoading(false);
        alert("Payment Successful! 🎉");
        localStorage.removeItem("cart");
        window.location.href = "/store";
      }, 1000);

    } catch (err) {
      setLoading(false);
      console.error(err.response || err);
      alert("Payment failed (demo)!");
    }
  };

  if (!cart || cart.length === 0) return <p>No items in cart.</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2>Checkout & Pay (Demo)</h2>

      {/* Card visual */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          marginBottom: "20px"
        }}
      >
        <div style={{ fontSize: "18px", marginBottom: "10px" }}>
          {cardNumber || "#### #### #### ####"}
        </div>
        <div className="d-flex justify-content-between" style={{ fontSize: "14px" }}>
          <div>{expiry || "MM/YY"}</div>
          <div>{cvv || "CVV"}</div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handlePayNow}>
        <div className="mb-2">
          <label>Card Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            maxLength={19}
            onChange={e =>
              setCardNumber(
                e.target.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim()
              )
            }
          />
        </div>

        <div className="d-flex gap-2 mb-2">
          <div style={{ flex: 1 }}>
            <label>Expiry</label>
            <input
              type="text"
              className="form-control"
              placeholder="MM/YY"
              value={expiry}
              maxLength={5}
              onChange={e => {
                let val = e.target.value.replace(/\D/g, "");
                if (val.length > 4) val = val.slice(0, 4);
                if (val.length >= 3) val = val.slice(0, 2) + "/" + val.slice(2);
                setExpiry(val);
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>CVV</label>
            <input
              type="text"
              className="form-control"
              placeholder="123"
              value={cvv}
              maxLength={3}
              onChange={e => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
            />
          </div>
        </div>

        <button className="btn btn-success w-100" type="submit" disabled={loading}>
          {loading ? "Processing..." : `Pay ₹${total}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutWithPayment;
