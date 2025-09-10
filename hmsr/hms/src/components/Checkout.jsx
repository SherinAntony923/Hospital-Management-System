import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const handleConfirm = async () => {
    try {
      if (cart.length === 0) {
        alert("Cart is empty!");
        return;
      }

      const orderData = {
        items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity, item_type: i.type }))
      };

      await api.post("/orders/create/", orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` }
      });

alert("Order placed successfully! Proceeding to payment...");
navigate("/checkout-payment");
    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    }
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter(i => !(i.id === item.id && i.type === item.type));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <p>Your cart is empty.</p>
      <button className="btn btn-primary" onClick={() => navigate("/store")}>Go to Store</button>
    </div>
  );

  return (
    <div className="container mt-4">
      <h2>Checkout 🛒</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (₹)</th>
            <th>Quantity</th>
            <th>Subtotal (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Total: ₹{total}</h4>
      <button className="btn btn-success mt-3" onClick={handleConfirm}>Confirm Purchase</button>
    </div>
  );
};

export default Checkout;
