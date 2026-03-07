# Hospital Management Platform

A production-ready, modern multispecialty hospital website system designed for Indian healthcare providers. This platform includes a public-facing website, patient appointment system, doctor management, health packages, blog system, and a comprehensive admin dashboard.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        PUBLIC WEBSITE                            │
│                    (Next.js Frontend)                            │
│  - Hospital Homepage                                             │
│  - Department Listings                                           │
│  - Doctor Profiles                                               │
│  - Appointment Booking                                           │
│  - Blog & Health Articles                                        │
│  - Testimonials & Insurance Partnerships                         │
└────────────────────────┬────────────────────────────────────────┘
                         │ REST API
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SERVICES                            │
│                   (NestJS API Server)                            │
│  - Authentication & Authorization (JWT)                         │
│  - Doctor Management                                             │
│  - Department Management                                         │
│  - Appointment Booking System                                    │
│  - Blog Post Management                                          │
│  - Testimonials & Reviews                                        │
│  - Health Packages Management                                    │
│  - Settings & Site Configuration                                │
└────────────────────────┬────────────────────────────────────────┘
                         │ ORM
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER                                │
│                  (PostgreSQL + Prisma)                           │
│  - Users, Roles, Permissions                                     │
│  - Doctors & Departments                                         │
│  - Appointments & Slots                                          │
│  - Blog Posts & Categories                                       │
│  - Testimonials & Insurance Partners                             │
│  - Site Settings & Configurations                                │
└─────────────────────────────────────────────────────────────────┘

                    SEPARATE DEPLOYMENT
                           │
┌────────────────────────────────────────────────────────────────┐
│                   ADMIN DASHBOARD                               │
│                   (Next.js Admin UI)                            │
│  - Dashboard Analytics                                          │
│  - Content Management                                           │
│  - Appointment Management                                       │
│  - Doctor & Department Management                               │
│  - Blog & Testimonial Management                                │
│  - Site Settings & Feature Toggles                              │
└────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
hospital-platform/
├── frontend/                          # Public-facing Next.js website
│   ├── src/
│   │   ├── app/                      # Next.js App Router
│   │   │   ├── (marketing)/          # Marketing pages
│   │   │   │   ├── page.tsx          # Home
│   │   │   │   ├── about/
│   │   │   │   ├── departments/
│   │   │   │   ├── doctors/
│   │   │   │   ├── book-appointment/
│   │   │   │   ├── health-packages/
│   │   │   │   ├── testimonials/
│   │   │   │   ├── blog/
│   │   │   │   ├── careers/
│   │   │   │   ├── insurance/
│   │   │   │   ├── contact/
│   │   │   │   └── emergency/
│   │   │   ├── api/                 # Frontend API routes
│   │   ├── components/
│   │   │   ├── layout/              # Header, Footer, Nav
│   │   │   ├── sections/            # Page sections
│   │   │   ├── ui/                  # ShadCN components
│   │   │   └── forms/               # Appointment, Contact forms
│   │   ├── lib/
│   │   │   ├── api.ts               # API client
│   │   │   ├── constants.ts
│   │   │   └── utils.ts
│   │   ├── hooks/                   # Custom React hooks
│   │   └── types/                   # TypeScript types
│   ├── public/                       # Static assets
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.ts
│
├── backend/                           # NestJS API Server
│   ├── src/
│   │   ├── main.ts                  # Entry point
│   │   ├── app.module.ts             # Root module
│   │   ├── common/
│   │   │   ├── decorators/
│   │   │   ├── filters/             # Exception filters
│   │   │   ├── guards/              # Auth guards
│   │   │   ├── interceptors/        # Response interceptors
│   │   │   └── pipes/               # Validation pipes
│   │   ├── config/                  # Configuration
│   │   ├── database/                # Prisma setup
│   │   ├── modules/
│   │   │   ├── auth/                # Authentication
│   │   │   ├── users/               # User management
│   │   │   ├── doctors/             # Doctor CRUD
│   │   │   ├── departments/         # Department CRUD
│   │   │   ├── appointments/        # Appointment system
│   │   │   ├── blog/                # Blog posts
│   │   │   ├── testimonials/        # Patient testimonials
│   │   │   ├── packages/            # Health packages
│   │   │   ├── insurance/           # Insurance partners
│   │   │   ├── careers/             # Career listings
│   │   │   ├── settings/            # Site settings
│   │   │   └── admin/               # Admin-specific routes
│   │   ├── prisma/                  # ORM schema
│   │   └── utils/                   # Utilities
│   ├── package.json
│   ├── jest.config.js
│   ├── tsconfig.json
│   └── .env.example
│
├── admin/                            # Next.js Admin Dashboard
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   └── forgot-password/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx         # Dashboard home
│   │   │   │   ├── doctors/         # Doctor management
│   │   │   │   ├── departments/     # Department management
│   │   │   │   ├── appointments/    # Appointment management
│   │   │   │   ├── blog/            # Blog management
│   │   │   │   ├── testimonials/    # Testimonial management
│   │   │   │   ├── packages/        # Package management
│   │   │   │   ├── insurance/       # Insurance management
│   │   │   │   ├── careers/         # Career management
│   │   │   │   ├── settings/        # Site settings
│   │   │   │   └── users/           # User management
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── tables/              # Data tables
│   │   │   ├── forms/               # CRUD forms
│   │   │   ├── charts/              # Analytics charts
│   │   │   └── ui/
│   │   ├── lib/
│   │   │   ├── api.ts               # API client
│   │   │   └── constants.ts
│   │   ├── hooks/
│   │   ├── types/
│   │   └── context/                 # Auth context
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── database/                         # Database schemas & migrations
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   ├── migrations/              # Schema migrations
│   │   └── seed.ts                  # Seed data script
│   └── README.md
│
├── docker/                           # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── Dockerfile.admin
│   ├── docker-compose.yml
│   ├── nginx.conf
│   └── .env.example
│
├── docs/                             # Documentation
│   ├── ARCHITECTURE.md
│   ├── API_ENDPOINTS.md
│   ├── DATABASE_SCHEMA.md
│   ├── SETUP_GUIDE.md
│   ├── DEPLOYMENT.md
│   └── MAINTENANCE.md
│
├── .gitignore
├── docker-compose.override.yml       # Local development override
└── QUICK_START.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- PostgreSQL 15+
- Git

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd hospital-platform

# Option 1: Using Docker Compose (Recommended)
docker-compose up -d

# Option 2: Manual Setup
# 1. Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd admin && npm install && cd ..

# 2. Setup database
cd database
npm install
npx prisma db push
npx prisma db seed
cd ..

# 3. Start services
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend
cd frontend && npm run dev

# Terminal 3 - Admin
cd admin && npm run dev
```

### Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Public hospital website |
| Backend | http://localhost:8000 | REST API server |
| Admin Dashboard | http://localhost:3001 | Admin panel |
| API Docs | http://localhost:8000/api/docs | Swagger documentation |

### Demo Login

```
Email: admin@hospitaldemo.in
Password: Admin@123
```

## 🗄️ Database Schema

The platform uses PostgreSQL with Prisma ORM. Key entities:

- **Users**: Hospital staff, admins, super admins
- **Doctors**: Medical professionals with specializations
- **Departments**: Medical departments
- **Appointments**: Patient appointments with booking system
- **Patients**: Patient information (linked to appointments)
- **DoctorAvailability**: Doctor time slots
- **HealthPackages**: Diagnostic and treatment packages
- **BlogPosts**: Health articles and news
- **Testimonials**: Patient reviews and feedback
- **InsurancePartners**: Insurance company listings
- **Careers**: Job openings
- **SiteSettings**: Configuration and feature toggles

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout

### Doctors
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor details
- `POST /api/admin/doctors` - Create doctor
- `PUT /api/admin/doctors/:id` - Update doctor
- `DELETE /api/admin/doctors/:id` - Delete doctor

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/slots/:doctorId/:date` - Get available slots
- `PUT /api/admin/appointments/:id/approve` - Approve appointment

### Blog Posts
- `GET /api/blog` - List blog posts
- `GET /api/blog/:slug` - Get blog post
- `POST /api/admin/blog` - Create blog post
- `PUT /api/admin/blog/:id` - Update blog post
- `DELETE /api/admin/blog/:id` - Delete blog post

See [API_ENDPOINTS.md](./docs/API_ENDPOINTS.md) for complete documentation.

## 🔐 Security Features

- ✅ JWT Authentication with refresh tokens
- ✅ Role-based access control (RBAC)
- ✅ Password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Rate limiting
- ✅ SQL injection prevention (via Prisma)
- ✅ XSS protection
- ✅ CSRF protection

## 📱 Responsive Design

All pages are fully responsive for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

Built with Tailwind CSS and mobile-first approach.

## 🎨 Design System

- **Color Palette**: Medical Blue primary, Teal secondary, Soft Green accent
- **Typography**: Inter (headings), Open Sans (body)
- **Components**: ShadCN UI + custom components
- **Animations**: Framer Motion

## 📊 Admin Dashboard Features

- Dashboard with key metrics
- Appointment management and approval
- Doctor and department CRUD
- Blog post and health article management
- Testimonial moderation
- Health package management
- Insurance partner management
- Career opportunities management
- Feature toggle controls
- Site settings and metadata
- User and role management
- Appointment analytics

## 🐳 Docker Deployment

Complete Docker setup with:
- Separate containers for frontend, backend, and admin
- PostgreSQL database container
- Nginx reverse proxy
- Docker Compose orchestration
- Production-ready configurations

```bash
# Production deployment
docker-compose -f docker-compose.yml up -d
```

## ☁️ Cloud Deployment

Supports deployment to:
- AWS (ECS, EC2, RDS)
- DigitalOcean (App Platform, Managed Database)
- Vercel (Frontend)
- Railway
- Render
- Azure App Service

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed guides.

## 📈 Performance

- SSR and SSG with Next.js
- Image optimization with next/image
- Code splitting and lazy loading
- Database query optimization
- Caching strategies
- CDN-ready architecture

## 🧪 Testing

- Unit tests with Jest
- Integration tests
- E2E tests with Cypress

## 📚 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [API Endpoints](./docs/API_ENDPOINTS.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Setup Guide](./docs/SETUP_GUIDE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Maintenance Guide](./docs/MAINTENANCE.md)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 📞 Support

For issues and questions, please open an issue on GitHub or contact support@hospital.in

---

**Last Updated**: March 2026  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
# hospital-management-platform
