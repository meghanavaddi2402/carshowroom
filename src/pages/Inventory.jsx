import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Inventory() {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars();
  }, []);

  async function getCars() {
    try {
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.log("Error loading inventory:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCar(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/cars/${id}`);

      setCars((previousCars) =>
        previousCars.filter((car) => car.id !== id)
      );
    } catch (error) {
      console.log("Error deleting car:", error);
    }
  }

  const filteredCars = cars.filter((car) => {
    const searchMatch =
      car.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      car.model
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const brandMatch =
      brand === "All" || car.brand === brand;

    return searchMatch && brandMatch;
  });

  if (loading) {
    return (
      <div className="admin-page">
        <h2>Loading inventory...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">

      <div className="admin-page-header">
        <div>
          <p className="admin-label">
            ADMINISTRATION
          </p>

          <h1>
            Vehicle Inventory
          </h1>

          <p>
            Manage the cars available in the CarVista showroom.
          </p>
        </div>

        <Link
          to="/add-car"
          className="add-btn"
        >
          Add New Car
        </Link>
      </div>

      <div className="inventory-stats">

        <div className="inventory-stat-card">
          <h3>Total Vehicles</h3>
          <strong>{cars.length}</strong>
        </div>

        <div className="inventory-stat-card">
          <h3>Brands</h3>
          <strong>
            {new Set(cars.map((car) => car.brand)).size}
          </strong>
        </div>

        <div className="inventory-stat-card">
          <h3>Petrol Cars</h3>
          <strong>
            {
              cars.filter(
                (car) => car.fuel === "Petrol"
              ).length
            }
          </strong>
        </div>

        <div className="inventory-stat-card">
          <h3>Diesel Cars</h3>
          <strong>
            {
              cars.filter(
                (car) => car.fuel === "Diesel"
              ).length
            }
          </strong>
        </div>

      </div>

      <div className="inventory-filters">

        <input
          type="text"
          placeholder="Search vehicle..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
        >
          <option value="All">
            All Brands
          </option>

          {[...new Set(cars.map((car) => car.brand))].map(
            (brandName) => (
              <option
                key={brandName}
                value={brandName}
              >
                {brandName}
              </option>
            )
          )}
        </select>

      </div>

      <div className="inventory-table-container">

        <table className="inventory-table">

          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Year</th>
              <th>Fuel</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredCars.length > 0 ? (

              filteredCars.map((car) => (

                <tr key={car.id}>

                  <td>
                    <div className="inventory-vehicle">

                      <img
                        src={car.image}
                        alt={car.name}
                      />

                      <strong>
                        {car.name}
                      </strong>

                    </div>
                  </td>

                  <td>{car.brand}</td>

                  <td>{car.model}</td>

                  <td>{car.year}</td>

                  <td>{car.fuel}</td>

                  <td>
                    ₹
                    {Number(car.price).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td>

                    <div className="inventory-actions">

                      <Link
                        to={`/edit-car/${car.id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteCar(car.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="7"
                  className="no-inventory"
                >
                  No vehicles found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Inventory;