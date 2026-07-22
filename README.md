# 🚗 AutoVault - Full-Stack MERN Car Marketplace Application

AutoVault is a placement-level, production-ready **Car Marketplace Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and **Tailwind CSS**.

It provides a modern, responsive platform for car buyers and verified sellers featuring JWT authentication, real-time search & multi-criteria filtering, user wishlists, interactive seller dashboards, photo upload capabilities, and seeder scripts for instant demo testing.

---

## 🌟 Key Features

- 🔐 **Authentication & Authorization**: JWT-based user login & registration, password hashing using `bcryptjs`, protected routes, session persistence.
- 🏎️ **Car Inventory Management**: Complete CRUD operations for car listings (Brand, Model, Year, Price, Fuel Type, Transmission, Kilometers, Location, Detailed Description, Multiple Image Gallery).
- 🔍 **Real-Time Search & Multi-Facet Filters**: Search by brand/model/title keyword, filter by price range slider/inputs, fuel type chips, transmission, and sort by Price (Low→High, High→Low) or Newest.
- ⭐ **Saved Wishlist**: Instant bookmarking of vehicles with global state sync and dedicated Wishlist management page.
- 📊 **Seller Dashboard**: User-centric listing dashboard displaying active listings, total wishlist bookmarks, profile details, and inline Edit/Delete controls.
- 📷 **Multi-Image Upload**: Multer upload handling with optional Cloudinary support and base64 preview fallback.
- 🎨 **Modern Design & Animations**: Dark glassmorphism theme, skeleton loaders, toast notifications (`react-hot-toast`), responsive mobile navigation drawer.
- ⚡ **Placement Ready**: Includes 1-click Demo Login buttons & seeder script (`npm run seed`) for instant evaluation.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS, Custom Glassmorphism, CSS Animations
- **Icons**: Lucide React
- **HTTP Client**: Axios (with Request Interceptors for JWT header injection)
- **Routing**: React Router DOM v6
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (MVC Architecture)
- **Database**: MongoDB + Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **File Upload**: Multer + Cloudinary (with Data URI fallback)

---

## 📁 Project Architecture & Folder Structure

```
ccp1/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & error handling
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register, login, getMe)
│   │   ├── carController.js      # CRUD, search, filter, sorting logic
│   │   └── wishlistController.js # Wishlist add, remove, fetch logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authorization guard
│   │   ├── errorMiddleware.js    # Global error & 404 handler
│   │   └── uploadMiddleware.js   # Multer + Cloudinary image middleware
│   ├── models/
│   │   ├── User.js               # Mongoose schema for Users & Wishlist
│   │   └── Car.js                # Mongoose schema for Cars
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── carRoutes.js          # /api/cars
│   │   ├── wishlistRoutes.js     # /api/wishlist
│   │   └── uploadRoutes.js       # /api/upload
│   ├── utils/
│   │   └── seed.js               # Database seeder script with demo data
│   ├── server.js                 # Express server entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/           # Navbar, Footer, Hero, CarCard, CarFilter, LoadingSkeleton, ProtectedRoute
    │   ├── context/              # AuthContext, WishlistContext
    │   ├── pages/                # Home, CarDetails, AddEditCar, Wishlist, Dashboard, Login, Register, NotFound
    │   ├── services/             # Axios API client & endpoints
    │   ├── utils/                # Formatters (currency, km, dates)
    │   ├── App.jsx               # React Router layout & Toast container
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🔌 API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user & get JWT token
- `GET /api/auth/me` - Get logged-in user profile & wishlist *(Protected)*

### Cars (`/api/cars`)
- `GET /api/cars` - Fetch all cars (supports `search`, `brand`, `fuelType`, `transmission`, `minPrice`, `maxPrice`, `sort`)
- `GET /api/cars/:id` - Fetch single car details by ID
- `POST /api/cars` - Create new vehicle listing *(Protected)*
- `PUT /api/cars/:id` - Update vehicle listing *(Protected, Seller only)*
- `DELETE /api/cars/:id` - Delete vehicle listing *(Protected, Seller only)*
- `GET /api/cars/user/listings` - Fetch listings created by logged-in user *(Protected)*

### Wishlist (`/api/wishlist`)
- `GET /api/wishlist` - Fetch user's saved wishlist cars *(Protected)*
- `POST /api/wishlist/:id` - Toggle/Add car to wishlist *(Protected)*
- `DELETE /api/wishlist/:id` - Remove car from wishlist *(Protected)*

---

## 🚀 Quick Setup & Installation Guide

### Prerequisites
- **Node.js**: v18.x or higher
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI.

---

### Step 1: Clone & Configure Backend

1. Navigate to backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (copied from `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/car_marketplace
   JWT_SECRET=super_secret_jwt_key_car_marketplace_2026_placement_project
   JWT_EXPIRE=30d
   ```
4. **Seed Database** with sample car listings & test accounts:
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Backend starts on http://localhost:5000)*

---

### Step 2: Configure & Start Frontend

1. Open a new terminal and navigate to frontend:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Vite development server:
   ```bash
   npm run dev
   ```
   *(Frontend starts on http://localhost:3000)*

---

## 🔑 Demo Login Credentials (Placement Evaluation)

Use the 1-click Demo buttons on the Login page or use the credentials below:

- **Demo User 1**: `demo@carhub.com` / `password123` (Alex Morgan)
- **Demo User 2**: `sarah@carhub.com` / `password123` (Sarah Connor)

---

## 💡 Placement Interview Highlights

1. **MVC Architecture**: Clear separation of database models, endpoint routes, controllers, and middleware for scalable code organization.
2. **Security**: Password hashing using bcryptjs, JWT secret token validation, parameterized MongoDB queries to prevent injection.
3. **State Syncing**: Global React Context (`AuthContext` and `WishlistContext`) providing clean, optimistic UI updates across all components.
4. **Resilient Uploads**: Graceful fallback system for image uploads supporting Cloudinary API when credentials exist, and memory base64 conversion when running locally offline.
