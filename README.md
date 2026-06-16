<div align="center">

# 🧊 VR Scene Builder - VRSB
### A Full-Stack Interactive 3D Web Application

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://vrsb.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/sabbirkhanoni/3D-web-application?style=for-the-badge)](https://github.com/sabbirkhanoni/3D-web-application/stargazers)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

</div>

---

## 📌 Overview

**VR Scene Builder** is a full-stack interactive 3D web application where users can register, log in, enter a real-time 3D room, place and manipulate furniture objects (GLTF/GLB models), and persist their scene to MongoDB. It includes session-based authentication, OTP-based password reset via Resend email, SSLCommerz subscription payment integration, and a premium/free user tier system.

> **Live Demo:** [https://vrsb.vercel.app](https://vrsb.vercel.app)

---

## ✨ Features

### 👤 User Features
- 🔐 **Authentication** - Register, Login, Logout (session-based with HTTP-only cookies)
- 🔑 **Password Reset** - Forgot password → OTP via email → Reset password
- 🧊 **Interactive 3D Scene** - Real-time Three.js room with orbit controls
- 📦 **Add GLTF/GLB Objects** - Sofa, bed, wardrobe, fridge, table & more built-in models
- 🖱️ **Drag & Position Objects** - Move objects within the 3D space
- 🗑️ **Delete Objects** - Remove selected objects with confirmation modal
- 💾 **Save Scene** - Persist full scene state to MongoDB
- 📂 **Load Scene** - Restore saved scene on login
- 👑 **Premium Subscription** - Upgrade via SSLCommerz payment gateway (BDT)

### 🛠️ System Features
- Session-based auth with `express-session` + HTTP-only cookies
- OTP generation with 5-minute expiry via Resend email API
- Subscription tiers: `free` and `premium`
- SSLCommerz IPN webhook for secure payment validation
- Protected routes on both frontend and backend

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router v7, Axios |
| **3D Engine** | Three.js r184 (WebGL, GLTF loader, OrbitControls) |
| **Backend** | Node.js, Express.js v5 (ESM) |
| **Database** | MongoDB + Mongoose |
| **Authentication** | express-session (HTTP-only cookie sessions) |
| **Email** | Resend API |
| **Payment** | SSLCommerz (Bangladesh payment gateway Provider) |
| **Deployment** | Vercel (Frontend + Backend) |

---

## 📂 Project Structure

```
vrapplication/
│
├── backend/
│   ├── config/
│   │   ├── connectDB.js                        # MongoDB connection
│   │   └── sendEmail.js                        # Resend email config
│   ├── controllers/
│   │   ├── auth.controller.js                  # Signup, login, logout, OTP, reset
│   │   ├── scene.controller.js                 # Save, get, delete scene
│   │   └── SSLCommerzPayment.controller.js     # Initiate, success, failed, cancel, IPN
│   ├── middleware/
│   │   └── isAuthenticated.js                  # Session auth guard
│   ├── models/
│   │   ├── user.model.js                       # User schema
│   │   ├── scene.model.js                      # Scene schema
│   │   └── payment.model.js                    # Payment schema
│   ├── routes/
│   │   ├── auth.route.js                       # /api/auth/*
│   │   ├── scene.route.js                      # /api/scene/*
│   │   └── SSLCommerzPayment.route.js          # /api/subscription/*
│   ├── services/
│   │   ├── auth.service.js                     # Auth business logic
│   │   ├── scene.service.js                    # Scene business logic
│   │   └── SSLCommerzPayment.service.js        # Payment business logic
│   ├── utils/
│   │   └── OTPSendingTemplate.js               # HTML OTP email template
│   ├── validation/
│   │   └── validationSSLCommerzPayment.js      # SSLCommerz payload validation
│   ├── index.js                                # Express app entry point
│   ├── vercel.json                             # Vercel backend config
│   ├── package.json
│   └── README.md                               # Backend API documentation
│
├── frontend/
│   ├── public/
│   │   ├── models/                             # Built-in GLTF/GLB 3D models
│   ├── src/
│   │   ├── assets/
│   │   │   └── hero.png
│   │   ├── components/
│   │   │   ├── ConfirmationModel.jsx            # Delete confirmation dialog
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── SideBar.jsx                     # Main sidebar wrapper
│   │   │   ├── TopBar.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── AddObjectDialogBox.jsx       # Object picker dialog
│   │   │   │   ├── PositionViewOfSideBar.jsx    # X/Y/Z position panel
│   │   │   │   ├── SceneObjectsList.jsx         # List of objects in scene
│   │   │   │   ├── SceneSelectedObjectOfSideBar.jsx
│   │   │   │   └── SelectedObjectPositionDetailsOfSideBar.jsx
│   │   │   ├── landing/
│   │   │   │   ├── FAQItem.jsx
│   │   │   │   ├── FeatureCard.jsx
│   │   │   │   ├── Stat.jsx
│   │   │   │   └── TestimonialCard.jsx
│   │   │   └── scene/
│   │   │       └── SceneRoom.jsx               # Three.js canvas + scene logic
│   │   ├── context/
│   │   │   ├── AuthContext.jsx                 # Auth state (user, login, logout)
│   │   │   └── SceneContext.jsx                # Scene state (objects, selection)
│   │   ├── layouts/
│   │   │   ├── Dashboard.jsx                   # Dashboard layout wrapper
│   │   │   └── ProtectRoute.jsx                # Auth guard for protected routes
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ForgetPasswordPage.jsx
│   │   │   ├── OTPverifyPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   ├── SceneViewRoomPage.jsx           # Main 3D scene page
│   │   │   ├── PaymentSuccessPage.jsx
│   │   │   ├── PaymentFailed.jsx
│   │   │   ├── PaymentCancel.jsx
│   │   │   ├── LoadingPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── UnauthorizedPage.jsx
│   │   ├── routes/
│   │   │   └── route.jsx                       # App route definitions
│   │   ├── utils/
│   │   │   ├── AxiosToastError.js              # Axios error toast handler
│   │   │   └── LoadObjectsToAddScene.js        # GLTF model loader utility
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Git](https://git-scm.com/)
- [Resend](https://resend.com/) account (for OTP emails)
- [SSLCommerz](https://developer.sslcommerz.com/) sandbox account (for payments)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/sabbirkhanoni/3D-web-application.git
cd 3D-web-application
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```properties
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/vr-scene-builder
SESSION_SECRET=your_super_secret_session_key_here
RESEND_API=re_xxxxxxxxxxxxxxxxxxxx

STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_store_password
```

Run the backend:

```bash
npm run dev
```

> Server starts on `http://localhost:5000`

---

### 3️⃣ Frontend Setup

> opne a new termial

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```properties
VITE_API_URL=http://localhost:5000
```

Run the frontend:

```bash
npm run dev
```

> App starts on `http://localhost:5173`

---

## 🔐 Environment Variables — Full Reference

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `5000` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `FRONTEND_URL` | Frontend origin URL for CORS | `http://localhost:5173` |
| `BACKEND_URL` | Backend origin URL for SSLCommerz | `http://localhost:5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `SESSION_SECRET` | Secret for `express-session` signing | any long random string |
| `RESEND_API` | Resend API key for OTP emails | `re_xxxx` |
| `STORE_ID` | SSLCommerz store ID | `pimart123` |
| `STORE_PASSWORD` | SSLCommerz store password | `pimart123@ssl` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000` |

---

## 📡 API Documentation

### Full detailed API docs are in [`backend/README.md`](./backend/README.md).

**Base URL:** `http://localhost:5000` (dev) | `https://your-backend.vercel.app` (prod)

**Auth:** Cookie-based sessions. All protected routes require an active session cookie.
Frontend must set `axios.defaults.withCredentials = true`.

---

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | ❌ | Register a new user |
| `POST` | `/api/auth/login` | ❌ | Login and create session |
| `POST` | `/api/auth/logout` | ✅ | Logout and destroy session |
| `GET` | `/api/auth/me` | ✅ | Get current authenticated user |
| `POST` | `/api/auth/forgot-password` | ❌ | Send OTP to email |
| `POST` | `/api/auth/verify-otp` | ❌ | Verify OTP code |
| `POST` | `/api/auth/reset-password` | ❌ | Reset password after OTP |

---

### Scene Routes — `/api/scene`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `GET` | `/api/scene` | ✅ | Get the user's saved scene |
| `POST` | `/api/scene` | ✅ | Save / update the user's scene |
| `DELETE` | `/api/scene` | ✅ | Delete the user's scene |

---

### Subscription Routes — `/api/subscription`

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/subscription/initiate` | ✅ | Initiate premium subscription via SSLCommerz |
| `GET/POST` | `/api/subscription/success/:tran_id` | ❌ | SSLCommerz success redirect |
| `GET/POST` | `/api/subscription/failed/:tran_id` | ❌ | SSLCommerz failed redirect |
| `GET/POST` | `/api/subscription/cancel/:tran_id` | ❌ | SSLCommerz cancel redirect |
| `POST` | `/api/subscription/ipn` | ❌ | SSLCommerz IPN webhook |

---

### Common Response Format

```json
{
  "message": "Operation successful",
  "error": false,
  "success": true,
  "data": {}
}
```

---

### HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | OK — Request successful |
| `201` | Created — Resource created |
| `400` | Bad Request — Validation error / invalid input |
| `401` | Unauthorized — Not logged in or session expired |
| `500` | Internal Server Error |

---

## 🗄️ Database Models

### User Schema
```js
{
  name: String,                        // 3–100 chars, required
  email: String,                       // unique, lowercase, required
  password: String,                    // bcryptjs hashed, required
  otp: String,                         // temporary OTP code
  otpExpiry: Date,                     // OTP expiry (5 minutes)
  subscriptionStatus: String,          // "free" | "premium", default: "free"
  subscriptionStartDate: Date,
  subscriptionEndDate: Date,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Scene Schema
```js
{
  userId: ObjectId,                    // ref: User, unique (1 scene per user)
  objects: [
    {
      id: String,
      type: String,                    // model key (e.g. "sofa1", "table")
      position: { x, y, z }
    }
  ],
  createdAt: DateTime,
  updatedAt: DateTime
}
```

### Payment Schema
```js
{
  userId: ObjectId,                    // ref: User
  amount: Number,
  transactionId: String,               // unique
  status: String,                      // "pending" | "success" | "failed" | "cancel"
  paymentMethod: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---

## 🔄 Auth Flow

```
Register  →  POST /api/auth/signup
Login     →  POST /api/auth/login  →  Session cookie set (HTTP-only)
Protected →  Cookie sent with every request automatically (withCredentials: true)
Logout    →  POST /api/auth/logout  →  Session destroyed

Forgot PW →  POST /api/auth/forgot-password  →  OTP emailed (5 min expiry)
Verify    →  POST /api/auth/verify-otp
Reset     →  POST /api/auth/reset-password
```

## 💳 Payment Flow (SSLCommerz)

```
POST /api/subscription/initiate
    → Payment record created (status: "pending")
    → SSLCommerz gateway URL returned
    → User redirected to SSLCommerz
    → User pays (card / bKash / Nagad etc.)
    → SSLCommerz redirects to /api/subscription/success/:tran_id
    → User marked as "premium", subscriptionStartDate recorded
    → User redirected to frontend /success/:tran_id
    → IPN webhook fires POST /api/subscription/ipn (server validation)
```

### SSLCommerz Sandbox Test Cards

| Card Type | Number | Expiry | CVV | OTP | Result |
|---|---|---|---|---|---|
| VISA | `4012000000000002` | any future | `123` | `123456` | ✅ Success |
| Mastercard | `5156700000000012` | any future | `123` | `123456` | ✅ Success |
| Failed | `4012000000000005` | any future | `123` | `123456` | ❌ Failure |

---

## 🌐 Deployment Guide

### Deploy Backend to Vercel

1. Push to GitHub.
2. [Vercel](https://vercel.com) → New Project → Import repo → **Root Directory:** `backend`
3. Add all environment variables from `backend/.env` in the Vercel dashboard.
4. The `backend/vercel.json` already handles routing.
5. Deploy.

### Deploy Frontend to Vercel

1. New Project → same repo → **Root Directory:** `frontend`
2. Add environment variable:
   - `VITE_API_URL` = your deployed backend URL
3. The `frontend/vercel.json` handles SPA routing.
4. Deploy.

> After deploying, update `FRONTEND_URL` in your backend Vercel env vars to your live frontend URL for correct CORS and cookie behavior.

---

## 🐛 Troubleshooting

**CORS / cookie not sent:**
> Set `axios.defaults.withCredentials = true` in your frontend. Ensure `FRONTEND_URL` in backend `.env` matches the exact frontend origin (no trailing slash).

**Session lost in production (Vercel):**
> Confirm `NODE_ENV=production` so the session cookie gets `secure: true` and `sameSite: 'none'`. Also make sure your backend Vercel domain serves HTTPS.

**MongoDB connection fails:**
> Whitelist `0.0.0.0/0` in MongoDB Atlas → Network Access (required for Vercel's dynamic IPs).

**OTP email not arriving:**
> Check your Resend API key and ensure you've verified a sender domain in the Resend dashboard.

**SSLCommerz payment not redirecting:**
> In sandbox mode, ensure `STORE_ID` and `STORE_PASSWORD` are correct from your [SSLCommerz sandbox account](https://developer.sslcommerz.com/).

---

## 🚀 Future Improvements

- 💡 Dynamic lighting controls (ambient, point, directional)
- 🌅 Skybox / HDRI environment maps
- 👥 Multi-user collaborative scenes via WebSockets
- ↩️ Undo / Redo history
- 📱 Mobile touch controls
- 🎥 Scene screenshot / export
- 📦 Expanded 3D model library

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
# Open a Pull Request
```

---

## 👨‍💻 Author

**Md Sabbir Khan Oni**
- GitHub: [@sabbirkhanoni](https://github.com/sabbirkhanoni)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ and Three.js by <a href="https://github.com/sabbirkhanoni">Md Sabbir Khan Oni</a>
</div>
