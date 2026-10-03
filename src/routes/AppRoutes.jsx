import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarDetails from "../pages/CarDetails";
import AddCar from "../pages/AddCar";
import EditCar from "../pages/EditCar";

import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";

import ProtectedRoute from "./ProtectedRoute";
import Favorites from "../pages/Favorites";

function AppRoutes() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/cars"
        element={<Cars />}
      />

      <Route
        path="/cars/:id"
        element={<CarDetails />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Add Car */}

      <Route
        path="/add-car"
        element={
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>
        }
      />

      {/* Protected Edit Car */}

      <Route
        path="/edit-car/:id"
        element={
          <ProtectedRoute>
            <EditCar />
          </ProtectedRoute>
        }
      />

      {/* Logout */}

      <Route
        path="/logout"
        element={<Logout />}
      />
      <Route
        path="/favorites"
        element={<Favorites/>}
      />
    </Routes>

  );
}

export default AppRoutes;