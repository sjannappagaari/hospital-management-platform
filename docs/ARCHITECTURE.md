# System Architecture

## Overview

The Hospital Management Platform is built using a modern, scalable, three-tier architecture with clear separation of concerns. The system is designed for high availability, performance, and maintainability.

## High-Level Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                            │
├─────────────────────┬──────────────────┬──────────────────────┤
│   Frontend          │   Admin           │   Mobile Browsers    │
│  (Next.js)          │  Dashboard        │   (via Responsive)   │
│  Port 3000          │  (Next.js)        │                      │
│                     │  Port 3001        │                      │
└────────────┬────────┴────────┬─────────┴─────────────┬────────┘
             │                 │                       │
             └─────────────────┴───────────────────────┘
                      ↓
┌────────────────────────────────────────────────────────────────┐
│                      GATEWAY LAYER                             │
│                    (Nginx Reverse Proxy)                       │
│            Load Balancing • Rate Limiting • SSL/TLS            │
│                    Port 80 • Port 443                          │
└──────────────────────┬──────────────────────────────────────┘
                      ↓
        ┌─────────────────────────────────┐
        │    API LAYER (Backend API)      │
        │       NestJS Server             │
        │       Port 8000                 │
        │  ┌──────────────────────────┐  │
        │  │  Auth Module             │  │
        │  ├──────────────────────────┤  │
        │  │  Doctors Module          │  │
        │  ├──────────────────────────┤  │
        │  │  Appointments Module     │  │
        │  ├──────────────────────────┤  │
        │  │  Blog Module             │  │
        │  ├──────────────────────────┤  │
        │  │  Testimonials Module     │  │
        │  ├──────────────────────────┤  │
        │  │  Packages Module         │  │
        │  ├──────────────────────────┤  │
        │  │  Insurance Module        │  │
        │  ├──────────────────────────┤  │
        │  │  Careers Module          │  │
        │  ├──────────────────────────┤  │
        │  │  Settings Module         │  │
        │  └──────────────────────────┘  │
        └──────────┬─────────────────────┘
                   │
        ┌──────────┴────────────┬─────────────┐
        ↓                       ↓             ↓
┌──────────────────┐  ┌──────────────────┐  ┌─────────┐
│  Database Layer  │  │  Cache Layer     │  │ Upload  │
│                  │  │                  │  │ Storage │
│  PostgreSQL 15   │  │  Redis 7         │  │         │
│  Port 5432       │  │  Port 6379       │  │  (AWS)  │
│                  │  │                  │  │         │
│  ┌────────────┐  │  │  Session Cache   │  │ Images  │
│  │  main db   │  │  │ Request Cache    │  │ Files   │
│  │  Indexes   │  │  │ Rate Limiting    │  │         │
│  │  18 Tables │  │  │   Counters       │  │         │
│  └────────────┘  │  │                  │  │         │
└──────────────────┘  └──────────────────┘  └─────────┘
```

## Detailed Component Architecture

### 1. Client Layer

#### Frontend (Public Website)
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Port**: 3000

**Pages**:
- Home page with hero banner
- Hospital information
- Department listings
- Doctor profiles and search
- Appointment booking
- Health packages
- Patient testimonials
- Blog/health articles
- Insurance partnerships
- Career opportunities
- Contact forms
- Emergency services

#### Admin Dashboard
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Purpose**: Content and system management
- **Port**: 3001

**Features**:
- Authentication and authorization
- Dashboard with KPIs
- Doctor management (CRUD)
- Department management
- Appointment management
- Blog management
- Testimonial moderation
- Package management
- Insurance partner management
- Career management
- Site settings
- User and role management
- Feature toggles

### 2. Gateway Layer

#### Nginx Reverse Proxy
- **Purpose**: Load balancing, SSL termination, rate limiting
- **Configuration**: [docker/nginx.conf](../docker/nginx.conf)
- **Ports**: 80 (HTTP), 443 (HTTPS)

**Features**:
```
- Request routing to appropriate services
- SSL/TLS termination
- Gzip compression
- Rate limiting (API: 10 req/s, General: 30 req/s)
- Security headers
- Caching policies
- Access logging
```

### 3. API Layer (Backend)

#### NestJS API Server
- **Framework**: NestJS (Node.js framework)
- **Language**: TypeScript
- **Port**: 8000
- **Database**: PostgreSQL via Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation**: Swagger/OpenAPI

#### Architectural Patterns

##### Module Structure
Each functional area is organized as a NestJS module with:
```
modules/
├── {module}/
│   ├── {module}.controller.ts   # HTTP endpoints
│   ├── {module}.service.ts      # Business logic
│   ├── {module}.module.ts       # Module definition
│   ├── dto/                     # Data transfer objects
│   │   └── *.dto.ts             # Input validation
│   └── entities/                # Database entities
```

##### Key Modules

1. **Auth Module**
   - User registration and login
   - JWT token generation and validation
   - Password hashing with bcrypt
   - Token refresh mechanism

2. **Doctors Module**
   - Doctor CRUD operations
   - Department association
   - Specialization management
   - Availability slots calculation
   - Search and filtering

3. **Appointments Module**
   - Appointment booking
   - Slot availability checking
   - Status management (Pending, Approved, Rejected, Completed, Cancelled)
   - Appointment history

4. **Blog Module**
   - Blog post creation and management
   - Draft/Published workflow
   - Comment and view tracking
   - Search and filtering

5. **Testimonials Module**
   - Patient testimonial submission
   - Admin moderation
   - Doctor/Department association
   - Rating system (1-5 stars)

6. **Packages Module**
   - Health package listing
   - Package details and pricing
   - Benefits and tests information

7. **Insurance Module**
   - Insurance partner management
   - Partnership information

8. **Careers Module**
   - Job opening management
   - Application tracking
   - Status management

9. **Settings Module**
   - Site configuration
   - Hospital information
   - Feature toggles

#### Security Implementation

```typescript
// Authentication Flow
1. User login with email/password
2. Credentials validated against hashed password
3. JWT token generated (24-hour expiry)
4. Token sent to client
5. Client includes token in Authorization header
6. JwtGuard validates token on protected routes

// Authorization Flow
1. Request arrives with JWT token
2. Token payload extracted and validated
3. User role extracted from token
4. RolesGuard checks if user role has access
5. If authorized, request proceeds to handler
```

#### Error Handling

```typescript
// Exception Filter
try {
  // Business logic
} catch (error) {
  // Standardized error response
  {
    statusCode: 400,
    message: "Error description",
    error: "BadRequest"
  }
}
```

#### Validation Pipeline

```typescript
// Class Validator Integration
@Post('register')
async register(@Body() dto: RegisterDto) {
  // DTO automatically validated:
  // - email is valid email format
  // - password minimum 8 characters
  // - firstName and lastName are strings
  // - role is valid enum value
}
```

### 4. Database Layer

#### PostgreSQL 15

**Design Principles**:
- Normalized schema (up to 3NF)
- Proper indexing on search fields
- Foreign key constraints
- Cascading deletes where appropriate
- Type-safe with enums

**Entity Relationship Diagram**:
```
User (1) ──┬──────── (N) Doctor
           ├──────── (N) Patient  
           ├──────── (N) BlogPost
           ├──────── (N) Testimonial
           ├──────── (N) Appointment
           └──────── (N) CareerApplication

Doctor (1) ──┬──────── (N) DoctorAvailability
            ├──────── (N) Appointment
            └──────── (N) Testimonial

Department (1) ──┬──────── (N) Doctor
                ├──────── (N) Appointment
                └──────── (N) Testimonial

Patient (1) ────────── (N) Appointment

CareerOpening (1) ───── (N) CareerApplication
```

#### Key Tables (18 Total)

| Table | Purpose | Records |
|-------|---------|---------|
| Users | Authentication & authorization | ~1000s |
| Doctors | Medical professionals | ~1000s |
| Departments | Hospital departments | ~20 |
| Appointments | Patient bookings | ~100,000s |
| Patients | Patient information | ~10,000s |
| DoctorAvailability | Doctor schedules | ~N doctors × 5 days |
| BlogPosts | Health articles | ~100s |
| Testimonials | Patient reviews | ~1000s |
| HealthPackages | Diagnostic packages | ~10s |
| InsurancePartners | Insurance companies | ~10s |
| CareerOpenings | Job listings | ~10s |
| CareerApplications | Job applications | ~100s |
| SiteSettings | Configuration | ~10s |
| HospitalInfo | Hospital metadata | 1 |
| FeatureToggle | Feature flags | ~10s |

#### Indexes Strategy

```sql
-- Composite indexes for common queries
CREATE INDEX idx_doctor_department ON doctors(departmentId);
CREATE INDEX idx_appointment_status ON appointments(status, appointmentDate);
CREATE INDEX idx_blog_published ON blogposts(status, publishedAt);

-- Unique indexes
CREATE UNIQUE INDEX idx_user_email ON users(email);
CREATE UNIQUE INDEX idx_doctor_user ON doctors(userId);
```

#### Prisma ORM

Benefits:
- Type-safe database queries
- Automatic migrations with `prisma migrate`
- Built-in pagination support
- Relation queries with eager loading
- No SQL injection vulnerabilities
- Prisma Studio for data visualization

### 5. Cache Layer (Redis)

#### Purpose
- Session caching
- Request caching
- Rate limiting counters
- Real-time data storage

#### Usage
```typescript
// Cache appointment slots
redis.set(`slots:doctor:${doctorId}:${date}`, slots, 'EX', 3600);

// Cache doctor profiles
redis.get(`doctor:${doctorId}`);

// Rate limiting
redis.incr(`rate:${userId}:${timestamp}`);
```

## Deployment Architecture

### Docker Containerization

```
hospital-platform/
├── Dockerfile.backend      → NestJS API
├── Dockerfile.frontend     → Next.js Frontend
├── Dockerfile.admin        → Next.js Admin
├── docker-compose.yml      → Orchestration
└── nginx.conf              → Reverse Proxy
```

### Docker Compose Services

```yaml
Services:
1. postgres      - PostgreSQL database
2. redis         - Cache and session storage
3. backend       - NestJS API server
4. frontend      - Public website
5. admin         - Admin dashboard
6. nginx         - Reverse proxy

Networks:
- hospital_network (internal communication)

Volumes:
- postgres_data   (database persistence)
- redis_data      (cache persistence)
```

## Data Flow

### Appointment Booking Flow

```
1. Frontend (Patient)
   └─→ POST /api/appointments/book
       ├─ Doctor ID
       ├─ Date & Time
       └─ Reason

2. Backend API
   ├─ Validate request (JwtGuard)
   ├─ Check doctor availability
   ├─ Check for slot conflicts
   ├─ Create appointment record
   └─ Return appointment details

3. Database (PostgreSQL)
   └─ INSERT INTO appointments(...)

4. Response
   └─ Frontend updates UI with appointment confirmation
```

### Authentication Flow

```
1. User Login
   └─→ POST /api/auth/login
       ├─ Email
       └─ Password

2. Backend Validation
   ├─ Find user by email
   ├─ Compare password hash
   ├─ Generate JWT token
   └─ Return token and user data

3. Token Storage
   └─ Client stores token in localStorage

4. Subsequent Requests
   └─ Authorization: Bearer <token>
      ├─ JwtGuard validates token
      ├─ Extract user ID from payload
      ├─ Load user data
      └─ Process request
```

## Scalability Considerations

### Horizontal Scaling

```
Load Balancer
    ├─→ Backend Instance 1 (8000)
    ├─→ Backend Instance 2 (8000)
    ├─→ Backend Instance 3 (8000)
    └─→ Backend Instance N (8000)
         │
         └─→ Shared PostgreSQL (primary-replica setup)
```

### Database Optimization

```
Read Replicas:
- Master (write)
- Replica 1 (read - blog posts)
- Replica 2 (read - doctor listings)

Partitioning:
- Appointments by date range
- Blog posts by year

Connection Pooling:
- PgBouncer for connection pooling
- Max 100 connections per instance
```

## Security Architecture

### Network Security
```
┌─────────────────────┐
│  Internet (HTTPS)   │
└──────────────┬──────┘
               ↓
        ┌──────────────┐
        │ Nginx/WAF    │
        │ - SSL/TLS    │
        │ - Rate limit │
        │ - DDoS prot. │
        └──────────┬───┘
                   ↓
      ┌────────────────────────┐
      │ Internal Network       │
      │ - Docker Network       │
      │ - No external access   │
      │ - Service isolation    │
      └────────────┬───────────┘
                   ↓
      ┌─────────────────────────┐
      │ Services                │
      │ - Backend (8000)        │
      │ - Frontend (3000)       │
      │ - Admin (3001)          │
      │ - DB (5432)             │
      │ - Cache (6379)          │
      └─────────────────────────┘
```

### Application Security

```
1. Input Validation
   - Class Validator
   - Sanitization
   - Type checking

2. Authentication
   - JWT tokens
   - Password hashing (bcrypt)
   - Token expiration

3. Authorization
   - Role-based access control
   - Route protection
   - Resource-level permissions

4. Data Protection
   - Encrypted fields (passwords)
   - Secure session management
   - CORS restrictions

5. API Security
   - Rate limiting
   - Request validation
   - Error message sanitization
```

## Performance Optimization

### Frontend Optimization
- Code splitting by route
- Image lazy loading
- Static site generation (SSG)
- Server-side rendering (SSR)
- CSS variables for theming

### Backend Optimization
- Database query optimization
- Connection pooling
- Caching strategies
- Compression (gzip)
- CDN for static assets

### Database Optimization
- Strategic indexing
- Query analysis with EXPLAIN
- Connection pooling
- Read replicas
- Partitioning for large tables

## Monitoring & Observability

### Logging
```
- Application logs (Winston/Pino)
- Access logs (Nginx)
- Error logs (aggregated)
- Debug logs (development only)
```

### Metrics
```
- Request latency
- Error rates
- Database performance
- Cache hit rates
- Memory usage
- CPU utilization
```

### Health Checks
```
Backend:    GET /health
Frontend:   GET /
Admin:      GET /
Database:   SELECT 1; (every 10s)
```

## Disaster Recovery

### Backup Strategy
```
Database:
- Daily automated backups
- Point-in-time recovery
- Replicated across regions

Code:
- Version control (Git)
- Regular deployment backups
```

### Failover Strategy
```
- Health check mechanism
- Automatic service restart
- Database replica promotion
- Load balancer failover
```

## Cost Optimization

### Infrastructure
- Containerization reduces overhead
- Managed PostgreSQL reduces ops
- Redis optional (use for performance)
- Single server suitable for <10k users

### Scaling Timeline
- 0-1k users: Single Docker host
- 1k-10k users: Separate backend/DB hosts
- 10k+ users: Multi-instance with load balancing

---

## Technology Decisions

### Why NestJS?
- Enterprise architecture
- Dependency injection
- Modular structure
- TypeScript native
- Built-in validation

### Why Next.js?
- Server-side rendering
- Static generation
- API routes
- Built-in optimization
- Vercel deployment

### Why PostgreSQL?
- ACID compliance
- Advanced features
- Reliability
- Open source
- Industry standard

### Why Docker?
- Consistency across environments
- Easy scaling
- Simplified deployment
- Service isolation

---

## Integration Points

### External Services (Optional)
```
SMS Notifications:        Twilio / AWS SNS
Email Notifications:      SendGrid / AWS SES
Payment Processing:       Stripe / Razorpay
Document Storage:         AWS S3 / DigitalOcean Spaces
Video Consultations:      Zoom API / Agora
Analytics:                Google Analytics / Mixpanel
Error Tracking:           Sentry / Rollbar
```

---

## Future Enhancements

1. **Mobile Apps** (React Native)
2. **Video Consultations** (WebRTC)
3. **Payment Integration** (Stripe/Razorpay)
4. **SMS/Email Notifications**
5. **Advanced Analytics**
6. **Machine Learning** (appointment predictions)
7. **Multi-language Support**
8. **Telemedicine** Features
9. **Insurance Integration**
10. **Patient Portal** Enhancements

---

This architecture is designed to be:
- **Scalable**: Easy to scale components independently
- **Maintainable**: Clear separation of concerns
- **Secure**: Multiple layers of security
- **Performant**: Optimized for speed
- **Resilient**: Handles failures gracefully
- **Observable**: Comprehensive logging and monitoring

---

For detailed information on specific components, see:
- [API_ENDPOINTS.md](./API_ENDPOINTS.md) - API design
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Database design
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment architecture
