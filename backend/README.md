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
