import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  const favouriteCars = useSelector(
    (state) => state.favouriteCars
  );

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <nav>

      <div className="logo">
        CARVISTA
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        {!user && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="/cars">
              Cars
            </Link>

            <Link to="/favorites">
              Favourites ({favouriteCars.length})
            </Link>

            <Link to="/logout">
              Logout
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;