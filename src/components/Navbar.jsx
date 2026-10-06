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
  <Link to="/compare-cars">
    Compare Cars
  </Link>
)}
        {user && (
          <Link to="/favorites">
            Favourites ({favouriteCars.length})
          </Link>
        )}

        {/* USER: MY TEST DRIVES */}
        {user && user.role !== "admin" && (
  <Link to="/my-test-drives">
    My Test Drives
  </Link>
)}

        {/* ADMIN: ADMIN DASHBOARD */}
        {user?.role === "admin" && (
          <Link to="/admin">
            Admin Dashboard
          </Link>
        )}

        {/* ADMIN: ALL TEST DRIVE BOOKINGS */}
        {user?.role === "admin" && (
          <Link to="/admin/test-drives">
            Test Drive Schedule
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