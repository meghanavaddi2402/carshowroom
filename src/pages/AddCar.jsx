import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AddCar() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    fuel: "",
    transmission: "",
    color: "",
    image: ""
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await api.post(
      "/cars",
      formData
    );

    navigate("/cars");
  }

  return (
    <div className="form-container">

      <h2>Add New Car</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Car Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          onChange={handleChange}
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          type="text"
          name="fuel"
          placeholder="Fuel Type"
          onChange={handleChange}
        />

        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          onChange={handleChange}
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <button
          className="submit-btn"
          type="submit"
        >
          Add Car
        </button>

      </form>

    </div>
  );
}

export default AddCar;