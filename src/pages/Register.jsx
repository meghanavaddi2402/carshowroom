import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from "../utils/validation";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value
    });

    // Clear error for the field being edited
    setErrors({
      ...errors,
      [name]: ""
    });

    setServerError("");
  }

  // Validate all fields
  function validateForm() {
    const newErrors = {};

    const nameError = validateName(user.name);
    const emailError = validateEmail(user.email);
    const passwordError = validatePassword(user.password);
    const confirmPasswordError = validateConfirmPassword(
      user.password,
      user.confirmPassword
    );

    if (nameError) {
      newErrors.name = nameError;
    }

    if (emailError) {
      newErrors.email = emailError;
    }

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // Submit registration form
  async function handleSubmit(e) {
    e.preventDefault();

    setServerError("");

    // Stop if validation fails
    if (!validateForm()) {
      return;
    }

    try {
      // Check whether email already exists
      const existingUser = await api.get("/users", {
        params: {
          email: user.email.trim().toLowerCase()
        }
      });

      if (existingUser.data.length > 0) {
        setErrors({
          email: "An account with this email already exists"
        });

        return;
      }

      // Create new user
      await api.post("/users", {
        name: user.name.trim(),
        email: user.email.trim().toLowerCase(),
        password: user.password
      });

      alert("Registration successful! Please login.");

      navigate("/login");

    } catch (error) {
      console.error(error);

      setServerError(
        "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join CARVISTA
        </p>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
          />

          {errors.name && (
            <p className="form-error">
              {errors.name}
            </p>
          )}

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
          />

          {errors.email && (
            <p className="form-error">
              {errors.email}
            </p>
          )}

          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />

          {errors.password && (
            <p className="form-error">
              {errors.password}
            </p>
          )}

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
          />

          {errors.confirmPassword && (
            <p className="form-error">
              {errors.confirmPassword}
            </p>
          )}

          {/* PASSWORD REQUIREMENTS */}
          <div className="password-hint">

            <p>Password must contain:</p>

            <ul>
              <li>At least 8 characters</li>
              <li>At least 1 uppercase letter (A-Z)</li>
              <li>At least 1 lowercase letter (a-z)</li>
              <li>At least 1 number (0-9)</li>
              <li>
                At least 1 special character (@, $, !, %, *, ?, &)
              </li>
              <li>No spaces</li>
            </ul>

          </div>

          {/* SERVER ERROR */}
          {serverError && (
            <p className="form-error">
              {serverError}
            </p>
          )}

          {/* REGISTER BUTTON */}
          <button
            className="auth-btn"
            type="submit"
          >
            REGISTER
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;