import { useEffect, useState } from "react";
import api from "../services/api";

function MyTestDrives() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings();
  }, []);

  async function getMyBookings() {
    try {
      const response = await api.get("/testDrives");

      const myBookings = response.data.filter(
        (booking) =>
          booking.email?.toLowerCase() ===
          user?.email?.toLowerCase()
      );

      myBookings.sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`) -
          new Date(`${b.date}T${b.time}`)
      );

      setBookings(myBookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusClass(status) {
    if (status === "Confirmed") {
      return "status-confirmed";
    }

    if (status === "Cancelled") {
      return "status-cancelled";
    }

    if (status === "Completed") {
      return "status-completed";
    }

    return "status-pending";
  }

  if (loading) {
    return <h2>Loading your schedule...</h2>;
  }

  return (
    <div className="cars">
      <h1>My Test Drive Schedule</h1>

      {bookings.length === 0 ? (
        <div className="auth-card">
          <h2>No Test Drives</h2>
          <p>
            You don't have any test drives scheduled.
          </p>
        </div>
      ) : (
        <div className="booking-grid">

          {bookings.map((booking) => (
            <div
              className="booking-card"
              key={booking.id}
            >
              <h2>🚗 {booking.carName}</h2>

              <p>
                <strong>📅 Date:</strong>{" "}
                {booking.date}
              </p>

              <p>
                <strong>🕒 Time:</strong>{" "}
                {booking.time}
              </p>

              <p>
                <strong>📍 Location:</strong>{" "}
                {booking.location}
              </p>

              {booking.location === "Home" && (
                <p>
                  <strong>Address:</strong>{" "}
                  {booking.address}
                </p>
              )}

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={getStatusClass(
                    booking.status
                  )}
                >
                  {booking.status}
                </span>
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default MyTestDrives;