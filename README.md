CarVista — Car Showroom Management System

Discover. Choose. Drive.

CarVista is a modern car showroom web application built using React.js and JSON Server. It allows users to explore available cars, search and filter vehicles, add favourites, compare multiple cars, and book test drives.

The application also provides an Admin Dashboard for managing cars and handling customer test-drive schedules.

Features
User Features
User Registration
User Login and Logout
Protected Routes
Browse Available Cars
Search Cars by Name
Filter Cars by:
Brand
Fuel Type
Price Range
Sort Cars by Price
View Detailed Car Information
Add Cars to Favourites
View Favourite Cars
Compare Multiple Cars
Book a Test Drive
Choose Test Drive Date and Time
Choose Test Drive Location
Showroom
Home
View Personal Test Drive Schedule
Track Test Drive Status
Admin Features
Admin Login
Protected Admin Routes
Admin Dashboard
Add New Cars
Edit Existing Cars
Delete Cars
View All Cars
View All Customer Test Drives
Confirm Test Drive Bookings
Cancel Test Drive Bookings
Mark Test Drives as Completed
Manage Test Drive Schedule
Prevent overlapping test-drive slots
Car Comparison

CarVista provides a dedicated Compare Cars feature.

Users can select up to four cars and compare their specifications.

Comparison includes
Brand
Model
Year
Price
Fuel Type
Transmission
Color

Example:

Specification	Creta	Seltos	XUV700
Brand	Hyundai	Kia	Mahindra
Model	Creta SX	Seltos GTX	XUV700 AX7
Year	2025	2025	2025
Price	₹18.5L	₹21L	₹25L
Fuel	Petrol	Petrol	Diesel
Transmission	Automatic	Automatic	Automatic
Test Drive Booking

Users can book test drives for their selected cars.

The booking system collects:

Customer Name
Email
Phone Number
Car
Preferred Date
Preferred Time
Location
Address for Home Test Drive
Booking Status

A test drive can have the following statuses:

Pending
Confirmed
Cancelled
Completed
Slot Management

Each test drive is treated as a one-hour slot.

The system checks existing bookings before accepting a new booking.

For example:

10:00 AM - 11:00 AM

A new booking at:

10:30 AM

will be rejected because it overlaps with the existing booking.

A booking at:

11:00 AM

can be accepted.

Cancelled bookings do not block future slots.

Technology Stack
Frontend
React.js
React Router
Redux Toolkit
Axios
CSS
Backend
JSON Server
REST API
JSON Database
Development Tools
Visual Studio Code
Git
GitHub
Vite
Deployment
Vercel — Frontend
Render — Backend
Project Structure
carshowroom/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   └── store.js
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── CarCard.jsx
│   │
│   ├── features/
│   │   └── favouriteCarSlice.js
│   │
│   ├── pages/
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
│   │   └── CompareCars.jsx
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
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

User

Normal users can:

Register
Login
Browse Cars
Favourite Cars
Compare Cars
Book Test Drives
View Their Test Drives
Admin

Administrators can:

Manage Cars
Add Cars
Edit Cars
Delete Cars
View All Test Drives
Confirm Bookings
Cancel Bookings
Complete Bookings

Admin-only routes are protected using AdminRoute.

Application Flow
                    CARVISTA
                       |
          +------------+------------+
          |                         |
        USER                      ADMIN
          |                         |
       Login                     Login
          |                         |
          v                         v
     Browse Cars              Admin Dashboard
          |                         |
     +----+----+              +-----+-----+
     |    |    |              |           |
 Favourite Compare       Manage Cars  Test Drives
     |    |                         |
     |    |                         |
     +----+------+                  |
                 v                  v
            Car Details       Booking Management
                 |
                 v
           Book Test Drive
                 |
                 v
          My Test Drives
API Endpoints

The application uses JSON Server REST APIs.

Cars
GET    /cars
GET    /cars/:id
POST   /cars
PUT    /cars/:id
DELETE /cars/:id
Users
GET    /users
POST   /users
Test Drives
GET    /testDrives
POST   /testDrives
PATCH  /testDrives/:id
Installation
1. Clone the repository
git clone https://github.com/meghanavaddi2402/carshowroom.git
2. Open the project
cd carshowroom
3. Install dependencies
npm install
4. Start the React application
npm run dev

The frontend will normally run at:

http://localhost:5173
Running the Backend Locally

The backend uses JSON Server.

Navigate to the backend directory:

cd backend

Run:

npx json-server --watch db.json --port 3000

The API will be available at:

http://localhost:3000

For example:

http://localhost:3000/cars
http://localhost:3000/testDrives
Backend Configuration

The frontend communicates with the backend using Axios.

Example:

import axios from "axios";

const api = axios.create({
  baseURL: "https://car-showroom-api-552g.onrender.com"
});

export default api;

For local development, the base URL can be changed to:

const api = axios.create({
  baseURL: "http://localhost:3000"
});
Live Application
Frontend

https://carshowroom-zeta.vercel.app

Backend API

https://car-showroom-api-552g.onrender.com

Route Protection

CarVista uses protected routes to control access.

Protected User Routes
/cars
/cars/:id
/favorites
/book-test-drive/:id
/my-test-drives
/compare-cars
Protected Admin Routes
/admin
/add-car
/edit-car/:id
/admin/test-drives

Unauthorized users are redirected to the appropriate page.

Responsive Design

The application is designed to work across different screen sizes, including:

Desktop
Laptop
Tablet
Mobile

Through this project, I learned and practiced:

React component development
React Router
Protected routes
Role-based access control
Redux Toolkit
REST API integration
Axios
Form validation
Local storage
JSON Server
CRUD operations
Git and GitHub
Vercel deployment
Render deployment
Frontend and backend integration

Conclusion

CarVista is a simple and user-friendly car showroom management application that combines car browsing, search and filtering, favourites, authentication, form validation, and admin-based car management.

The project demonstrates the practical use of React.js, Redux Toolkit, REST APIs, role-based access control, and cloud deployment in a full-stack web application.
