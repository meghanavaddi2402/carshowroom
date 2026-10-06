import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cars from "../pages/Cars";
import CarDetails from "../pages/CarDetails";
import AddCar from "../pages/AddCar";
import EditCar from "../pages/EditCar";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/AdminDashboard";
function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/logout" element={<Logout />} />
      <Route
  path="/admin"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>

      {/* PROTECTED ROUTES */}

      <Route
        path="/cars"
        element={
          <ProtectedRoute>
            <Cars />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cars/:id"
        element={
          <ProtectedRoute>
            <CarDetails />
          </ProtectedRoute>
        }
      />

      <Route
  path="/add-car"
  element={
    <AdminRoute>
      <AddCar />
    </AdminRoute>
  }
/>
      <Route
  path="/edit-car/:id"
  element={
    <AdminRoute>
      <EditCar />
    </AdminRoute>
  }
/>

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