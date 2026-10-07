import { useEffect, useState } from "react";
import api from "../services/api";

function Analytics() {
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalyticsData();
  }, []);

  async function getAnalyticsData() {
    try {
      const [carsResponse, usersResponse, testDriveResponse] =
        await Promise.all([
          api.get("/cars"),
          api.get("/users"),
          api.get("/testDrives"),
        ]);

      setCars(carsResponse.data);
      setUsers(usersResponse.data);
      setTestDrives(testDriveResponse.data);
    } catch (error) {
      console.log("Error loading analytics:", error);
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     CUSTOMER STATISTICS
  ========================= */

  const customers = users.filter(
    (user) => user.role !== "admin"
  );

  /* =========================
     TEST DRIVE STATISTICS
  ========================= */

  const pendingBookings = testDrives.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmedBookings = testDrives.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completedBookings = testDrives.filter(
    (booking) => booking.status === "Completed"
  ).length;

  const cancelledBookings = testDrives.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  /* =========================
     FUEL STATISTICS
  ========================= */

  const petrolCars = cars.filter(
    (car) => car.fuel === "Petrol"
  ).length;

  const dieselCars = cars.filter(
    (car) => car.fuel === "Diesel"
  ).length;

  const electricCars = cars.filter(
    (car) => car.fuel === "Electric"
  ).length;

  const hybridCars = cars.filter(
    (car) => car.fuel === "Hybrid"
  ).length;

  /* =========================
     INVENTORY STATISTICS
  ========================= */

  const totalInventoryValue = cars.reduce(
    (total, car) => {
      return total + Number(car.price || 0);
    },
    0
  );

  const averagePrice =
    cars.length > 0
      ? totalInventoryValue / cars.length
      : 0;

  const highestPricedCar =
    cars.length > 0
      ? cars.reduce((highest, car) => {
          return Number(car.price || 0) >
            Number(highest.price || 0)
            ? car
            : highest;
        })
      : null;

  /* =========================
     BRAND STATISTICS
  ========================= */

  const brandCounts = {};

  cars.forEach((car) => {
    if (car.brand) {
      brandCounts[car.brand] =
        (brandCounts[car.brand] || 0) + 1;
    }
  });

  const brandData = Object.entries(
    brandCounts
  ).sort((a, b) => b[1] - a[1]);

  const mostAvailableBrand =
    brandData.length > 0
      ? brandData[0][0]
      : "N/A";

  /* =========================
     TEST DRIVE CAR STATISTICS
  ========================= */

  const testDriveCarCounts = {};

  testDrives.forEach((booking) => {
    if (booking.carId) {
      const carId = String(booking.carId);

      testDriveCarCounts[carId] =
        (testDriveCarCounts[carId] || 0) + 1;
    }
  });

  const popularCarData = Object.entries(
    testDriveCarCounts
  ).sort((a, b) => b[1] - a[1]);

  let mostRequestedCar = null;
  let mostRequestedCount = 0;

  if (popularCarData.length > 0) {
    const popularCarId = popularCarData[0][0];

    mostRequestedCount = popularCarData[0][1];

    mostRequestedCar = cars.find(
      (car) =>
        String(car.id) === String(popularCarId)
    );
  }

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="admin-page">
        <h2>Loading analytics...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-page-header">

        <div>
          <p className="admin-label">
            ADMINISTRATION
          </p>

          <h1>
            Showroom Analytics
          </h1>

          <p>
            Overview of CarVista inventory,
            customers, and test-drive activity.
          </p>
        </div>

      </div>

      {/* =========================
          MAIN STATISTICS
      ========================= */}

      <div className="analytics-cards">

        <div className="analytics-card">
          <span>
            Total Vehicles
          </span>

          <strong>
            {cars.length}
          </strong>

          <small>
            Vehicles in inventory
          </small>
        </div>

        <div className="analytics-card">
          <span>
            Registered Customers
          </span>

          <strong>
            {customers.length}
          </strong>

          <small>
            Excluding administrators
          </small>
        </div>

        <div className="analytics-card">
          <span>
            Total Test Drives
          </span>

          <strong>
            {testDrives.length}
          </strong>

          <small>
            All booking requests
          </small>
        </div>

        <div className="analytics-card">
          <span>
            Pending Bookings
          </span>

          <strong>
            {pendingBookings}
          </strong>

          <small>
            Require admin action
          </small>
        </div>

      </div>

      {/* =========================
          FINANCIAL STATISTICS
      ========================= */}

      <div className="analytics-cards">

        <div className="analytics-card">

          <span>
            Inventory Value
          </span>

          <strong>
            ₹
            {totalInventoryValue.toLocaleString(
              "en-IN"
            )}
          </strong>

          <small>
            Total value of all vehicles
          </small>

        </div>

        <div className="analytics-card">

          <span>
            Average Vehicle Price
          </span>

          <strong>
            ₹
            {Math.round(
              averagePrice
            ).toLocaleString("en-IN")}
          </strong>

          <small>
            Average showroom price
          </small>

        </div>

        <div className="analytics-card">

          <span>
            Highest Priced Vehicle
          </span>

          <strong>
            {highestPricedCar
              ? highestPricedCar.name
              : "N/A"}
          </strong>

          <small>
            {highestPricedCar
              ? `₹${Number(
                  highestPricedCar.price
                ).toLocaleString("en-IN")}`
              : "No data"}
          </small>

        </div>

        <div className="analytics-card">

          <span>
            Most Available Brand
          </span>

          <strong>
            {mostAvailableBrand}
          </strong>

          <small>
            Highest inventory count
          </small>

        </div>

      </div>

      {/* =========================
          TEST DRIVE + FUEL
      ========================= */}

      <div className="analytics-grid">

        <div className="analytics-panel">

          <h2>
            Test Drive Overview
          </h2>

          <div className="analytics-row">
            <span>
              Pending
            </span>

            <strong>
              {pendingBookings}
            </strong>
          </div>

          <div className="analytics-row">
            <span>
              Confirmed
            </span>

            <strong>
              {confirmedBookings}
            </strong>
          </div>

          <div className="analytics-row">
            <span>
              Completed
            </span>

            <strong>
              {completedBookings}
            </strong>
          </div>

          <div className="analytics-row">
            <span>
              Cancelled
            </span>

            <strong>
              {cancelledBookings}
            </strong>
          </div>

        </div>

        <div className="analytics-panel">

          <h2>
            Fuel Type Distribution
          </h2>

          <div className="analytics-row">
            <span>
              Petrol
            </span>

            <strong>
              {petrolCars}
            </strong>
          </div>

          <div className="analytics-row">
            <span>
              Diesel
            </span>

            <strong>
              {dieselCars}
            </strong>
          </div>

          <div className="analytics-row">
            <span>
              Electric
            </span>

            <strong>
              {electricCars}
            </strong>
          </div>

          <div className="analytics-row">
            <span>
              Hybrid
            </span>

            <strong>
              {hybridCars}
            </strong>
          </div>

        </div>

      </div>

      {/* =========================
          BRAND + POPULAR VEHICLE
      ========================= */}

      <div className="analytics-grid">

        {/* INVENTORY BY BRAND */}

        <div className="analytics-panel">

          <h2>
            Inventory by Brand
          </h2>

          {brandData.length > 0 ? (
            brandData.map(
              ([brand, count]) => (
                <div
                  className="analytics-row"
                  key={brand}
                >
                  <span>
                    {brand}
                  </span>

                  <strong>
                    {count} vehicles
                  </strong>
                </div>
              )
            )
          ) : (
            <p>
              No inventory data available.
            </p>
          )}

        </div>

        {/* MOST REQUESTED VEHICLE */}

        <div className="analytics-panel highlight-panel">

          <h2>
            Most Requested Vehicle
          </h2>

          {mostRequestedCar ? (
            <>
              <img
                src={mostRequestedCar.image}
                alt={mostRequestedCar.name}
                className="analytics-car-image"
              />

              <h3 className="analytics-car-name">
                {mostRequestedCar.name}
              </h3>

              <p>
                {mostRequestedCar.brand}{" "}
                {mostRequestedCar.model}
              </p>

              <strong className="insight-value">
                {mostRequestedCount} Test Drives
              </strong>
            </>
          ) : (
            <>
              <strong className="insight-value">
                No Data
              </strong>

              <p>
                No test-drive requests are
                available yet.
              </p>
            </>
          )}

        </div>

      </div>

      {/* =========================
          SHOWROOM INSIGHT
      ========================= */}

      <div className="analytics-panel showroom-insight">

        <h2>
          Showroom Insight
        </h2>

        <p>
          <strong>
            {mostAvailableBrand}
          </strong>{" "}
          currently has the highest number
          of vehicles in the showroom
          inventory.
        </p>

        <p>
          The showroom currently has{" "}
          <strong>
            {cars.length}
          </strong>{" "}
          vehicles with a total inventory
          value of{" "}
          <strong>
            ₹
            {totalInventoryValue.toLocaleString(
              "en-IN"
            )}
          </strong>
          .
        </p>

        <p>
          There are currently{" "}
          <strong>
            {pendingBookings}
          </strong>{" "}
          pending test-drive bookings that
          require administrative action.
        </p>

      </div>

    </div>
  );
}

export default Analytics;