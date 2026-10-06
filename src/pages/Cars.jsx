import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import CarCard from "../components/CarCard";

function Cars() {

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const [cars, setCars] = useState([]);

  const [search, setSearch] = useState("");

  const [brand, setBrand] = useState("All");

  const [fuel, setFuel] = useState("All");

  const [price, setPrice] = useState("All");

  const [sort, setSort] = useState("");

  async function getCars() {

    try {

      const response = await api.get("/cars");

      setCars(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    getCars();

  }, []);

  async function deleteCar(id) {

    try {

      await api.delete(`/cars/${id}`);

      setCars((previousCars) =>
        previousCars.filter(
          (car) => car.id !== id
        )
      );

    } catch (error) {

      console.log(error);

    }

  }

  let filteredCars = cars.filter((car) => {

    const searchMatch =
      car.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const brandMatch =
      brand === "All" ||
      car.brand === brand;

    const fuelMatch =
      fuel === "All" ||
      car.fuel === fuel;

    let priceMatch = true;

    if (price === "low") {

      priceMatch =
        Number(car.price) < 2000000;

    }

    if (price === "medium") {

      priceMatch =
        Number(car.price) >= 2000000 &&
        Number(car.price) <= 4000000;

    }

    if (price === "high") {

      priceMatch =
        Number(car.price) > 4000000;

    }

    return (
      searchMatch &&
      brandMatch &&
      fuelMatch &&
      priceMatch
    );

  });

  let finalCars = [...filteredCars];

  if (sort === "low") {

    finalCars.sort(
      (a, b) =>
        Number(a.price) - Number(b.price)
    );

  }

  if (sort === "high") {

    finalCars.sort(
      (a, b) =>
        Number(b.price) - Number(a.price)
    );

  }

  return (

    <div className="cars">

      <h1>Available Cars</h1>

      {/* ADD CAR - ADMIN ONLY */}

      {user?.role === "admin" && (
        <Link
          className="add-btn"
          to="/add-car"
        >
          Add Car
        </Link>
      )}

      {/* FILTERS */}

      <div className="filters">

        <input
          type="text"
          placeholder="Search Car"
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

          <option value="Hyundai">
            Hyundai
          </option>

          <option value="Toyota">
            Toyota
          </option>

          <option value="Honda">
            Honda
          </option>

          <option value="BMW">
            BMW
          </option>

          <option value="Mercedes">
            Mercedes
          </option>

        </select>

        <select
          value={fuel}
          onChange={(e) =>
            setFuel(e.target.value)
          }
        >

          <option value="All">
            All Fuel Types
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

        <select
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        >

          <option value="All">
            All Prices
          </option>

          <option value="low">
            Below ₹20 Lakhs
          </option>

          <option value="medium">
            ₹20 - ₹40 Lakhs
          </option>

          <option value="high">
            Above ₹40 Lakhs
          </option>

        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="">
            Sort By Price
          </option>

          <option value="low">
            Price: Low To High
          </option>

          <option value="high">
            Price: High To Low
          </option>

        </select>

      </div>

      {/* CARS */}

      <div className="card-container">

        {finalCars.length > 0 ? (

          finalCars.map((car) => (

            <CarCard
              key={car.id}
              car={car}
              onDelete={deleteCar}
              isAdmin={user?.role === "admin"}
            />

          ))

        ) : (

          <h2>
            No cars found
          </h2>

        )}

      </div>

    </div>

  );

}

export default Cars;