import { useEffect, useState } from "react";
import api from "../services/api";

function CompareCars() {
  const [cars, setCars] = useState([]);
  const [selectedCars, setSelectedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars();
  }, []);

  async function getCars() {
    try {
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.log("Error loading cars:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelect(car) {
    const alreadySelected = selectedCars.some(
      (selected) => selected.id === car.id
    );

    if (alreadySelected) {
      setSelectedCars(
        selectedCars.filter(
          (selected) => selected.id !== car.id
        )
      );

      return;
    }

    if (selectedCars.length >= 4) {
      alert("You can compare maximum 4 cars.");
      return;
    }

    setSelectedCars([...selectedCars, car]);
  }

  function clearComparison() {
    setSelectedCars([]);
  }

  if (loading) {
    return <h2>Loading cars...</h2>;
  }

  return (
    <div className="compare-page">

      <h1>Compare Cars</h1>

      <p className="compare-subtitle">
        Select up to 4 cars and compare their specifications.
      </p>

      {/* CAR SELECTION */}

      <div className="compare-selection">

        {cars.map((car) => {

          const isSelected = selectedCars.some(
            (selected) => selected.id === car.id
          );

          return (
            <div
              key={car.id}
              className={`compare-car-card ${
                isSelected ? "selected-car" : ""
              }`}
            >

              <img
                src={car.image}
                alt={car.name}
              />

              <h3>{car.name}</h3>

              <p>
                ₹{Number(car.price).toLocaleString("en-IN")}
              </p>

              <button
                onClick={() => handleSelect(car)}
                className="compare-select-btn"
              >
                {isSelected ? "✓ Selected" : "Compare"}
              </button>

            </div>
          );
        })}

      </div>

      {/* SELECTED COUNT */}

      <div className="compare-summary">

        <h2>
          Selected Cars: {selectedCars.length}/4
        </h2>

        {selectedCars.length > 0 && (
          <button
            onClick={clearComparison}
            className="clear-compare-btn"
          >
            Clear Selection
          </button>
        )}

      </div>

      {/* COMPARISON TABLE */}

      {selectedCars.length >= 2 ? (

        <div className="comparison-table-container">

          <h2>Car Comparison</h2>

          <table className="comparison-table">

            <thead>
              <tr>

                <th>Specification</th>

                {selectedCars.map((car) => (
                  <th key={car.id}>
                    {car.name}
                  </th>
                ))}

              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Brand</td>

                {selectedCars.map((car) => (
                  <td key={car.id}>
                    {car.brand}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Model</td>

                {selectedCars.map((car) => (
                  <td key={car.id}>
                    {car.model}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Year</td>

                {selectedCars.map((car) => (
                  <td key={car.id}>
                    {car.year}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Price</td>

                {selectedCars.map((car) => (
                  <td key={car.id}>
                    ₹{Number(car.price).toLocaleString("en-IN")}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Fuel</td>

                {selectedCars.map((car) => (
                  <td key={car.id}>
                    {car.fuel}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Transmission</td>

                {selectedCars.map((car) => (
                  <td key={car.id}>
                    {car.transmission}
                  </td>
                ))}
              </tr>

              <tr>
                <td>Color</td>

                {selectedCars.map((car) => (
                  <td key={car.id}>
                    {car.color}
                  </td>
                ))}
              </tr>

            </tbody>

          </table>

        </div>

      ) : (

        <div className="compare-message">

          <h2>Select at least 2 cars</h2>

          <p>
            Choose two or more cars above to start comparing.
          </p>

        </div>

      )}

    </div>
  );
}

export default CompareCars;