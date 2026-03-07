# API Endpoints Documentation

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://api.helioshospital.in`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Auth Endpoints

### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password@123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91-9000000001",
  "role": "PATIENT"  // optional, defaults to PATIENT
}

Response 201:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "PATIENT"
  }
}
```

### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@hospitaldemo.in",
  "password": "Admin@123"
}

Response 200:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin-id",
    "email": "admin@hospitaldemo.in",
    "firstName": "Admin",
    "lastName": "User",
    "role": "SUPER_ADMIN"
  }
}
```

### Get Profile
```
GET /api/auth/profile
Authorization: Bearer <token>

Response 200:
{
  "id": "user-id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "PATIENT"
}
```

### Logout
```
POST /api/auth/logout
Authorization: Bearer <token>

Response 200:
{
  "message": "Logged out successfully"
}
```

---

## Doctors Endpoints

### Get All Doctors
```
GET /api/doctors?skip=0&take=10

Response 200:
{
  "data": [
    {
      "id": "doctor-1",
      "specialization": "Cardiologist",
      "experience": 15,
      "consultationFee": 50000,
      "isAvailable": true,
      "user": {
        "firstName": "Rajesh",
        "lastName": "Kumar",
        "email": "rajesh.kumar@hospital.in",
        "phone": "+91-9000000001"
      },
      "department": {
        "id": "dept-1",
        "name": "Cardiology",
        "slug": "cardiology"
      }
    }
  ],
  "total": 10,
  "skip": 0,
  "take": 10
}
```

### Get Doctor by ID
```
GET /api/doctors/:id

Response 200:
{
  "id": "doctor-1",
  "specialization": "Cardiologist",
  "experience": 15,
  "bio": "...",
  "qualifications": ["MBBS", "MD/MS"],
  "registrationNo": "REG123456",
  "consultationFee": 50000,
  "user": {...},
  "department": {...},
  "availability": [...]
}
```

### Get Doctors by Department
```
GET /api/doctors/department/:departmentId?skip=0&take=10

Response 200: (same as Get All Doctors)
```

### Get Available Slots
```
GET /api/doctors/:id/slots?date=2024-03-15

Response 200:
[
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  ...
]
```

### Create Doctor (Admin Only)
```
POST /api/doctors
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "firstName": "Dr.",
  "lastName": "New",
  "email": "doctor@hospital.in",
  "specialization": "Surgeon",
  "qualifications": ["MBBS", "MS"],
  "experience": 10,
  "consultationFee": 60000,
  "departmentId": "dept-1",
  "registrationNo": "REG789012"
}

Response 201:
{
  "id": "doctor-new",
  ...
}
```

### Update Doctor (Admin Only)
```
PUT /api/doctors/:id
Authorization: Bearer <admin_token>

{
  "specialization": "Senior Surgeon",
  "experience": 11,
  "consultationFee": 70000
}

Response 200: (updated doctor object)
```

### Delete Doctor (Admin Only)
```
DELETE /api/doctors/:id
Authorization: Bearer <admin_token>

Response 200:
{
  "message": "Doctor deleted successfully"
}
```

---

## Appointments Endpoints

### Book Appointment
```
POST /api/appointments/book
Authorization: Bearer <patient_token>
Content-Type: application/json

{
  "doctorId": "doctor-1",
  "departmentId": "dept-1",
  "appointmentDate": "2024-03-20",
  "appointmentTime": "14:00",
  "reason": "Regular Check-up"
}

Response 201:
{
  "id": "apt-1",
  "patientId": "patient-1",
  "doctorId": "doctor-1",
  "appointmentDate": "2024-03-20T00:00:00.000Z",
  "appointmentTime": "14:00",
  "status": "PENDING",
  "reason": "Regular Check-up"
}
```

### Get Appointments
```
GET /api/appointments?status=PENDING&skip=0&take=10
Authorization: Bearer <token>

Response 200:
{
  "data": [
    {
      "id": "apt-1",
      "patientId": "patient-1",
      "doctorId": "doctor-1",
      "departmentId": "dept-1",
      "appointmentDate": "2024-03-20T00:00:00.000Z",
      "appointmentTime": "14:00",
      "status": "PENDING",
      "reason": "Regular Check-up",
      "doctor": {...},
      "patient": {...}
    }
  ],
  "total": 5,
  "skip": 0,
  "take": 10
}
```

### Get Appointment by ID
```
GET /api/appointments/:id
Authorization: Bearer <token>

Response 200: (appointment object)
```

### Approve Appointment (Admin Only)
```
PUT /api/admin/appointments/:id/approve
Authorization: Bearer <admin_token>

Response 200:
{
  "status": "APPROVED",
  ...
}
```

### Reject Appointment (Admin Only)
```
PUT /api/admin/appointments/:id/reject
Authorization: Bearer <admin_token>

Response 200:
{
  "status": "REJECTED",
  ...
}
```

---

## Departments Endpoints

### Get All Departments
```
GET /api/departments

Response 200:
[
  {
    "id": "dept-1",
    "name": "Cardiology",
    "slug": "cardiology",
    "description": "...",
    "icon": "❤️",
    "image": "/images/cardiology.jpg",
    "isActive": true
  }
]
```

### Get Department by ID
```
GET /api/departments/:id

Response 200: (department object)
```

---

## Blog Endpoints

### Get Blog Posts
```
GET /api/blog?status=PUBLISHED&skip=0&take=10

Response 200:
{
  "data": [
    {
      "id": "post-1",
      "title": "Heart Health Tips",
      "slug": "heart-health-tips",
      "excerpt": "...",
      "content": "<h2>...</h2><p>...</p>",
      "image": "/images/blog/heart.jpg",
      "views": 125,
      "publishedAt": "2024-03-10T12:00:00.000Z",
      "author": {
        "firstName": "Admin",
        "lastName": "User"
      }
    }
  ],
  "total": 15,
  "skip": 0,
  "take": 10
}
```

### Get Blog Post by Slug
```
GET /api/blog/:slug

Response 200: (blog post object)
```

### Create Blog Post (Admin Only)
```
POST /api/blog
Authorization: Bearer <admin_token>

{
  "title": "New Health Article",
  "slug": "new-health-article",
  "excerpt": "Short excerpt",
  "content": "<h2>Full content</h2>...",
  "image": "/images/blog/health.jpg"
}

Response 201: (blog post object)
```

---

## Health Packages Endpoints

### Get Health Packages
```
GET /api/packages

Response 200:
[
  {
    "id": "pkg-1",
    "name": "Full Body Checkup",
    "slug": "full-body-checkup",
    "description": "Comprehensive health screening",
    "price": 25000,
    "duration": "3 days",
    "tests": ["Blood Tests", "ECG", "Ultrasound"],
    "benefits": ["100% Health Assessment"]
  }
]
```

---

## Testimonials Endpoints

### Get Testimonials
```
GET /api/testimonials

Response 200:
[
  {
    "id": "test-1",
    "title": "Excellent Care",
    "content": "Great experience with the hospital",
    "rating": 5,
    "user": {...},
    "doctor": {...}
  }
]
```

### Submit Testimonial
```
POST /api/testimonials
Authorization: Bearer <patient_token>

{
  "title": "Great Service",
  "content": "Very satisfied with the treatment",
  "rating": 5,
  "doctorId": "doctor-1"
}

Response 201: (testimonial object)
```

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Access denied",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 204 | No Content - Request successful, no content to return |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation error |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

---

## Pagination

All list endpoints support pagination using `skip` and `take` query parameters:

```
GET /api/doctors?skip=0&take=10
GET /api/appointments?skip=20&take=10
```

Response format:
```json
{
  "data": [...],
  "total": 100,
  "skip": 0,
  "take": 10
}
```

---

## Rate Limiting

- API endpoints: 10 requests/second per IP
- General endpoints: 30 requests/second per IP
- Burst allowance: Up to 2x the limit for short periods

---

## Testing with cURL

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@hospitaldemo.in",
    "password": "Admin@123"
  }'
```

### Get Doctors
```bash
curl http://localhost:8000/api/doctors \
  -H "Accept: application/json"
```

### Book Appointment
```bash
curl -X POST http://localhost:8000/api/appointments/book \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "doctorId": "doctor-1",
    "departmentId": "dept-1",
    "appointmentDate": "2024-03-20",
    "appointmentTime": "14:00",
    "reason": "Regular Check-up"
  }'
```

---

## Interactive API Documentation

Access Swagger UI at: `http://localhost:8000/api/docs`

All endpoints are documented with examples and request/response schemas.
