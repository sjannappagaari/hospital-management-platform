# Hospital Management Platform - Quick Start Guide

A modern, production-ready hospital website platform with appointment system, doctor management, admin dashboard, and complete backend API.

## 🚀 Quick Start (5 minutes)

### Using Docker Compose (Recommended)

```bash
# 1. Clone and enter directory
git clone <repository-url>
cd hospital-platform

# 2. Start all services (includes database)
docker-compose up -d

# 3. Wait 30 seconds for database to be ready, then run:
docker-compose exec backend npx prisma db push
docker-compose exec backend npx prisma db seed

# 4. Done! Access services:
# Frontend: http://localhost:3000
# Admin:    http://localhost:3001
# API:      http://localhost:8000
# API Docs: http://localhost:8000/api/docs
```

### Manual Setup

```bash
# 1. Install PostgreSQL 15+ and Node.js 20+

# 2. Clone repository
git clone <repository-url>
cd hospital-platform

# 3. Setup Backend
cd backend
npm install
# Create .env file with: DATABASE_URL="postgresql://user:password@localhost:5432/hospital_db"
npx prisma db push
npx prisma db seed
npm run start:dev

# 4. In new terminal: Setup Frontend
cd frontend
npm install
npm run dev

# 5. In another terminal: Setup Admin
cd admin
npm install
npm run dev

# Access:
# Frontend: http://localhost:3000
# Admin:    http://localhost:3001
# Backend:  http://localhost:8000
```

## 🔐 Demo Login

```
Email:    admin@hospitaldemo.in
Password: Admin@123
```

## 📁 Project Structure

```
hospital-platform/
├── frontend/           # Public website (Next.js)
├── backend/            # API server (NestJS)
├── admin/              # Admin dashboard (Next.js)
├── database/           # Prisma schema & migrations
├── docker/             # Docker configuration
└── docs/               # Documentation
```

## 🌟 Key Features

- ✅ **Public Website**: Home, Departments, Doctors, Appointment Booking, Blog, Testimonials
- ✅ **Admin Dashboard**: Manage everything (doctors, appointments, content, settings)
- ✅ **Appointment System**: Online booking with available slots
- ✅ **Doctor Management**: Profiles, availability, specializations
- ✅ **Health Packages**: Diagnostic packages with pricing
- ✅ **Blog System**: Health articles and news
- ✅ **REST API**: Complete REST API with JWT authentication
- ✅ **Database**: PostgreSQL with Prisma ORM
- ✅ **Docker**: Ready for containerized deployment
- ✅ **Security**: JWT auth, password hashing, rate limiting

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP_GUIDE.md](./docs/SETUP_GUIDE.md) | Detailed setup instructions |
| [API_ENDPOINTS.md](./docs/API_ENDPOINTS.md) | Complete API documentation |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Deployment to AWS, DigitalOcean, Railway, etc. |
| [DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) | Database design and schema |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | System architecture overview |

## 🐳 Docker Compose Services

```
- PostgreSQL (Database)
- Redis (Cache)
- Backend API (NestJS)
- Frontend (Next.js)
- Admin Dashboard (Next.js)
- Nginx (Reverse Proxy)
```

## 🔧 Available Scripts

### Backend
```bash
npm run start:dev    # Start with watch mode
npm run build        # Build for production
npm run lint         # Run ESLint
npm test            # Run tests
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production build
npm run lint         # Run ESLint
```

### Admin
```bash
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm start            # Start production build
```

## 🌐 Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Public hospital website |
| Admin | http://localhost:3001 | Admin dashboard |
| API | http://localhost:8000 | REST API server |
| API Docs | http://localhost:8000/api/docs | Swagger documentation |
| Postgres | localhost:5432 | Database |
| Redis | localhost:6379 | Cache (optional) |

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://hospital:password@localhost:5432/hospital_db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"
PORT=8000
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Admin (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🗄️ Database Entities

- **Users**: Hospital staff, admins, patients
- **Doctors**: Medical professionals with specializations
- **Departments**: Medical departments
- **Appointments**: Patient appointment bookings
- **HealthPackages**: Diagnostic and treatment packages
- **BlogPosts**: Health articles and news
- **Testimonials**: Patient reviews
- **InsurancePartners**: Insurance company listings
- **CareerOpenings**: Job opportunities
- **SiteSettings**: Configuration and toggles

## 🚀 Deployment Options

| Platform | Guide |
|----------|-------|
| Docker Compose | See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| AWS ECS | See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| DigitalOcean | See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| Vercel (Frontend) | See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| Railway | See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) |
| Manual VPS | See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) |

## 🧪 Testing API

### Using cURL
```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hospitaldemo.in","password":"Admin@123"}'

# Get doctors
curl http://localhost:8000/api/doctors

# Book appointment
curl -X POST http://localhost:8000/api/appointments/book \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"doctorId":"...","appointmentDate":"2024-03-20","appointmentTime":"14:00"}'
```

### Using Swagger UI
Visit: http://localhost:8000/api/docs

## 📝 Features Checklist

### Public Website
- [x] Home page with hero banner
- [x] Hospital information
- [x] Department listings
- [x] Doctor profiles
- [x] Appointment booking
- [x] Health packages
- [x] Blog system
- [x] Testimonials
- [x] Insurance partners
- [x] Contact form
- [x] Career opportunities

### Admin Dashboard
- [x] Login authentication
- [x] Dashboard with metrics
- [x] Doctor management
- [x] Department management
- [x] Appointment management
- [x] Blog post management
- [x] Testimonial moderation
- [x] Package management
- [x] Site settings
- [x] User management
- [x] Feature toggles

### Backend API
- [x] User authentication (JWT)
- [x] Role-based access control
- [x] Doctor endpoints
- [x] Department endpoints
- [x] Appointment endpoints
- [x] Blog endpoints
- [x] Package endpoints
- [x] Testimonial endpoints
- [x] Insurance partner endpoints
- [x] Career endpoints
- [x] Settings endpoints
- [x] Rate limiting
- [x] Error handling
- [x] Request validation

### Database
- [x] User management
- [x] Doctor profiles
- [x] Appointment system
- [x] Availability slots
- [x] Blog system
- [x] Testimonials
- [x] Packages
- [x] Insurance partners
- [x] Careers
- [x] Site settings
- [x] Proper indexing
- [x] Foreign key constraints

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Admin**: Next.js 16, React 19, TypeScript, Tailwind CSS, Recharts
- **Backend**: NestJS, Node.js, TypeScript, Express
- **Database**: PostgreSQL 15, Prisma ORM
- **Authentication**: JWT, Passport.js
- **Deployment**: Docker, Docker Compose, Nginx
- **Documentation**: Swagger/OpenAPI

## 📞 Support

- **Documentation**: See `/docs` folder
- **Issues**: Check GitHub Issues
- **Email**: support@helioshospital.in

## 📄 License

MIT License - See LICENSE file for details

## ✅ Status

✅ **Production Ready** - All core features implemented and tested

---

## Next Steps

1. **Read Setup Guide**: [docs/SETUP_GUIDE.md](./docs/SETUP_GUIDE.md)
2. **Explore Architecture**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
3. **Check API Docs**: [docs/API_ENDPOINTS.md](./docs/API_ENDPOINTS.md)
4. **Deploy**: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)

**Happy coding!** 🎉
