import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/properties"
      );

      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Add or update property
  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertyData = {
      title,
      price: Number(price),
      location,
      type,
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/properties/${editingId}`,
          propertyData
        );

        setMessage("Property updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(
          "http://localhost:5000/properties",
          propertyData
        );

        setMessage("Property added successfully!");
      }

      await fetchProperties();

      setTitle("");
      setPrice("");
      setLocation("");
      setType("");
    } catch (error) {
      console.error(error);
      setMessage("Error saving property");
    }
  };

  // Delete property
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/properties/${id}`
      );

      setMessage("Property deleted successfully!");

      await fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      setMessage("Error deleting property");
    }
  };

  // Edit property
  const handleEdit = (property) => {
    setEditingId(property._id);
    setTitle(property.title);
    setPrice(property.price);
    setLocation(property.location);
    setType(property.type);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      <h1>Real Estate Listing Manager</h1>

      {message && <p className="message">{message}</p>}

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-grid">

          <div className="form-group">
            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter property title"
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter property price"
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>

          <div className="form-group">
            <label>Property Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="House">House</option>
              <option value="Land">Land</option>
            </select>
          </div>

        </div>

        <button type="submit">
          {editingId ? "Update Property" : "Add Property"}
        </button>
      </form>

      <h2>Property Listings</h2>

      {properties.length === 0 ? (
        <p className="message">No properties found.</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <div className="property-card" key={property._id}>
              <h3>{property.title}</h3>

              <p>Price: ₹{property.price}</p>

              <p>Location: {property.location}</p>

              <p>Type: {property.type}</p>

              <button onClick={() => handleEdit(property)}>
                Edit
              </button>

              <button onClick={() => handleDelete(property._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;