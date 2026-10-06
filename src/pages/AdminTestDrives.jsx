import { useEffect, useState } from "react";
import api from "../services/api";

function AdminTestDrives() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings();
  }, []);

  async function getBookings() {
    try {
      const response = await api.get("/testDrives");

      const sortedBookings = response.data.sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`) -
          new Date(`${b.date}T${b.time}`)
      );

      setBookings(sortedBookings);
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

  async function updateStatus(id, status) {
    try {
      await api.patch(`/testDrives/${id}`, {
        status
      });

      getBookings();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <h2>Loading schedule...</h2>;
  }

  return (
    <div className="cars">

      <h1>Test Drive Schedule</h1>

      {bookings.length === 0 ? (
        <h2>No test drive bookings yet.</h2>
      ) : (
        <div className="booking-grid">

          {bookings.map((booking) => (
            <div
              className="booking-card"
              key={booking.id}
            >
              <h2>🚗 {booking.carName}</h2>

              <p>
                <strong>Customer:</strong>{" "}
                {booking.customerName}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {booking.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {booking.phone}
              </p>

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

              <div className="booking-actions">

                {booking.status !== "Confirmed" &&
                  booking.status !== "Cancelled" &&
                  booking.status !== "Completed" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(
                            booking.id,
                            "Confirmed"
                          )
                        }
                      >
                        Confirm
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            booking.id,
                            "Cancelled"
                          )
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}

                {booking.status === "Confirmed" && (
                  <button
                    onClick={() =>
                      updateStatus(
                        booking.id,
                        "Completed"
                      )
                    }
                  >
                    Mark Completed
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default AdminTestDrives;