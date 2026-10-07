import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddCar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    color: "",
    price: "",
    image: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.brand ||
      !formData.model ||
      !formData.year ||
      !formData.fuel ||
      !formData.transmission ||
      !formData.color ||
      !formData.price ||
      !formData.image
    ) {
      setError("Please fill in all vehicle details.");
      return;
    }

    if (Number(formData.year) < 1886) {
      setError("Please enter a valid manufacturing year.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    try {
      await api.post("/cars", {
        name: formData.name,
        brand: formData.brand,
        model: formData.model,
        year: Number(formData.year),
        fuel: formData.fuel,
        transmission: formData.transmission,
        color: formData.color,
        price: Number(formData.price),
        image: formData.image
      });

      setSuccess("Vehicle added successfully.");

      setTimeout(() => {
        navigate("/admin/inventory");
      }, 1000);

    } catch (error) {
      console.log("Error adding vehicle:", error);
      setError("Unable to add vehicle. Please try again.");
    }
  }

  return (
    <div className="add-car-page">

      <div className="add-car-header">

        <div>
          <p className="add-car-label">
            ADMINISTRATION
          </p>

          <h1>
            Add New Vehicle
          </h1>

          <p>
            Add a new vehicle to the CarVista showroom inventory.
          </p>
        </div>

        <button
          className="back-inventory-btn"
          onClick={() => navigate("/admin/inventory")}
        >
          Back to Inventory
        </button>

      </div>


      <form
        className="add-car-card"
        onSubmit={handleSubmit}
      >

        {error && (
          <div className="add-car-error">
            {error}
          </div>
        )}

        {success && (
          <div className="add-car-success">
            {success}
          </div>
        )}


        <div className="add-car-section">

          <div className="section-number">
            01
          </div>

          <div className="section-heading">
            <h2>
              Vehicle Information
            </h2>

            <p>
              Enter the basic details of the vehicle.
            </p>
          </div>


          <div className="add-car-form-grid">

            <div className="add-car-field">

              <label>
                Vehicle Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Creta"
              />

            </div>


            <div className="add-car-field">

              <label>
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Example: Hyundai"
              />

            </div>


            <div className="add-car-field">

              <label>
                Model
              </label>

              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Example: Creta SX"
              />

            </div>


            <div className="add-car-field">

              <label>
                Manufacturing Year
              </label>

              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Example: 2025"
              />

            </div>

          </div>

        </div>


        <div className="add-car-divider"></div>


        <div className="add-car-section">

          <div className="section-number">
            02
          </div>

          <div className="section-heading">

            <h2>
              Vehicle Specifications
            </h2>

            <p>
              Provide the technical specifications.
            </p>

          </div>


          <div className="add-car-form-grid">

            <div className="add-car-field">

              <label>
                Fuel Type
              </label>

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

            </div>


            <div className="add-car-field">

              <label>
                Transmission
              </label>

              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >

                <option value="">
                  Select transmission
                </option>

                <option value="Manual">
                  Manual
                </option>

                <option value="Automatic">
                  Automatic
                </option>

              </select>

            </div>


            <div className="add-car-field">

              <label>
                Exterior Color
              </label>

              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Example: Pearl White"
              />

            </div>


            <div className="add-car-field">

              <label>
                Vehicle Price
              </label>

              <div className="price-input">

                <span>
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Example: 1850000"
                />

              </div>

            </div>

          </div>

        </div>


        <div className="add-car-divider"></div>


        <div className="add-car-section">

          <div className="section-number">
            03
          </div>

          <div className="section-heading">

            <h2>
              Vehicle Image
            </h2>

            <p>
              Add an image URL for the vehicle.
            </p>

          </div>


          <div className="image-section">

            <div className="add-car-field image-url-field">

              <label>
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/car.jpg"
              />

              <small>
                Use a direct image URL for the vehicle.
              </small>

            </div>


            <div className="image-preview-container">

              <p>
                Vehicle Preview
              </p>

              {formData.image ? (

                <img
                  src={formData.image}
                  alt="Vehicle preview"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

              ) : (

                <div className="image-placeholder">
                  Image preview will appear here
                </div>

              )}

            </div>

          </div>

        </div>


        <div className="add-car-actions">

          <button
            type="button"
            className="add-car-cancel"
            onClick={() => navigate("/admin/inventory")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-car-submit"
          >
            Add Vehicle
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddCar;