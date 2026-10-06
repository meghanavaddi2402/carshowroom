import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { validateEmail } from "../utils/validation";

import { setFavouriteCars } from "../features/favouriteCarSlice";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // ========================================
  // VALIDATE LOGIN FORM
  // ========================================

  function validateForm() {

    const newErrors = {};

    const emailError = validateEmail(email);

    if (emailError) {
      newErrors.email = emailError;
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // ========================================
  // LOGIN
  // ========================================

  async function handleSubmit(e) {

    e.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {

      const response = await api.get("/users", {
        params: {
          email: email.trim(),
          password: password
        }
      });

      console.log("Login response:", response.data);

      // ========================================
      // USER FOUND
      // ========================================

      if (response.data.length > 0) {

        const loggedInUser = response.data[0];

        console.log("Logged in user:", loggedInUser);

        // ========================================
        // SAVE USER
        // ========================================

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        // ========================================
        // LOAD USER FAVOURITES
        // ========================================

        const favouriteKey =
          `carvista_favourites_${loggedInUser.email
            .trim()
            .toLowerCase()}`;

        const savedFavourites =
          localStorage.getItem(favouriteKey);

        const favouriteCars = savedFavourites
          ? JSON.parse(savedFavourites)
          : [];

        dispatch(
          setFavouriteCars(favouriteCars)
        );

        // ========================================
        // SUCCESS
        // ========================================

        alert(
          `Login successful! Welcome ${loggedInUser.name}`
        );

        navigate("/");

        window.location.reload();

      } else {

        setServerError(
          "Invalid email or password"
        );

      }

    } catch (error) {

      console.error("Login error:", error);

      setServerError(
        "Unable to login. Please try again."
      );
    }
  }

  // ========================================
  // EMAIL CHANGE
  // ========================================

  function handleEmailChange(e) {

    setEmail(e.target.value);

    setErrors({
      ...errors,
      email: ""
    });

    setServerError("");
  }

  // ========================================
  // PASSWORD CHANGE
  // ========================================

  function handlePasswordChange(e) {

    setPassword(e.target.value);

    setErrors({
      ...errors,
      password: ""
    });

    setServerError("");
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to CARVISTA
        </p>

        <form onSubmit={handleSubmit}>

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={handleEmailChange}
          />

          {errors.email && (
            <p className="form-error">
              {errors.email}
            </p>
          )}

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          {errors.password && (
            <p className="form-error">
              {errors.password}
            </p>
          )}

          {/* SERVER ERROR */}

          {serverError && (
            <p className="form-error">
              {serverError}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button
            className="auth-btn"
            type="submit"
          >
            LOGIN
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;