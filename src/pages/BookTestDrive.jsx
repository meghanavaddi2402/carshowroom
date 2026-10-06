import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function BookTestDrive() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [car, setCar] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    location: "Showroom",
    address: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    getCar();
  }, [id]);

  async function getCar() {
    try {
      const response = await api.get(`/cars/${id}`);
      setCar(response.data);
    } catch (error) {
      console.log(error);
      setError("Unable to load car details.");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setError("");
    setSuccess("");
  }

  // Convert HH:MM to minutes
  function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    if (
      formData.location === "Home" &&
      !formData.address.trim()
    ) {
      setError("Please enter your home address.");
      return;
    }

    try {
      // Get all existing test-drive bookings
      const response = await api.get("/testDrives");

      const bookings = response.data;

      const selectedStart = timeToMinutes(formData.time);

      // Each test drive is 1 hour
      const selectedEnd = selectedStart + 60;

      // Check overlapping bookings
      const overlappingBooking = bookings.find((booking) => {
        if (booking.status === "Cancelled") {
          return false;
        }

        if (booking.date !== formData.date) {
          return false;
        }

        const existingStart = timeToMinutes(booking.time);
        const existingEnd = existingStart + 60;

        return (
          selectedStart < existingEnd &&
          selectedEnd > existingStart
        );
      });

      if (overlappingBooking) {
        setError(
          `This slot is already booked on ${formData.date} at ${overlappingBooking.time}. Please choose another time.`
        );
        return;
      }

      const bookingData = {
        carId: car.id,
        carName: car.name,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        address:
          formData.location === "Home"
            ? formData.address
            : "",
        status: "Pending"
      };

      await api.post("/testDrives", bookingData);

      setSuccess("Test drive booked successfully!");

      setTimeout(() => {
        navigate("/my-test-drives");
      }, 1500);

    } catch (error) {
      console.error("Booking error:", error);
      setError(
        "Unable to book test drive. Please try again."
      );
    }
  }

  if (!car) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1>Book a Test Drive</h1>

        <p className="auth-subtitle">
          {car.name} - {car.model}
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
          />

          <label>Preferred Date</label>

          <input
            type="date"
            name="date"
            min={today}
            value={formData.date}
            onChange={handleChange}
          />

          <label>Preferred Time</label>

          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />

          <small>
            Each test drive slot is 1 hour.
          </small>

          <label>Test Drive Location</label>

          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
          >
            <option value="Showroom">
              Showroom
            </option>

            <option value="Home">
              Home
            </option>
          </select>

          {formData.location === "Home" && (
            <textarea
              name="address"
              placeholder="Enter your home address"
              value={formData.address}
              onChange={handleChange}
              rows="4"
            />
          )}

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {success && (
            <p className="form-success">
              {success}
            </p>
          )}

          <button
            className="auth-btn"
            type="submit"
          >
            BOOK TEST DRIVE
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookTestDrive;