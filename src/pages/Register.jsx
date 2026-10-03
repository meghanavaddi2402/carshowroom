import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.post("/users", user);

      alert("Registration successful");

      navigate("/login");

    } catch (error) {

      console.log(error);
      alert("Registration failed");

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

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

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