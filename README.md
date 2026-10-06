# 🛒 MERN E-Commerce Platform

A full-stack e-commerce web application built with the **MERN stack**, featuring user authentication, product browsing, search and filtering, shopping cart management, order processing, admin functionality, and payment integration.

## 🚀 Live Demo

**Frontend:**  
https://mern-ecommerce-project-steel.vercel.app/

**Backend API:**  
https://mern-ecommerce-backend-e1j9.onrender.com/

---

## 📌 Project Overview

This project demonstrates a complete e-commerce application using modern full-stack web development technologies.

The application follows a client-server architecture where the React frontend communicates with a RESTful Node.js/Express backend, while MongoDB is used for persistent data storage.

The project has been configured, customized, deployed, and prepared as a portfolio-level full-stack application.

## ✨ Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Browse products
- Search products
- Filter products by category
- View product details
- Product ratings and reviews
- Shopping cart
- Quantity management
- Shipping information
- Checkout workflow
- Order placement
- Order history
- User profile management

### 🛠️ Admin Features

- Admin authentication and authorization
- Product management
- Create, update, and delete products
- Product image uploads
- Order management
- Update order status
- User management
- Admin dashboard functionality

### 💳 Payment

- Stripe payment integration
- Checkout workflow
- Order processing

---

## 🧰 Tech Stack

### Frontend

- React.js
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS
- React Icons
- React Toastify
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Stripe
- CORS

### Development Tools

- Git
- GitHub
- npm
- Nodemon

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🏗️ Project Architecture

```text
mern-ecommerce-project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── seeder.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── data/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
├── LICENSE
└── README.md
🔄 Application Flow
User
 │
 ▼
React Frontend
 │
 │ Axios / REST API
 ▼
Node.js + Express
 │
 ├── Authentication
 ├── Products
 ├── Orders
 ├── Users
 └── Payments
 │
 ▼
MongoDB Atlas
⚙️ Run Locally
1. Clone the Repository
git clone https://github.com/chetneychauhan/mern-ecommerce-project.git
cd mern-ecommerce-project
2. Setup Backend

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend development server:

npm run server

The backend will run on:

http://localhost:5000
3. Setup Frontend

Open a new terminal and navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Create a .env file inside the frontend directory:

VITE_API_URL=http://localhost:5000

Start the frontend development server:

npm run dev

Vite will provide the local frontend URL in the terminal.
📡 API Routes

The backend provides REST API endpoints for the application's main resources.

Products
/api/products
Users
/api/users
Orders
/api/orders
Uploads
/api/upload

Some API endpoints are protected and require authentication or admin authorization.

🔒 Security

The application implements several security mechanisms:

JWT-based authentication
Password hashing using bcrypt
Protected API routes
Admin authorization
Environment variables for sensitive configuration
CORS configuration
Authentication middleware
Server-side request validation
🌐 Deployment

The application is deployed using the following architecture.

Frontend
React + Vite
     │
     ▼
  Vercel
     │
     ▼
Live Web Application
Backend
Node.js + Express
        │
        ▼
      Render
        │
        ▼
     REST API
Database
MongoDB
   │
   ▼
MongoDB Atlas
Production URLs

Frontend:
https://mern-ecommerce-project-steel.vercel.app/

Backend:
https://mern-ecommerce-backend-e1j9.onrender.com/

📈 Future Improvements
Cloud-based image storage
Advanced admin analytics
Product pagination
Wishlist functionality
Improved order tracking
Enhanced responsive design
Automated testing
CI/CD pipeline
Improved production monitoring
📜 License

This project is distributed under the license included in the repository.

See the LICENSE file for details.

👨‍💻 Developer

Chetney Chauhan

B.Tech — Computer Science Engineering

GitHub:
https://github.com/chetneychauhan

LinkedIn:
https://linkedin.com/in/chetney-chauhan-124315373/