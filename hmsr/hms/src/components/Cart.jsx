// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     setCart(JSON.parse(localStorage.getItem("cart")) || []);
//   }, []);

//   const removeFromCart = (item) => {
//     const updated = cart.filter(i => !(i.id === item.id && i.type === item.type));
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   // Save purchased items
//   const savePurchasedItems = (items) => {
//     const previous = JSON.parse(localStorage.getItem("purchased")) || [];
//     const timestampedItems = items.map(i => ({
//       ...i,
//       purchasedAt: new Date().toISOString()
//     }));
//     localStorage.setItem("purchased", JSON.stringify([...previous, ...timestampedItems]));
//   };

//   const buyNow = (item) => {
//     const validItem = {
//       ...item,
//       quantity: Number(item.quantity) || 1,
//       price: Number(item.price) || 0,
//     };
//     savePurchasedItems([validItem]);
//     navigate("/checkout-payment", { state: { items: [validItem] } });
//   };

//   const buyAll = () => {
//     const validCart = cart
//       .filter(i => i.quantity > 0 && i.price > 0)
//       .map(i => ({
//         ...i,
//         quantity: Number(i.quantity),
//         price: Number(i.price),
//       }));
//     if (validCart.length === 0) return alert("No valid items to buy!");
//     savePurchasedItems(validCart);
//     navigate("/checkout-payment", { state: { items: validCart } });
//   };

//   const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">🛒 Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item, idx) => (
//             <div className="card mb-3 shadow-sm" key={idx}>
//               <div className="card-body d-flex align-items-center justify-content-between">
//                 <div className="d-flex align-items-center gap-3">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
//                   />
//                   <div>
//                     <h6 className="mb-1">{item.name}</h6>
//                     <p className="mb-1">Quantity: {item.quantity}</p>
//                     <p className="mb-0 fw-bold">₹{item.price * item.quantity}</p>
//                   </div>
//                 </div>
//                 <div className="d-flex flex-column gap-2">
//                   <button className="btn btn-primary btn-sm" onClick={() => buyNow(item)}>Buy Now</button>
//                   <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>Remove</button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light border rounded">
//             <h5>Total: ₹{totalAmount}</h5>
//             <button className="btn btn-success" onClick={buyAll}>Buy All</button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     setCart(JSON.parse(localStorage.getItem("cart")) || []);
//   }, []);

//   const removeFromCart = (item) => {
//     const updated = cart.filter(
//       (i) => !(i.id === item.id && i.type === item.type)
//     );
//     setCart(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   const savePurchasedItems = (items) => {
//     const previous = JSON.parse(localStorage.getItem("purchased")) || [];
//     const timestampedItems = items.map((i) => ({
//       ...i,
//       purchasedAt: new Date().toISOString(),
//     }));
//     localStorage.setItem(
//       "purchased",
//       JSON.stringify([...previous, ...timestampedItems])
//     );
//   };

//   const buyNow = (item) => {
//     const validItem = {
//       ...item,
//       quantity: Number(item.quantity) || 1,
//       price: Number(item.price) || 0,
//     };
//     savePurchasedItems([validItem]);
//     navigate("/checkout-payment", { state: { items: [validItem] } });
//   };

//   const buyAll = () => {
//     const validCart = cart
//       .filter((i) => i.quantity > 0 && i.price > 0)
//       .map((i) => ({
//         ...i,
//         quantity: Number(i.quantity),
//         price: Number(i.price),
//       }));
//     if (validCart.length === 0) return alert("No valid items to buy!");
//     savePurchasedItems(validCart);
//     navigate("/checkout-payment", { state: { items: validCart } });
//   };

//   const totalAmount = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
//       <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item, idx) => (
//             <div
//               key={idx}
//               style={{
//                 marginBottom: "15px",
//                 boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//                 borderRadius: "8px",
//                 overflow: "hidden",
//                 background: "#fff",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   padding: "15px",
//                 }}
//               >
//                 <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     style={{
//                       width: "80px",
//                       height: "80px",
//                       objectFit: "cover",
//                       borderRadius: "5px",
//                     }}
//                   />
//                   <div>
//                     <h6 style={{ margin: "0 0 5px 0" }}>{item.name}</h6>
//                     <p style={{ margin: "0 0 5px 0" }}>
//                       Quantity: {item.quantity}
//                     </p>
//                     <p style={{ margin: 0, fontWeight: "bold" }}>
//                       ₹{item.price * item.quantity}
//                     </p>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "8px",
//                   }}
//                 >
//                   <button
//                     onClick={() => buyNow(item)}
//                     style={{
//                       backgroundColor: "#007bff",
//                       color: "#fff",
//                       border: "none",
//                       padding: "6px 12px",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Buy Now
//                   </button>
//                   <button
//                     onClick={() => removeFromCart(item)}
//                     style={{
//                       backgroundColor: "#dc3545",
//                       color: "#fff",
//                       border: "none",
//                       padding: "6px 12px",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                       fontSize: "14px",
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginTop: "20px",
//               padding: "15px",
//               background: "#f8f9fa",
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//             }}
//           >
//             <h5 style={{ margin: 0 }}>Total: ₹{totalAmount}</h5>
//             <button
//               onClick={buyAll}
//               style={{
//                 backgroundColor: "#28a745",
//                 color: "#fff",
//                 border: "none",
//                 padding: "10px 18px",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//                 fontSize: "15px",
//               }}
//             >
//               Buy All
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState("guest");

  useEffect(() => {
    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id || "guest";
    setUserId(id);

    const userCart = JSON.parse(localStorage.getItem(`cart_${id}`)) || [];
    setCart(userCart);
  }, []);

  const saveCart = (items) => {
    setCart(items);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(items));
  };

  const removeFromCart = (item) => {
    const updated = cart.filter(
      (i) => !(i.id === item.id && i.type === item.type)
    );
    saveCart(updated);
  };

  const savePurchasedItems = (items) => {
    const previous = JSON.parse(localStorage.getItem(`purchased_${userId}`)) || [];
    const timestampedItems = items.map((i) => ({
      ...i,
      purchasedAt: new Date().toISOString(),
    }));
    localStorage.setItem(
      `purchased_${userId}`,
      JSON.stringify([...previous, ...timestampedItems])
    );
  };

  const buyNow = (item) => {
    const validItem = {
      ...item,
      quantity: Number(item.quantity) || 1,
      price: Number(item.price) || 0,
    };
    savePurchasedItems([validItem]);
    navigate("/checkout-payment", { state: { items: [validItem] } });
  };

  const buyAll = () => {
    const validCart = cart
      .filter((i) => i.quantity > 0 && i.price > 0)
      .map((i) => ({
        ...i,
        quantity: Number(i.quantity),
        price: Number(i.price),
      }));
    if (validCart.length === 0) return alert("No valid items to buy!");
    savePurchasedItems(validCart);
    navigate("/checkout-payment", { state: { items: validCart } });
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "15px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <div>
                    <h6 style={{ margin: "0 0 5px 0" }}>{item.name}</h6>
                    <p style={{ margin: "0 0 5px 0" }}>
                      Quantity: {item.quantity}
                    </p>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => buyNow(item)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => removeFromCart(item)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              padding: "15px",
              background: "#f8f9fa",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h5 style={{ margin: 0 }}>Total: ₹{totalAmount}</h5>
            <button
              onClick={buyAll}
              style={{
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Buy All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
