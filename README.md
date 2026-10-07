CarVista - Car Showroom Management System

CarVista is a web-based car showroom management system built using React.js and JSON Server. It allows customers to browse vehicles, compare cars, book test drives, and manage their bookings. Administrators can manage vehicle inventory, test-drive schedules, and showroom analytics.

Tagline: Discover. Choose. Drive.

Features
Customer Features
User registration and login
Logout functionality
Protected routes for authenticated users
Browse available cars
Search cars by name or model
Filter cars by:
Brand
Fuel type
Price range
Sort cars by price
View detailed car information
Add cars to favourites
Remove cars from favourites
Compare up to 4 cars
Book a test drive
Select test-drive date and time
Choose showroom or home test drive
Prevent overlapping test-drive slots
View personal test-drive bookings
Track booking status
Admin Features
Admin authentication and protected routes
Add new vehicles
Edit existing vehicles
Delete vehicles
Vehicle inventory management
Search and filter inventory
View total vehicles
View available brands
View fuel-type statistics
View showroom analytics
View all customer test-drive bookings
Confirm test-drive bookings
Cancel test-drive bookings
Mark completed test drives
Car Comparison

CarVista provides a car comparison feature that allows customers to select up to four vehicles and compare their specifications.

The comparison includes:

Brand
Model
Year
Price
Fuel type
Transmission
Color

This allows customers to compare multiple vehicles before making a decision.

Test Drive Booking

Customers can book test drives by providing:

Name
Email
Phone number
Date
Time
Location
Address when required

Each test drive is treated as a one-hour booking slot.

The application checks existing bookings and prevents customers from selecting an overlapping time slot.

Booking statuses include:

Pending
Confirmed
Completed
Cancelled
Admin Inventory Management

The Vehicle Inventory page allows administrators to manage showroom vehicles from a centralized interface.

Administrators can:

View all vehicles
Search vehicles
Filter vehicles by brand
Add vehicles
Edit vehicles
Delete vehicles
View vehicle price and specifications
Admin Analytics

The Analytics page provides an overview of showroom activity.

It displays:

Total vehicles
Registered customers
Total test drives
Pending bookings
Confirmed bookings
Completed bookings
Cancelled bookings
Fuel type distribution
Inventory by brand
Most available vehicle brand
Technology Stack
Frontend
React.js
React Router
Redux Toolkit
Axios
JavaScript
HTML
CSS
Vite
Backend
JSON Server
REST API
JSON database
Development Tools
Visual Studio Code
Git
GitHub
Vercel
Render
Project Structure
carshowroom
│
├── public
│
├── src
│   │
│   ├── app
│   │   └── store.js
│   │
│   ├── components
│   │   ├── CarCard.jsx
│   │   └── Navbar.jsx
│   │
│   ├── features
│   │   └── favouriteCarSlice.js
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── Cars.jsx
│   │   ├── CarDetails.jsx
│   │   ├── AddCar.jsx
│   │   ├── EditCar.jsx
│   │   ├── Favorites.jsx
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── Logout.jsx
│   │   ├── BookTestDrive.jsx
│   │   ├── MyTestDrives.jsx
│   │   ├── AdminTestDrives.jsx
│   │   ├── CompareCars.jsx
│   │   ├── Inventory.jsx
│   │   └── Analytics.jsx
│   │
│   ├── routes
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── services
│   │   └── api.js
│   │
│   ├── utils
│   │   └── validation.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── db.json
├── package.json
├── vercel.json
└── README.md
Authentication

CarVista uses role-based authentication.

Two types of users are supported:

Customer
Admin

Customer users can access customer-specific features such as:

Cars
Favourites
Compare Cars
Test Drive Booking
My Test Drives

Administrators can access:

Vehicle Inventory
Add Vehicle
Edit Vehicle
Delete Vehicle
Test Drive Schedule
Analytics

Protected routes prevent users from accessing pages without authentication.

Admin routes additionally verify that the logged-in user's role is admin.

API Endpoints

The application communicates with the JSON Server backend using Axios.

Cars
GET     /cars
GET     /cars/:id
POST    /cars
PUT     /cars/:id
DELETE  /cars/:id
Users
GET     /users
POST    /users
Test Drives
GET     /testDrives
POST    /testDrives
PATCH   /testDrives/:id
DELETE  /testDrives/:id
Installation

Clone the repository:

git clone https://github.com/meghanavaddi2402/carshowroom.git

Navigate to the project:

cd carshowroom

Install dependencies:

npm install

Start the React application:

npm run dev

The application will normally run at:

http://localhost:5173
Backend Setup

The backend is maintained separately using JSON Server.

Clone the backend repository:

git clone https://github.com/meghanavaddi2402/car_showroom_backend-.git

Navigate to the backend:

cd car_showroom_backend-

Install dependencies:

npm install

Start the backend:

npm start

The local backend runs on:

http://localhost:3000
API Configuration

The frontend API configuration is maintained in:

src/services/api.js

For local development:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export default api;

For the deployed application:

import axios from "axios";

const api = axios.create({
  baseURL: "https://car-showroom-api-552g.onrender.com"
});

export default api;
Deployment
Frontend

The React frontend is deployed using Vercel.

Production URL:

https://carshowroom-zeta.vercel.app
Backend

The JSON Server backend is deployed using Render.

Backend URL:

https://car-showroom-api-552g.onrender.com
Application Architecture
Customer
   |
   v
CarVista React Frontend
   |
   | Axios REST API
   v
Render Backend
   |
   v
JSON Server
   |
   v
db.json
Main Application Flow
User Registration
        |
        v
      Login
        |
        v
   Browse Cars
        |
        +----------------+
        |                |
        v                v
  Car Details       Compare Cars
        |
        v
 Book Test Drive
        |
        v
 My Test Drives

Admin flow:

Admin Login
    |
    v
Admin Dashboard
    |
    +------------------+
    |        |         |
    v        v         v
Inventory Analytics Test Drive Schedule
    |
    +----------+
    |          |
    v          v
Add/Edit    Delete
Vehicle     Vehicle
Validation

The application includes client-side validation for important forms.

Validation includes:

Name validation
Email validation
Password validation
Confirm password validation
Phone number validation
Year validation
Price validation
Image URL validation
Required field validation
Test-drive date validation
Test-drive time conflict validation
Future Enhancements

Possible future improvements include:

Online payment integration
Advanced car recommendation system
Car image gallery
Vehicle availability tracking
Customer reviews and ratings
Email notifications
SMS notifications
Advanced sales analytics
Downloadable reports
Dealer/customer messaging
AI-based car recommendation
Production-ready authentication and encrypted passwords
