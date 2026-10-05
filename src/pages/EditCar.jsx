import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  validateYear,
  validatePrice,
  validateUrl
} from "../utils/validation";

function EditCar() {

  const { id } = useParams();

  const navigate = useNavigate();


  // =========================
  // FORM DATA
  // =========================

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


  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");


  // =========================
  // GET CAR
  // =========================

  useEffect(() => {

    getCar();

  }, [id]);


  async function getCar() {

    try {

      const response = await api.get(
        `/cars/${id}`
      );

      setFormData(response.data);

    } catch (error) {

      console.error(error);

      setServerError(
        "Unable to load car details."
      );
    }
  }


  // =========================
  // HANDLE CHANGE
  // =========================

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error for the field
    setErrors({
      ...errors,
      [name]: ""
    });

    setServerError("");
  }


  // =========================
  // VALIDATE FORM
  // =========================

  function validateCarForm() {

    const newErrors = {};


    // Car Name
    if (!formData.name.trim()) {

      newErrors.name =
        "Car name is required";

    } else if (formData.name.trim().length < 2) {

      newErrors.name =
        "Car name must contain at least 2 characters";
    }


    // Brand
    if (!formData.brand.trim()) {

      newErrors.brand =
        "Brand is required";
    }


    // Model
    if (!formData.model.trim()) {

      newErrors.model =
        "Model is required";
    }


    // Year
    const yearError =
      validateYear(formData.year);

    if (yearError) {

      newErrors.year = yearError;
    }


    // Price
    const priceError =
      validatePrice(formData.price);

    if (priceError) {

      newErrors.price = priceError;
    }


    // Fuel
    if (!formData.fuel) {

      newErrors.fuel =
        "Please select fuel type";
    }


    // Transmission
    if (!formData.transmission.trim()) {

      newErrors.transmission =
        "Transmission is required";
    }


    // Color
    if (!formData.color.trim()) {

      newErrors.color =
        "Color is required";
    }


    // Image URL
    const imageError =
      validateUrl(formData.image);

    if (imageError) {

      newErrors.image = imageError;
    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }


  // =========================
  // UPDATE CAR
  // =========================

  async function handleSubmit(e) {

    e.preventDefault();

    setServerError("");


    // Validate before updating
    if (!validateCarForm()) {

      return;
    }


    try {

      await api.put(`/cars/${id}`, {

        ...formData,

        year: Number(formData.year),

        price: Number(formData.price)

      });


      alert("Car updated successfully!");

      navigate("/cars");


    } catch (error) {

      console.error(error);

      setServerError(
        "Failed to update car. Please try again."
      );
    }
  }


  // =========================
  // UI
  // =========================

  return (

    <div className="form-container">

      <h2>Edit Car</h2>


      <form onSubmit={handleSubmit}>


        {/* CAR NAME */}

        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
        />

        {errors.name && (
          <p className="form-error">
            {errors.name}
          </p>
        )}


        {/* BRAND */}

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
        />

        {errors.brand && (
          <p className="form-error">
            {errors.brand}
          </p>
        )}


        {/* MODEL */}

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
        />

        {errors.model && (
          <p className="form-error">
            {errors.model}
          </p>
        )}


        {/* YEAR */}

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        {errors.year && (
          <p className="form-error">
            {errors.year}
          </p>
        )}


        {/* PRICE */}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          min="1"
        />

        {errors.price && (
          <p className="form-error">
            {errors.price}
          </p>
        )}


        {/* FUEL */}

        <select
          name="fuel"
          value={formData.fuel}
          onChange={handleChange}
        >

          <option value="">
            Select fuel type
          </option>

          <option value="Petrol">
            Petrol
          </option>

          <option value="Diesel">
            Diesel
          </option>

          <option value="Electric">
            Electric
          </option>

          <option value="Hybrid">
            Hybrid
          </option>

        </select>

        {errors.fuel && (
          <p className="form-error">
            {errors.fuel}
          </p>
        )}


        {/* TRANSMISSION */}

        <input
          type="text"
          name="transmission"
          placeholder="Transmission"
          value={formData.transmission}
          onChange={handleChange}
        />

        {errors.transmission && (
          <p className="form-error">
            {errors.transmission}
          </p>
        )}


        {/* COLOR */}

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={formData.color}
          onChange={handleChange}
        />

        {errors.color && (
          <p className="form-error">
            {errors.color}
          </p>
        )}


        {/* IMAGE URL */}

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        {errors.image && (
          <p className="form-error">
            {errors.image}
          </p>
        )}


        {/* SERVER ERROR */}

        {serverError && (
          <p className="form-error">
            {serverError}
          </p>
        )}


        {/* UPDATE BUTTON */}

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