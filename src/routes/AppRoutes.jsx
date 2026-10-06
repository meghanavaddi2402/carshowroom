import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarDetails from "../pages/CarDetails";
import AddCar from "../pages/AddCar";
import EditCar from "../pages/EditCar";
import Favorites from "../pages/Favorites";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

function AppRoutes() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/logout"
        element={<Logout />}
      />

      {/* Cars - Logged-in users */}
      <Route
        path="/cars"
        element={
          <ProtectedRoute>
            <Cars />
          </ProtectedRoute>
        }
      />

      {/* Car Details */}
      <Route
        path="/cars/:id"
        element={
          <ProtectedRoute>
            <CarDetails />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard → Manage Cars */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Cars />
          </AdminRoute>
        }
      />

      {/* Add Car - Admin Only */}
      <Route
        path="/add-car"
        element={
          <AdminRoute>
            <AddCar />
          </AdminRoute>
        }
      />

      {/* Edit Car - Admin Only */}
      <Route
        path="/edit-car/:id"
        element={
          <AdminRoute>
            <EditCar />
          </AdminRoute>
        }
      />

      {/* Favourites */}
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;