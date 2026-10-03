import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function CarDetails() {

  const { id } = useParams();

  const [car, setCar] = useState(null);

  useEffect(() => {
    getCar();
  }, [id]);

  async function getCar() {

    try {

      const response = await api.get(
        `/cars/${id}`
      );

      setCar(response.data);

    } catch (error) {

      console.log(error);

    }

  }

  if (!car) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details">

      <img
        src={car.image}
        alt={car.name}
      />

      <h1>{car.name}</h1>

      <h3>Brand</h3>
      <p>{car.brand}</p>

      <h3>Model</h3>
      <p>{car.model}</p>

      <h3>Year</h3>
      <p>{car.year}</p>

      <h3>Fuel Type</h3>
      <p>{car.fuel}</p>

      <h3>Transmission</h3>
      <p>{car.transmission}</p>

      <h3>Color</h3>
      <p>{car.color}</p>

      <h3>Price</h3>
      <p>
        {Number(car.price).toLocaleString("en-IN")}
      </p>

    </div>
  );
}

export default CarDetails;