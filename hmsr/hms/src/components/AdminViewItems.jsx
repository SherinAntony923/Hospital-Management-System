// import React, { useEffect, useState } from "react";
// import api from "../api";

// const AdminViewItems = () => {
//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState("medicine");

//   // Fetch items based on category
//   const fetchItems = async () => {
//     try {
//       const endpoint = category === "medicine" ? "/medicines/" : "/laboratory-items/";
//       const res = await api.get(endpoint);
//       setItems(res.data);
//     } catch (err) {
//       console.error("Error fetching items:", err);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [category]);

//   // Delete item based on category
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this item?")) return;

//     try {
//       const endpoint =
//         category === "medicine" ? `/medicines/${id}/` : `/laboratory-items/${id}/`;
//       await api.delete(endpoint);
//       alert("Item deleted successfully!");
//       fetchItems(); // refresh list
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete item.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>View Items</h2>

//       {/* Category Buttons */}
//       <div className="mb-3">
//         <button
//           className={`btn btn-${category === "medicine" ? "primary" : "secondary"} me-2`}
//           onClick={() => setCategory("medicine")}
//         >
//           Medicines
//         </button>
//         <button
//           className={`btn btn-${category === "laboratory-items" ? "primary" : "secondary"}`}
//           onClick={() => setCategory("laboratory-items")}
//         >
//           Laboratory Items
//         </button>
//       </div>

//       {/* Item Cards */}
//       <div className="row">
//         {items.length === 0 && (
//           <p className="text-muted">No items found in this category.</p>
//         )}
//         {items.map((item) => (
//           <div className="col-md-4" key={item.id}>
//             <div className="card mb-4">
//               {item.image && (
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="card-img-top"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//               )}
//               <div className="card-body">
//                 <h5 className="card-title">{item.name}</h5>
//                 <p className="card-text">{item.description}</p>
//                 <p><strong>₹{item.price}</strong></p>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminViewItems;


import React, { useEffect, useState } from "react";
import api from "../api";

const AdminViewItems = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("medicine");

  const fetchItems = async () => {
    try {
      const endpoint = category === "medicine" ? "/medicines/" : "/laboratory-items/";
      const res = await api.get(endpoint);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const endpoint =
        category === "medicine" ? `/medicines/${id}/` : `/laboratory-items/${id}/`;
      await api.delete(endpoint);
      alert("Item deleted successfully!");
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete item.");
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "40px auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#333",
    },
    categoryButtons: {
      marginBottom: "25px",
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    },
    categoryBtn: (active) => ({
      padding: "10px 20px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "14px",
      backgroundColor: active ? "#0d6efd" : "#6c757d",
      color: "#fff",
      transition: "0.3s",
    }),
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      overflow: "hidden",
      marginBottom: "20px",
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    cardImage: {
      height: "200px",
      objectFit: "cover",
      width: "100%",
    },
    cardBody: {
      padding: "15px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    cardTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#333",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "10px",
      flexGrow: 1,
    },
    priceText: {
      fontWeight: "700",
      color: "#28a745",
      marginBottom: "15px",
      fontSize: "16px",
    },
    deleteBtn: {
      padding: "10px",
      border: "none",
      borderRadius: "6px",
      backgroundColor: "#dc3545",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      transition: "0.3s",
    },
    noItems: {
      textAlign: "center",
      color: "#888",
      marginTop: "30px",
      fontSize: "16px",
    },
    row: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    col: {
      flex: "0 0 30%",
      minWidth: "250px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Items</h2>

      {/* Category Buttons */}
      <div style={styles.categoryButtons}>
        <button
          style={styles.categoryBtn(category === "medicine")}
          onClick={() => setCategory("medicine")}
        >
          Medicines
        </button>
        <button
          style={styles.categoryBtn(category === "laboratory-items")}
          onClick={() => setCategory("laboratory-items")}
        >
          Laboratory Items
        </button>
      </div>

      {/* Item Cards */}
      <div style={styles.row}>
        {items.length === 0 && <p style={styles.noItems}>No items found in this category.</p>}
        {items.map((item) => (
          <div style={styles.col} key={item.id}>
            <div style={styles.card}>
              {item.image && <img src={item.image} alt={item.name} style={styles.cardImage} />}
              <div style={styles.cardBody}>
                <h5 style={styles.cardTitle}>{item.name}</h5>
                <p style={styles.cardText}>{item.description}</p>
                <p style={styles.priceText}>₹{item.price}</p>
                <button style={styles.deleteBtn} onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminViewItems;
