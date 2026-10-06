import { Link } from "react-router-dom";

function AdminDashboard() {

  return (
    <div className="admin-page">

      <h1>Admin Dashboard</h1>

      <p>Welcome, Admin!</p>

      <div className="admin-actions">

        <Link to="/cars">
          Manage Cars
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;