import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditCar() {

  const { id } = useParams();

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

  useEffect(() => {
    getCar();
  }, []);

  async function getCar() {

    const response = await api.get(
      `/cars/${id}`
    );

    setFormData(response.data);
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    await api.put(
      `/cars/${id}`,
      formData
    );

    navigate("/cars");
  }

  return (
    <div className="form-container">

      <h2>Edit Car</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
        />

        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />

        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="fuel"
          value={formData.fuel}
          onChange={handleChange}
        />

        <input
          type="text"
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
        />

        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <button
          className="submit-btn"
          type="submit"
        >
          Update Car
        </button>

      </form>

    </div>
  );
}

export default EditCar;