// import React, { useState } from "react";
// import api from "../api";

// const AdminAddItems = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: null,
//     category: "medicine",
//   });

//   const [preview, setPreview] = useState(null); // ✅ for image preview

//   // handle input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] });
//       setPreview(URL.createObjectURL(files[0])); // show preview
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", formData.name);
//     data.append("description", formData.description);
//     data.append("price", formData.price);
//     if (formData.image) data.append("image", formData.image);

//     const endpoint =
//       formData.category === "medicine" ? "/medicines/" : "/laboratory-items/";

//     try {
//       const res = await api.post(endpoint, data); // ✅ let Axios set multipart automatically
//       alert("Item added successfully!");
//       console.log("Created item:", res.data);

//       // reset form
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         image: null,
//         category: "medicine",
//       });
//       setPreview(null);
//       document.getElementById("image").value = "";
//     } catch (err) {
//       console.error(err.response?.data || err);
//       alert("Failed to add item.");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Add Item (Medicine / Laboratory)</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         {/* Name */}
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input
//             type="text"
//             name="name"
//             className="form-control"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-3">
//           <label className="form-label">Description / Use</label>
//           <input
//             type="text"
//             name="description"
//             className="form-control"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Price */}
//         <div className="mb-3">
//           <label className="form-label">Price</label>
//           <input
//             type="number"
//             name="price"
//             className="form-control"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Image */}
//         <div className="mb-3">
//           <label className="form-label">Image</label>
//           <input
//             type="file"
//             name="image"
//             id="image"
//             className="form-control"
//             onChange={handleChange}
//             accept="image/*"
//             required
//           />
//           {preview && (
//             <img
//               src={preview}
//               alt="Preview"
//               style={{ marginTop: "10px", height: "150px", objectFit: "cover" }}
//             />
//           )}
//         </div>

//         {/* Category */}
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <select
//             name="category"
//             className="form-control"
//             value={formData.category}
//             onChange={handleChange}
//           >
//             <option value="medicine">Medicine</option>
//             <option value="laboratory-items">Laboratory Item</option>
//           </select>
//         </div>

//         <button type="submit" className="btn btn-success">
//           Add Item
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminAddItems;


import React, { useState } from "react";
import api from "../api";

const AdminAddItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
    category: "medicine",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (formData.image) data.append("image", formData.image);

    const endpoint =
      formData.category === "medicine" ? "/medicines/" : "/laboratory-items/";

    try {
      const res = await api.post(endpoint, data);
      alert("Item added successfully!");
      console.log("Created item:", res.data);

      setFormData({
        name: "",
        description: "",
        price: "",
        image: null,
        category: "medicine",
      });
      setPreview(null);
      document.getElementById("image").value = "";
    } catch (err) {
      console.error(err.response?.data || err);
      alert("Failed to add item.");
    }
  };

  // Inline CSS styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      backgroundColor: "#fdfdfd",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#333",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      fontWeight: "600",
      marginBottom: "5px",
      display: "block",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
    },
    select: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      outline: "none",
      backgroundColor: "#fff",
    },
    imagePreview: {
      marginTop: "10px",
      height: "150px",
      width: "150px",
      objectFit: "cover",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#28a745",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add Item (Medicine / Laboratory)</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Name */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Description / Use</label>
          <input
            type="text"
            name="description"
            style={styles.input}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Price</label>
          <input
            type="number"
            name="price"
            style={styles.input}
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Image</label>
          <input
            type="file"
            name="image"
            id="image"
            style={styles.input}
            onChange={handleChange}
            accept="image/*"
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={styles.imagePreview}
            />
          )}
        </div>

        {/* Category */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
            name="category"
            style={styles.select}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="medicine">Medicine</option>
            <option value="laboratory-items">Laboratory Item</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AdminAddItems;
