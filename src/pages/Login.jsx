import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response = await api.get("/users", {
        params: {
          email: email.trim().toLowerCase(),
          password: password
        }
      });

      if (response.data.length > 0) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data[0])
        );

        alert("Login successful");

        navigate("/");

        window.location.reload();

      } else {

        alert("Invalid email or password");

      }

    } catch (error) {

      console.log(error);

      alert("Unable to login");

    }
  }

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to CARVISTA
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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