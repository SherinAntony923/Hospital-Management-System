// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// const Store = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [search, setSearch] = useState("");

//   // Fetch medicines and lab items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const medRes = await api.get("/medicines/");
//         const labRes = await api.get("/laboratory-items/");
//         setItems([
//           ...medRes.data.map(i => ({ ...i, type: "medicine" })),
//           ...labRes.data.map(i => ({ ...i, type: "laboratory" }))
//         ]);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchItems();
//   }, []);

//   // Save purchased items
//   const savePurchasedItems = (items) => {
//     const previous = JSON.parse(localStorage.getItem("purchased")) || [];
//     const timestampedItems = items.map(i => ({
//       ...i,
//       purchasedAt: new Date().toISOString()
//     }));
//     localStorage.setItem("purchased", JSON.stringify([...previous, ...timestampedItems]));
//   };

//   // Add to cart
//   const addToCart = (item) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find(i => i.id === item.id && i.type === item.type);
//     if (existing) {
//       cart = cart.map(i =>
//         i.id === item.id && i.type === item.type
//           ? { ...i, quantity: i.quantity + 1 }
//           : i
//       );
//     } else {
//       cart.push({ ...item, quantity: 1 });
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${item.name} added to cart!`);
//   };

//   // Buy now directly
//   const buyNow = (item) => {
//     const validItem = {
//       ...item,
//       quantity: 1,
//       price: Number(item.price),
//     };
//     savePurchasedItems([validItem]);
//     navigate("/checkout-payment", { state: { items: [validItem] } });
//   };

//   const filteredItems = items
//     .filter(i => category === "all" || i.type === category)
//     .filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="container mt-4">
//       <h2>🛍️ Store</h2>

//       <div className="d-flex gap-3 mb-3 flex-wrap">
//         <input
//           type="text"
//           placeholder="Search items..."
//           className="form-control"
//           style={{ maxWidth: "300px" }}
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//         <button className={`btn btn-${category === "all" ? "primary" : "secondary"}`} onClick={() => setCategory("all")}>All</button>
//         <button className={`btn btn-${category === "medicine" ? "primary" : "secondary"}`} onClick={() => setCategory("medicine")}>Medicines</button>
//         <button className={`btn btn-${category === "laboratory" ? "primary" : "secondary"}`} onClick={() => setCategory("laboratory")}>Laboratory</button>
//       </div>

//       <div className="row">
//         {filteredItems.map(item => (
//           <div className="col-md-4 mb-4" key={item.id}>
//             <div className="card h-100">
//               {item.image && <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "150px", objectFit: "cover" }} />}
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title">{item.name}</h5>
//                 <p className="card-text">{item.description}</p>
//                 <p><strong>₹{item.price}</strong></p>
//                 <div className="mt-auto d-flex gap-2">
//                   <button className="btn btn-success flex-fill" onClick={() => addToCart(item)}>Add to Cart</button>
//                   <button className="btn btn-primary flex-fill" onClick={() => buyNow(item)}>Buy Now</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-3">
//         <button className="btn btn-warning" onClick={() => navigate("/cart")}>Go to Cart</button>
//         <button className="btn btn-info ms-2" onClick={() => navigate("/purchased-items")}>View Purchased Items</button>
//       </div>
//     </div>
//   );
// };

// export default Store;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// const Store = () => {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [search, setSearch] = useState("");

//   // Fetch medicines and lab items
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const medRes = await api.get("/medicines/");
//         const labRes = await api.get("/laboratory-items/");
//         setItems([
//           ...medRes.data.map((i) => ({ ...i, type: "medicine" })),
//           ...labRes.data.map((i) => ({ ...i, type: "laboratory" })),
//         ]);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchItems();
//   }, []);

//   // Save purchased items
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

//   // Add to cart
//   const addToCart = (item) => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const existing = cart.find((i) => i.id === item.id && i.type === item.type);
//     if (existing) {
//       cart = cart.map((i) =>
//         i.id === item.id && i.type === item.type
//           ? { ...i, quantity: i.quantity + 1 }
//           : i
//       );
//     } else {
//       cart.push({ ...item, quantity: 1 });
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(`${item.name} added to cart!`);
//   };

//   // Buy now directly
//   const buyNow = (item) => {
//     const validItem = {
//       ...item,
//       quantity: 1,
//       price: Number(item.price),
//     };
//     savePurchasedItems([validItem]);
//     navigate("/checkout-payment", { state: { items: [validItem] } });
//   };

//   const filteredItems = items
//     .filter((i) => category === "all" || i.type === category)
//     .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div
//       style={{
//         padding: "30px",
//         backgroundColor: "#f8f9fa",
//         minHeight: "100vh",
//       }}
//     >
//       <h2
//         style={{
//           textAlign: "center",
//           marginBottom: "30px",
//           fontWeight: "bold",
//           color: "#2c3e50",
//         }}
//       >
//         🛍️ Store
//       </h2>

//       {/* Search + Filters */}
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "10px",
//           justifyContent: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <input
//           type="text"
//           placeholder="Search items..."
//           style={{
//             padding: "8px 12px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//             minWidth: "250px",
//           }}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {["all", "medicine", "laboratory"].map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             style={{
//               padding: "8px 16px",
//               border: "none",
//               borderRadius: "8px",
//               cursor: "pointer",
//               backgroundColor: category === cat ? "#3498db" : "#bdc3c7",
//               color: "white",
//               fontWeight: "bold",
//               transition: "0.3s",
//             }}
//           >
//             {cat.charAt(0).toUpperCase() + cat.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Product Grid */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {filteredItems.map((item) => (
//           <div
//             key={item.id}
//             style={{
//               backgroundColor: "white",
//               borderRadius: "12px",
//               boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//               overflow: "hidden",
//               display: "flex",
//               flexDirection: "column",
//               transition: "transform 0.2s",
//             }}
//           >
//             {item.image && (
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 style={{
//                   width: "100%",
//                   height: "180px",
//                   objectFit: "cover",
//                 }}
//               />
//             )}
//             <div style={{ padding: "15px", flex: 1 }}>
//               <h5 style={{ fontSize: "18px", fontWeight: "600" }}>
//                 {item.name}
//               </h5>
//               <p style={{ fontSize: "14px", color: "#555" }}>
//                 {item.description}
//               </p>
//               <p style={{ fontWeight: "bold", fontSize: "16px", color: "#27ae60" }}>
//                 ₹{item.price}
//               </p>
//               <div
//                 style={{
//                   marginTop: "auto",
//                   display: "flex",
//                   gap: "10px",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <button
//                   onClick={() => addToCart(item)}
//                   style={{
//                     flex: 1,
//                     padding: "8px",
//                     borderRadius: "8px",
//                     border: "none",
//                     backgroundColor: "#2ecc71",
//                     color: "white",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => buyNow(item)}
//                   style={{
//                     flex: 1,
//                     padding: "8px",
//                     borderRadius: "8px",
//                     border: "none",
//                     backgroundColor: "#2980b9",
//                     color: "white",
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Cart & Purchased Buttons */}
//       <div
//         style={{
//           marginTop: "30px",
//           display: "flex",
//           justifyContent: "center",
//           gap: "15px",
//         }}
//       >
//         <button
//           onClick={() => navigate("/cart")}
//           style={{
//             padding: "10px 20px",
//             border: "none",
//             borderRadius: "8px",
//             backgroundColor: "#f39c12",
//             color: "white",
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//         >
//           Go to Cart
//         </button>
//         <button
//           onClick={() => navigate("/purchased-items")}
//           style={{
//             padding: "10px 20px",
//             border: "none",
//             borderRadius: "8px",
//             backgroundColor: "#16a085",
//             color: "white",
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//         >
//           View Purchased Items
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Store;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Store = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState("guest");

  // Get logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id || "guest";
    setUserId(id);
  }, []);

  // Fetch medicines and lab items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const medRes = await api.get("/medicines/");
        const labRes = await api.get("/laboratory-items/");
        setItems([
          ...medRes.data.map((i) => ({ ...i, type: "medicine" })),
          ...labRes.data.map((i) => ({ ...i, type: "laboratory" })),
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  // Add item to user's cart
  const addToCart = (item) => {
    const currentCart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    const existing = currentCart.find((i) => i.id === item.id && i.type === item.type);

    let updatedCart;
    if (existing) {
      updatedCart = currentCart.map((i) =>
        i.id === item.id && i.type === item.type
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      updatedCart = [...currentCart, { ...item, quantity: 1 }];
    }

    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
    alert(`${item.name} added to cart!`);
  };

  // Buy item directly
  const buyNow = (item) => {
    const validItem = {
      ...item,
      quantity: 1,
      price: Number(item.price),
    };
    savePurchasedItems([validItem]);
    navigate("/checkout-payment", { state: { items: [validItem] } });
  };

  // Save purchased items per user
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

  // Filter items by category and search
  const filteredItems = items
    .filter((i) => category === "all" || i.type === category)
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: "30px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontWeight: "bold", color: "#2c3e50" }}>
        🛍️ Store
      </h2>

      {/* Search + Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search items..."
          style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #ccc", minWidth: "250px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {["all", "medicine", "laboratory"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: category === cat ? "#3498db" : "#bdc3c7",
              color: "white",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s",
            }}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "180px", objectFit: "cover" }}
              />
            )}
            <div style={{ padding: "15px", flex: 1 }}>
              <h5 style={{ fontSize: "18px", fontWeight: "600" }}>{item.name}</h5>
              <p style={{ fontSize: "14px", color: "#555" }}>{item.description}</p>
              <p style={{ fontWeight: "bold", fontSize: "16px", color: "#27ae60" }}>₹{item.price}</p>
              <div style={{ marginTop: "auto", display: "flex", gap: "10px", justifyContent: "space-between" }}>
                <button
                  onClick={() => addToCart(item)}
                  style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", backgroundColor: "#2ecc71", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => buyNow(item)}
                  style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", backgroundColor: "#2980b9", color: "white", fontWeight: "bold", cursor: "pointer" }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart & Purchased Buttons */}
      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "15px" }}>
        <button
          onClick={() => navigate("/cart")}
          style={{ padding: "10px 20px", border: "none", borderRadius: "8px", backgroundColor: "#f39c12", color: "white", fontWeight: "bold", cursor: "pointer" }}
        >
          Go to Cart
        </button>
        <button
          onClick={() => navigate("/purchased-items")}
          style={{ padding: "10px 20px", border: "none", borderRadius: "8px", backgroundColor: "#16a085", color: "white", fontWeight: "bold", cursor: "pointer" }}
        >
          View Purchased Items
        </button>
      </div>
    </div>
  );
};

export default Store;
