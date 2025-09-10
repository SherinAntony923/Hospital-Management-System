// import React, { useEffect, useState } from "react";

// const PurchasedItems = () => {
//   const [purchased, setPurchased] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("purchased")) || [];
//     setPurchased(data);
//   }, []);

//   if (purchased.length === 0)
//     return (
//       <p
//         style={{
//           maxWidth: "800px",
//           margin: "40px auto",
//           padding: "15px",
//           textAlign: "center",
//           fontSize: "16px",
//           color: "#666",
//         }}
//       >
//         No purchases yet.
//       </p>
//     );

//   return (
//     <div
//       style={{
//         maxWidth: "800px",
//         margin: "20px auto",
//         padding: "20px",
//         background: "#fff",
//       }}
//     >
//       <h2 style={{ marginBottom: "20px", fontSize: "22px", color: "#333" }}>
//         ✅ Purchased Items
//       </h2>

//       {purchased.map((item, idx) => (
//         <div
//           key={idx}
//           style={{
//             background: "#fafafa",
//             border: "1px solid #e5e5e5",
//             borderRadius: "10px",
//             marginBottom: "16px",
//             boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
//             transition: "transform 0.2s ease, box-shadow 0.2s ease",
//           }}
//         >
//           <div
//             style={{
//               padding: "15px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 style={{
//                   width: "80px",
//                   height: "80px",
//                   objectFit: "cover",
//                   borderRadius: "8px",
//                   border: "1px solid #ddd",
//                 }}
//               />
//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <h6
//                   style={{
//                     margin: "0 0 5px 0",
//                     fontSize: "16px",
//                     fontWeight: "600",
//                     color: "#222",
//                   }}
//                 >
//                   {item.name}
//                 </h6>
//                 <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
//                   Quantity: {item.quantity}
//                 </p>
//                 <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
//                   Price per item: ₹{item.price}
//                 </p>
//                 <p
//                   style={{
//                     margin: "0 0 6px 0",
//                     fontWeight: "600",
//                     color: "#28a745",
//                     fontSize: "15px",
//                   }}
//                 >
//                   Total: ₹{item.price * item.quantity}
//                 </p>
//                 <small style={{ fontSize: "12px", color: "#888" }}>
//                   Purchased at: {new Date(item.purchasedAt).toLocaleString()}
//                 </small>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PurchasedItems;

import React, { useEffect, useState } from "react";

const PurchasedItems = () => {
  const [purchased, setPurchased] = useState([]);
  const [userId, setUserId] = useState("guest");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user?.id || "guest";
    setUserId(id);

    const data = JSON.parse(localStorage.getItem(`purchased_${id}`)) || [];
    setPurchased(data);
  }, []);

  if (purchased.length === 0)
    return (
      <p
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "15px",
          textAlign: "center",
          fontSize: "16px",
          color: "#666",
        }}
      >
        No purchases yet.
      </p>
    );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        background: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "20px", fontSize: "22px", color: "#333" }}>
        ✅ Purchased Items
      </h2>

      {purchased.map((item, idx) => (
        <div
          key={idx}
          style={{
            background: "#fafafa",
            border: "1px solid #e5e5e5",
            borderRadius: "10px",
            marginBottom: "16px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          <div
            style={{
              padding: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h6
                  style={{
                    margin: "0 0 5px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#222",
                  }}
                >
                  {item.name}
                </h6>
                <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
                  Quantity: {item.quantity}
                </p>
                <p style={{ margin: "0 0 4px 0", fontSize: "14px", color: "#555" }}>
                  Price per item: ₹{item.price}
                </p>
                <p
                  style={{
                    margin: "0 0 6px 0",
                    fontWeight: "600",
                    color: "#28a745",
                    fontSize: "15px",
                  }}
                >
                  Total: ₹{item.price * item.quantity}
                </p>
                <small style={{ fontSize: "12px", color: "#888" }}>
                  Purchased at: {new Date(item.purchasedAt).toLocaleString()}
                </small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchasedItems;
