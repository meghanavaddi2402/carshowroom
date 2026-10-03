import { useDispatch, useSelector } from "react-redux";
import { removeFavouriteCar } from "../features/favouriteCarSlice";

function Favorites() {

  const dispatch = useDispatch();

  const favouriteCars = useSelector(
    (state) => state.favouriteCars
  );

  return (
    <div className="favorites-container">

      <h1>My Favourite Cars</h1>

      {favouriteCars.length === 0 ? (

        <div className="empty-favorites">
          <h2>No Favourite Cars</h2>
          <p>Add cars from the Cars page.</p>
        </div>

      ) : (

        <div className="card-container">

          {favouriteCars.map((car) => (

            <div className="card" key={car.id}>

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

              <button
                className="delete-btn"
                onClick={() =>
                  dispatch(removeFavouriteCar(car.id))
                }
              >
                Remove Favourite
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Favorites;