import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavouriteCar,
  removeFavouriteCar
} from "../features/favouriteCarSlice";

function CarCard({ car, onDelete, isAdmin }) {

  const dispatch = useDispatch();

  const favouriteCars = useSelector(
    (state) => state.favouriteCars
  );

  const isFavourite = favouriteCars.some(
    (item) => item.id === car.id
  );

  return (
    <div className="card">

      <img
        src={car.image}
        alt={car.name}
      />

      <h3>{car.name}</h3>

      <p>Brand: {car.brand}</p>

      <p>Model: {car.model}</p>

      <p>Year: {car.year}</p>

      <p>Fuel: {car.fuel}</p>

      <p>Transmission: {car.transmission}</p>

      <p>₹ {car.price}</p>

      {/* View Details - Everyone can access */}

      <Link to={`/cars/${car.id}`}>
        View Details
      </Link>

      {/* Edit - Admin Only */}

      {isAdmin && (
        <Link
          className="edit-btn"
          to={`/edit-car/${car.id}`}
        >
          Edit
        </Link>
      )}

      {/* Delete - Admin Only */}

      {isAdmin && (
        <button
          className="delete-btn"
          onClick={() => onDelete(car.id)}
        >
          Delete
        </button>
      )}

      {/* Favourite - Available to logged-in users */}

      {isFavourite ? (

        <button
          className="favorite-btn"
          onClick={() =>
            dispatch(removeFavouriteCar(car.id))
          }
        >
          ♥ Remove Favourite
        </button>

      ) : (

        <button
          className="favorite-btn"
          onClick={() =>
            dispatch(addFavouriteCar(car))
          }
        >
          ♡ Add to Favourite
        </button>

      )}

    </div>
  );
}

export default CarCard;