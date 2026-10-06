# CarVista – Car Showroom Management System

### Discover. Choose. Drive.

CarVista is a web-based **Car Showroom Management System** developed using React.js. It allows registered users to browse and explore cars, search and filter available cars, and save their favourite cars.

The system also includes an **Admin role** that provides additional access to manage cars by adding, editing, and deleting car records.

---

##  Project Overview

CarVista provides a simple and user-friendly platform for managing and exploring car showroom information.

The application supports two types of users:

- **Normal User** – Can browse cars, view car details, search and filter cars, and manage favourites.
- **Admin** – Can perform all normal user activities and additionally add, edit, and delete cars.

---

##  Objectives

- Provide an easy-to-use car showroom platform.
- Display car information in an organized way.
- Allow users to search and filter cars.
- Allow users to save favourite cars.
- Provide role-based access for administrators.
- Allow administrators to manage car records.
- Implement form validation for reliable data entry.

---

##  Features

###  User Features

- User Registration
- User Login and Logout
- Protected Routes
- Browse Available Cars
- Search Cars
- Filter by Brand
- Filter by Fuel Type
- Filter by Price
- Sort Cars by Price
- View Car Details
- Add Cars to Favourites
- Remove Cars from Favourites
- User-specific Favourite Cars

###  Admin Features

- Admin Login
- Admin Dashboard access
- Manage Cars
- Add New Cars
- Edit Existing Cars
- Delete Cars
- Admin-only access to car management
- Role-based route protection

---

##  Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| React Router | Page navigation and routing |
| Redux Toolkit | Favourite car state management |
| Axios | API communication |
| JavaScript | Application logic |
| HTML | Page structure |
| CSS | Styling and responsive design |
| JSON Server | Backend REST API |
| db.json | Data storage |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| Git & GitHub | Version control |

---

##  Project Structure

```text
carshowroom/
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
│   │   └── Logout.jsx
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
└── README.md
Application Flow
User
 │
 ├── Register
 │
 ├── Login
 │
 └── Home
       │
       ├── Browse Cars
       │
       ├── Search & Filter
       │
       ├── View Details
       │
       └── Favourites
Admin Flow
Admin Login
     │
     ▼
Admin Dashboard
     │
     ▼
Manage Cars
     │
 ┌───┼────────────┐
 ▼   ▼            ▼
Add  Edit       Delete
Car  Car          Car
Authentication and Authorization

CarVista uses login-based access control.

When a user logs in successfully, the user information is stored in localStorage.

The application checks whether a user is logged in before allowing access to protected pages.

Protected Routes

Normal logged-in users can access:

Cars
Car Details
Favourites
Admin Routes

Only users with:

role: "admin"

can access:

Admin Dashboard
Add Car
Edit Car
Delete Car

The project uses:

ProtectedRoute

for logged-in users and:

AdminRoute

for administrators.

Admin Management

The Admin Dashboard directly opens the car management page.

From the Manage Cars page, an administrator can:

Add a new car
Edit an existing car
Delete a car
Search cars
Filter cars
Sort cars
View car details

Admin controls are hidden from normal users.

Favourite Cars

Favourite cars are managed using Redux Toolkit.

Users can:

Add a car to favourites.
Remove a car from favourites.
View their favourite cars.

Favourite cars are stored separately for each logged-in user using a user-specific local storage key.

Example:

carvista_favourites_user@email.com

This prevents one user's favourite cars from being displayed to another user on the same browser.

Form Validation

The project includes validation for user and car forms.

Registration Validation
Name validation
Email validation
Strong password validation
Confirm password validation
Password Requirements

A password must contain:

At least 8 characters
At least one uppercase letter
At least one lowercase letter
At least one number
At least one special character
No spaces
Car Form Validation

The Add Car and Edit Car forms validate:

Car name
Brand
Model
Year
Price
Fuel type
Transmission
Image URL
Car Search and Filtering

Users can search cars by name.

Cars can also be filtered by:

Brand
Fuel Type
Price Range

Cars can be sorted by:

Price: Low to High
Price: High to Low
API

The frontend communicates with the JSON Server backend using Axios.

Main endpoints:

GET    /cars
POST   /cars
GET    /cars/:id
PUT    /cars/:id
DELETE /cars/:id

GET    /users
POST   /users

The API URL is configured in:

src/services/api.js
Backend

The project uses JSON Server as a lightweight REST API.

The data is stored in:

db.json

The database contains:

users
cars

Each user can have a role such as:

admin
user
Running the Project Locally
1. Clone the repository
git clone https://github.com/meghanavaddi2402/carshowroom.git
2. Navigate to the project
cd carshowroom
3. Install dependencies
npm install
4. Start the frontend
npm run dev

The frontend will run on the Vite development server.

Backend Setup

The backend uses JSON Server.

Install the backend dependencies:

npm install

Start the backend:

npm start

The backend provides REST API endpoints for cars and users.

Deployment
Frontend

The React application is deployed using:

Vercel

Backend

The JSON Server backend is deployed using:

Render

The production frontend communicates with the deployed Render backend through Axios.

Project Links
Frontend

https://carshowroom-zeta.vercel.app

GitHub

https://github.com/meghanavaddi2402/carshowroom

Future Enhancements

Possible future improvements include:

Secure backend authentication
Password hashing
Real database integration such as MySQL or PostgreSQL
Advanced admin dashboard with statistics
User profile management
Car comparison feature
Advanced car search
Image upload functionality
Booking or enquiry system
Cloud-based data storage
Learning Outcomes

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
