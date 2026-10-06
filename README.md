<div align="center">

# 🛒 MERN E-Commerce Platform

### A Full-Stack E-Commerce Web Application built with the MERN Stack

<p>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

<p>
  <a href="https://mern-ecommerce-project-steel.vercel.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Project-000000?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

</div>

---

## 📖 Project Overview

**MERN E-Commerce Platform** is a full-stack online shopping application developed using the **MERN stack — MongoDB, Express.js, React.js, and Node.js**.

The project demonstrates the development of a complete modern web application with a React-based frontend, RESTful backend APIs, MongoDB database integration, user authentication, product management, shopping cart functionality, and order processing.

The application is designed with a clear separation between the frontend and backend, allowing the system to be developed, tested, and deployed independently.

---

## ✨ Key Features

### 👤 User Features

* 🔐 User registration and login
* 🔑 Secure authentication using JWT
* 🔒 Password hashing using bcrypt
* 🛍️ Browse available products
* 🔎 Product search and filtering
* 🛒 Add products to shopping cart
* ➕ Increase or decrease product quantities
* ❌ Remove products from cart
* 📦 Place and manage orders
* 👤 User account management
* 📋 View order information

### ⚙️ Backend Features

* RESTful API architecture
* User authentication and authorization
* JWT-based protected routes
* Password encryption with bcrypt
* Product API
* User API
* Order API
* MongoDB database integration
* Mongoose data models
* Express middleware
* Error handling
* Environment-based configuration

### 🗄️ Database

The application uses **MongoDB Atlas** as the cloud database.

Main collections/models include:

* 👤 Users
* 🛍️ Products
* 📦 Orders

---

## 🏗️ Application Architecture

The application follows a **client-server architecture**:

```text
                    ┌──────────────────────┐
                    │      React.js        │
                    │      Frontend        │
                    │                      │
                    │  Components / Pages  │
                    │  State / UI Logic    │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │     Express.js       │
                    │      Backend         │
                    │                      │
                    │ Routes / Controllers │
                    │ Middleware / Auth    │
                    └──────────┬───────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌──────────────────────┐
                    │      MongoDB         │
                    │     Atlas Database   │
                    │                      │
                    │ Users / Products /   │
                    │ Orders               │
                    └──────────────────────┘
```

### 🔄 Data Flow

1. User interacts with the React frontend.
2. Frontend sends HTTP requests to the Express/Node.js backend.
3. Backend validates authentication and request data.
4. Express routes process the request.
5. Mongoose communicates with MongoDB.
6. MongoDB returns the requested data.
7. Backend sends a JSON response to the frontend.
8. React updates the user interface.

---

## 🛠️ Tech Stack

| Technology        | Purpose                             |
| ----------------- | ----------------------------------- |
| **React.js**      | Frontend user interface             |
| **Vite**          | Frontend development and build tool |
| **JavaScript**    | Application logic                   |
| **Node.js**       | Backend runtime                     |
| **Express.js**    | REST API and server                 |
| **MongoDB Atlas** | Cloud database                      |
| **Mongoose**      | MongoDB ODM                         |
| **JWT**           | User authentication                 |
| **bcrypt**        | Password hashing                    |
| **Axios**         | API communication                   |
| **Git & GitHub**  | Version control                     |
| **Vercel**        | Frontend deployment                 |
| **Render**        | Backend deployment                  |

---

## 📂 Project Structure

```text
mern-ecommerce-project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── orderModel.js
│   │   ├── productModel.js
│   │   └── userModel.js
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── ...
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Live Deployment

### 🌐 Frontend

**Vercel**

https://mern-ecommerce-project-steel.vercel.app/

### ⚡ Backend API

**Render**

https://mern-ecommerce-backend-e1j9.onrender.com/

The frontend communicates with the deployed backend through REST APIs.

---

## 💻 Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/mern-ecommerce-project.git
```

```bash
cd mern-ecommerce-project
```

---

### 2️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Then start the backend server:

```bash
npm run server
```

The backend will run on:

```text
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

For security reasons, sensitive credentials should **never be committed to GitHub**.

Example backend `.env`:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

If the frontend requires environment variables, create the appropriate `.env` file inside the `frontend` directory.

> ⚠️ Never upload your actual MongoDB connection string, JWT secret, API keys, or passwords to GitHub.

---

## 🔑 Authentication Flow

The application uses **JWT-based authentication**.

```text
User
  │
  ▼
Login / Register
  │
  ▼
Express API
  │
  ├── Validate User
  │
  ├── Hash / Compare Password
  │
  ▼
JWT Token
  │
  ▼
Authenticated Requests
  │
  ▼
Protected API Routes
```

Passwords are securely hashed using **bcrypt** before being stored in the database.

---

## 📦 Main Data Models

### 👤 User

Stores user account information and authentication-related data.

```text
User
├── Name
├── Email
├── Password
└── Admin / User Role
```

### 🛍️ Product

Stores product information displayed in the store.

```text
Product
├── Name
├── Description
├── Price
├── Category
├── Image
└── Stock / Quantity
```

### 📦 Order

Stores information related to customer purchases.

```text
Order
├── User
├── Order Items
├── Shipping Information
├── Payment Information
├── Total Price
└── Order Status
```

---

## 🧪 API Overview

The backend exposes RESTful API endpoints for the major application resources.

### Authentication

```text
POST   /api/users/login
POST   /api/users/register
```

### Products

```text
GET    /api/products
GET    /api/products/:id
```

### Users

```text
GET    /api/users/profile
```

### Orders

```text
POST   /api/orders
GET    /api/orders
```

> The exact available endpoints may vary depending on the current backend implementation.

---

## 📱 Responsive Design

The frontend is designed to provide a smooth experience across different screen sizes, including:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📲 Tablet

---

## 🧠 What I Learned

Through this project, I gained practical experience with:

* Building a full-stack MERN application
* Designing REST APIs
* Connecting React applications with backend services
* MongoDB and Mongoose
* JWT authentication
* Password hashing with bcrypt
* CRUD operations
* API integration using Axios
* Environment variables
* Git and GitHub
* Debugging frontend/backend issues
* Deploying full-stack applications
* Connecting a deployed frontend with a deployed backend

---

## 🚀 Future Improvements

Possible future enhancements include:

* 💳 Production payment gateway integration
* ⭐ Product reviews and ratings
* ❤️ Wishlist functionality
* 📧 Email notifications
* 📊 Advanced admin analytics
* 🖼️ Cloud-based image storage
* 🔍 Advanced product filtering
* 📱 Improved mobile UI
* 🧾 Invoice generation
* 📈 Advanced order tracking

---

## 📸 Screenshots

Add screenshots of the application here.

```text
screenshots/
├── home.png
├── products.png
├── login.png
├── cart.png
└── orders.png
```

Example:

```markdown
![Home Page](screenshots/home.png)

![Products](screenshots/products.png)

![Shopping Cart](screenshots/cart.png)
```

---

## 👨‍💻 Author

### Chetney Chauhan

**B.Tech Computer Science Engineering**

Chandigarh Group of Colleges, Landran

* 🔗 LinkedIn: https://www.linkedin.com/in/chetney-chauhan-124315373/
* 💻 GitHub: https://github.com/

---

## ⭐ Support

If you found this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

<div align="center">

### 🛒 MERN E-Commerce Platform

**Built with React • Node.js • Express • MongoDB**

⭐ Star the repository if you like the project!

</div>
