import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const favouriteCars = useSelector(
    (state) => state.favouriteCars
  );

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav>
      {/* LEFT SIDE */}
      <div className="nav-left">

        <Link to="/" className="logo">
          CARVISTA
        </Link>

        {user && (
          <div className="navbar-user">
            <div className="user-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <span className="user-name">
              {user.name}
            </span>
          </div>
        )}

      </div>

      {/* RIGHT SIDE */}
      <div className="nav-links">

  <Link to="/">
    Home
  </Link>

  {user && (
    <Link to="/cars">
      Cars
    </Link>
  )}

  {user && (
    <Link to="/favorites">
      Favourites ({favouriteCars.length})
    </Link>
  )}

  {user ? (
    <Link to="/logout">
      Logout
    </Link>
  ) : (
    <>
      <Link to="/login">
        Login
      </Link>

      <Link to="/register">
        Register
      </Link>
    </>
  )}

</div>
    </nav>
  );
}

export default Navbar;