# 3D VR Application Backend API

## User Signup API

### Overview
The User Signup API allows frontend applications to register new users in the 3D VR Application system. This endpoint creates a new user account with encrypted password storage and validation.

---

### Endpoint Details

#### **POST** `/api/auth/signup`

Creates a new user account in the system.

---

### Request

#### **URL**
```
POST http://localhost:PORT/api/auth/signup
```

#### **Request Body**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

#### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `name` | string | Yes | Full name of the user | Min: 3 chars, Max: 100 chars, Trimmed |
| `email` | string | Yes | Email address of the user | Must be valid email format, Unique, Lowercase, Trimmed |
| `password` | string | Yes | User password | 6-26 characters, Must contain at least one letter and one number |

#### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### Response

#### **Success Response (201 Created)**
```json
{
  "message": "User created successfully",
  "error": null,
  "success": true
}
```
#### **Error Response (400 Bad Request)**
```json
{
  "message": "User creation failed",
  "error": "Error message describing the issue",
  "success": false
}
```

---

## User Login API

### Overview
The User Login API authenticates users by verifying their email and password credentials. On successful login, a session ID is stored for maintaining user state.

---

### Endpoint Details

#### **POST** `/api/auth/login`

Authenticates user credentials and creates a session.

---

### Request

#### **URL**
```
POST http://localhost:PORT/api/auth/login
```

#### **Headers**
```json
{
  "Content-Type": "application/json"
}
```

#### **Request Body**
```json
{
  "email": "string",
  "password": "string"
}
```

#### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `email` | string | Yes | Registered email address | Must be valid email format |
| `password` | string | Yes | User password | Must match registered password |

#### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

### Response

#### **Success Response (200 OK)**
```json
{
  "message": "Login successfully",
  "error": false,
  "success": true
}
```

#### **Error Response (400 Bad Request)**
```json
{
  "message": "Email and password are required",
  "error": true,
  "success": false
}
```

#### **Possible Error Messages**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Email and password are required` | Missing email or password | Provide both email and password |
| `User not found` | Email is not registered | Sign up first or use correct email |
| `Invalid password` | Password doesn't match | Check your password and try again |

---

---

## User Logout API

### Overview
The User Logout API destroys the user session and clears session data from the server.

---

### Endpoint Details

#### **POST** `/api/auth/logout`

Logs out the current user and destroys the session.

---

### Request

#### **URL**
```
POST http://localhost:PORT/api/auth/logout
```

#### **Headers**
```json
{
  "Content-Type": "application/json"
}
```

#### **Request Body**
```json
{}
```
No body required.

#### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

### Response

#### **Success Response (200 OK)**
```json
{
  "message": "Logout successful",
  "error": false,
  "success": true
}
```

#### **Error Response (500 Server Error)**
```json
{
  "message": "Error message describing the issue",
  "error": true,
  "success": false
}
```

---

---

## Get Me (Verify Auth) API

### Overview
The Get Me API verifies if the user is authenticated by checking the session. This endpoint should be called on application load to check authentication status.

---

### Endpoint Details

#### **GET** `/api/auth/me`

Retrieves current authenticated user information from session.

---

### Request

#### **URL**
```
GET http://localhost:PORT/api/auth/me
```

#### **Headers**
```json
{
  "Content-Type": "application/json"
}
```

#### **Example Request**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Content-Type: application/json"
```

---

### Response

#### **Success Response (200 OK)**
```json
{
  "message": "User authenticated",
  "error": false,
  "success": true,
  "userId": "507f1f77bcf86cd799439011"
}
```

#### **Error Response (401 Unauthorized)**
```json
{
  "message": "Unauthorized, Please login to access this resource",
  "error": true,
  "success": false
}
```


---

## Forgot Password Request API

### Overview
The Forgot Password Request API generates an OTP and sends it to the user's email for password reset purposes.

---

### Endpoint Details

#### **POST** `/api/auth/forgot-password`

Generates and sends OTP to user's email.

---

### Request

#### **URL**
```
POST http://localhost:PORT/api/auth/forgot-password
```

#### **Headers**
```json
{
  "Content-Type": "application/json"
}
```

#### **Request Body**
```json
{
  "email": "string"
}
```

#### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `email` | string | Yes | User's registered email | Must be valid email format |

#### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

---

### Response

#### **Success Response (200 OK)**
```json
{
  "message": "OTP sent to your email successfully",
  "error": false,
  "success": true
}
```

#### **Error Response (400 Bad Request)**
```json
{
  "message": "User not found",
  "error": true,
  "success": false
}
```

#### **Possible Error Messages**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Email is required` | Email field is missing | Provide a valid email address |
| `User not found` | Email is not registered | Sign up first with this email |
| `Forgot password request failed` | OTP sending failed | Try again or contact support |

**Important Notes:**
- OTP is valid for **5 minutes** only
- OTP is sent to the registered email
- User can request a new OTP if the previous one expires

---

---

## Verify OTP API

### Overview
The Verify OTP API validates the OTP sent to the user's email. After successful verification, the user can proceed to reset their password.

---

### Endpoint Details

#### **POST** `/api/auth/verify-otp`

Verifies the OTP code sent to user's email.

---

### Request

#### **URL**
```
POST http://localhost:PORT/api/auth/verify-otp
```

#### **Headers**
```json
{
  "Content-Type": "application/json"
}
```

#### **Request Body**
```json
{
  "email": "string",
  "otp": "string"
}
```

#### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `email` | string | Yes | User's registered email | Must match the email OTP was sent to |
| `otp` | string | Yes | OTP code received | 6-digit numeric code |

#### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "otp": "123456"
  }'
```

---

### Response

#### **Success Response (200 OK)**
```json
{
  "message": "OTP verified successfully",
  "error": false,
  "success": true
}
```

#### **Error Response (400 Bad Request)**
```json
{
  "message": "Invalid OTP",
  "error": true,
  "success": false
}
```

#### **Possible Error Messages**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Email and OTP are required` | Missing email or OTP | Provide both email and OTP |
| `User not found` | Email is not registered | Check email address |
| `Invalid OTP` | OTP doesn't match | Enter the correct OTP from email |
| `OTP expired` | OTP validity expired (5 min) | Request a new OTP |

**Important Notes:**
- OTP is valid for **5 minutes** only
- After verification, OTP is cleared from database
- User must then proceed to reset password within same session

---


---

## Reset Password API

### Overview
The Reset Password API updates the user's password after OTP verification. This endpoint should only be called after successful OTP verification.

---

### Endpoint Details

#### **POST** `/api/auth/reset-password`

Resets the user's password to a new value.

---

### Request

#### **URL**
```
POST http://localhost:PORT/api/auth/reset-password
```

#### **Headers**
```json
{
  "Content-Type": "application/json"
}
```

#### **Request Body**
```json
{
  "email": "string",
  "newPassword": "string"
}
```

#### **Body Parameters**

| Parameter | Type | Required | Description | Constraints |
|-----------|------|----------|-------------|-------------|
| `email` | string | Yes | User's registered email | Must be the email used in OTP verification |
| `newPassword` | string | Yes | New password | 6-26 characters, letter + number required |

#### **Example Request**
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "newPassword": "newPassword123"
  }'
```

---

### Response

#### **Success Response (200 OK)**
```json
{
  "message": "Password reset successfully",
  "error": false,
  "success": true
}
```

#### **Error Response (400 Bad Request)**
```json
{
  "message": "User not found",
  "error": true,
  "success": false
}
```

#### **Possible Error Messages**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Email and new password are required` | Missing email or password | Provide both fields |
| `User not found` | Email is not registered | Check email address |
| `Password reset failed` | Password doesn't meet requirements | Password must be 6-26 chars with letter+number |

**Password Requirements:**
- ✅ 6-26 characters long
- ✅ At least one letter (A-Z, a-z)
- ✅ At least one number (0-9)
- ✅ Password is securely hashed before storing

---

---

## Complete Authentication Flow

### User Registration & Login Flow

```
1. User Signup
   POST /api/auth/signup → User account created
   
2. User Login
   POST /api/auth/login → Session created
   
3. Check Authentication
   GET /api/auth/me → Verify user is logged in
   
4. Access Protected Resources
   Use session to access dashboard and other resources
   
5. User Logout
   POST /api/auth/logout → Session destroyed
```

### Password Reset Flow

```
1. Forgot Password Request
   POST /api/auth/forgot-password → OTP sent to email
   
2. Verify OTP
   POST /api/auth/verify-otp → OTP validated
   
3. Reset Password
   POST /api/auth/reset-password → Password updated
   
4. Login Again
   POST /api/auth/login → User logs in with new password
```

---

## Common Response Format

All API endpoints follow a consistent response format:

### Success Response
```json
{
  "message": "Operation successful",
  "error": false,
  "success": true,
  "data": {} // Optional: Additional data
}
```

### Error Response
```json
{
  "message": "Error description",
  "error": true,
  "success": false
}
```

---

## HTTP Status Codes

| Status Code | Description | Usage |
|-------------|-------------|-------|
| **200 OK** | Request successful | GET, POST (successful login, logout, etc) |
| **201 Created** | Resource created successfully | POST (successful signup) |
| **400 Bad Request** | Invalid request data | Validation errors, user not found, invalid credentials |
| **401 Unauthorized** | Authentication required | Session expired, not logged in |
| **500 Server Error** | Internal server error | Database errors, email sending failed |

---

## Testing All APIs with Postman

### Collection Setup
1. Create a new Postman Collection: "3D VR Application API"
2. Add Base URL: `http://localhost:5000`

### Test Cases

#### 1. Signup
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/signup`
- **Body:** 
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test12345"
}
```

#### 2. Login
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/login`
- **Body:**
```json
{
  "email": "test@example.com",
  "password": "Test12345"
}
```

#### 3. Get Me
- **Method:** GET
- **URL:** `{{base_url}}/api/auth/me`

#### 4. Forgot Password
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/forgot-password`
- **Body:**
```json
{
  "email": "test@example.com"
}
```

#### 5. Verify OTP
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/verify-otp`
- **Body:**
```json
{
  "email": "test@example.com",
  "otp": "123456"
}
```

#### 6. Reset Password
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/reset-password`
- **Body:**
```json
{
  "email": "test@example.com",
  "newPassword": "NewPass123"
}
```

#### 7. Logout
- **Method:** POST
- **URL:** `{{base_url}}/api/auth/logout`

---

## Security Best Practices

✅ **Implemented:**
- Passwords hashed with bcryptjs (10 salt rounds)
- Email validation on signup
- Unique email constraint in database
- OTP expiry time (5 minutes)
- Session-based authentication
- Input validation on all endpoints
- CORS protection enabled

---

## Environment Variables

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/vr-app
SESSION_SECRET=your-secret-key
RESEND_API=your-resend-api-key
NODE_ENV=development
```

---

## Database Models

### User Schema
```javascript
{
  _id: ObjectId,
  name: String (3-100 chars, required),
  email: String (unique, lowercase, required),
  password: String (hashed, required),
  otp: String (optional, temporary),
  otpExpiry: Date (optional, temporary),
  createdAt: DateTime,
  updatedAt: DateTime
}
```

---
