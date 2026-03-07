# Setup Guide

## Prerequisites

- **Node.js**: 20.0.0 or higher
- **npm/yarn**: Latest version
- **PostgreSQL**: 15.0 or higher
- **Git**: Latest version
- **Docker & Docker Compose** (optional, for containerized setup)

## Installation Steps

### Option 1: Using Docker Compose (Recommended)

This is the quickest way to get the entire stack running locally.

#### 1. Clone Repository

```bash
git clone <repository-url>
cd hospital-platform
```

#### 2. Copy Environment Files

```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.local.example frontend/.env.local

# Admin
cp admin/.env.local.example admin/.env.local
```

#### 3. Update Environment Variables

Edit `backend/.env`:
```env
DATABASE_URL="postgresql://hospital:password@postgres:5432/hospital_db"
JWT_SECRET="your-secret-key-minimum-32-characters"
JWT_EXPIRES_IN="24h"
PORT=8000
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Edit `admin/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

#### 4. Start Services

```bash
# Start all services in background
docker-compose up -d

# Or run in foreground to see logs
docker-compose up

# Check service status
docker-compose ps
```

#### 5. Run Database Migrations

```bash
# Wait for PostgreSQL to be ready (about 10 seconds)
docker-compose exec backend npx prisma db push

# Seed sample data
docker-compose exec backend npx prisma db seed
```

#### 6. Access Services

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **API Docs** (Swagger): http://localhost:8000/api/docs

### Option 2: Manual Setup (Development)

For a more developer-friendly setup with hot reloading.

#### 1. Clone Repository

```bash
git clone <repository-url>
cd hospital-platform
```

#### 2. Setup PostgreSQL

##### On macOS (using Homebrew)

```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database and user
createdb hospital_db
psql hospital_db

# In psql prompt:
CREATE USER hospital WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital;
ALTER ROLE hospital CREATEDB;
\q
```

##### On Ubuntu/Linux

```bash
# Install PostgreSQL
sudo apt-get install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql

# Create database and user
sudo -u postgres createdb hospital_db
sudo -u postgres psql

# In psql prompt:
CREATE USER hospital WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital;
ALTER ROLE hospital CREATEDB;
\q
```

##### On Windows (Docker)

```bash
# Run PostgreSQL in Docker
docker run --name hospital-postgres \
  -e POSTGRES_USER=hospital \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=hospital_db \
  -p 5432:5432 \
  -d postgres:15-alpine
```

#### 3. Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your database URL
# DATABASE_URL="postgresql://hospital:password@localhost:5432/hospital_db"

# Install dependencies
npm install

# Run database migrations
npx prisma db push

# Seed sample data
npx prisma db seed

# Start development server
npm run start:dev

# Server will be available at http://localhost:8000
```

**Available Scripts:**
```bash
npm run start:dev    # Start with watch mode
npm run build        # Build for production
npm run start        # Start production build
npm run lint         # Run ESLint
npm test            # Run tests
npm run test:cov    # Run tests with coverage
```

#### 4. Setup Frontend

In a new terminal:

```bash
cd frontend

# Copy environment file
cp .env.local.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev

# Frontend will be available at http://localhost:3000
```

**Available Scripts:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

#### 5. Setup Admin Dashboard

In a new terminal:

```bash
cd admin

# Copy environment file
cp .env.local.example .env.local

# Install dependencies
npm install

# Start development server
npm run dev

# Admin will be available at http://localhost:3001
```

**Available Scripts:**
```bash
npm run dev          # Start development server (port 3001)
npm run build        # Build for production
npm start            # Start production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

#### 6. Access Services

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs

---

## Test Credentials

Use these credentials to test the application:

### Admin Login
```
Email: admin@hospitaldemo.in
Password: Admin@123
```

### Sample Doctor Login
```
Email: dr.rajesh.kumar@helioshospital.in
Password: Doctor@123
```

### Sample Patient Login
```
Email: patient1@example.com
Password: Admin@123
```

---

## Database Schema Visualization

To see the database schema visually:

```bash
cd database

# Generate Prisma visualization
npx prisma studio

# Opens http://localhost:5555 with interactive database client
```

---

## Common Setup Issues

### Port Already in Use

If a port is already in use:

#### macOS/Linux:
```bash
# Find process using port
lsof -i :3000           # for port 3000
lsof -i :8000           # for port 8000
lsof -i :3001           # for port 3001

# Kill the process
kill -9 <PID>
```

#### Windows (PowerShell):
```powershell
# Find process using port
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Kill the process
Stop-Process -Id <PID> -Force
```

### PostgreSQL Connection Refused

Check if PostgreSQL is running:

```bash
# macOS
brew services list

# Linux
sudo systemctl status postgresql

# Test connection
psql -U hospital -d hospital_db -c "SELECT 1;"
```

### Prisma Database Push Failed

Clear and resync:

```bash
cd database

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# Or migrate step by step
npx prisma migrate dev --name init
```

### Node Modules Issues

Clear and reinstall:

```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Clear npm cache
npm cache clean --force
```

### Docker Service Won't Start

```bash
# Check logs
docker-compose logs backend
docker-compose logs postgres

# Remove containers and try again
docker-compose down
docker system prune
docker-compose up
```

---

## IDE Setup

### VS Code Recommended Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "prisma.prisma",
    "mhutchie.git-graph",
    "eamodio.gitlens",
    "ms-azuretools.vscode-docker",
    "thunder-client.thunder-client"
  ]
}
```

Install from VS Code Extensions:
1. Go to Extensions (Ctrl+Shift+X)
2. Install each recommended extension

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## Git Setup

### Initialize Git Hooks

```bash
# Install husky (optional, for pre-commit hooks)
npm install husky --save-dev
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npm run lint"
```

### Commit Message Convention

Follow conventional commits:

```
feat: Add new doctor profile feature
fix: Fix appointment booking bug
docs: Update API documentation
style: Format code
refactor: Restructure database module
test: Add doctor service tests
chore: Update dependencies
```

---

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write code
- Add tests
- Update documentation

### 3. Format and Lint

```bash
cd backend
npm run lint
npm run format

cd ../frontend
npm run lint
npm run format
```

### 4. Run Tests

```bash
npm test
npm run test:watch
npm run test:cov
```

### 5. Commit Changes

```bash
git add .
git commit -m "feat: Add new doctor profile feature"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

---

## Database Management

### View Current Database

```bash
cd database
npx prisma studio
```

### Create Migration

```bash
npx prisma migrate dev --name add_new_field
```

### Reset Database

```bash
# WARNING: This deletes all data
npx prisma db push --force-reset
npx prisma db seed
```

### View Database Logs

```bash
# See all Prisma operations
export DEBUG=prisma:*
npm run start:dev
```

---

## Testing

### Run Unit Tests

```bash
cd backend
npm test
```

### Watch Mode

```bash
npm run test:watch
```

### Coverage Report

```bash
npm run test:cov
```

### E2E Tests

```bash
npm run test:e2e
```

---

## API Testing

### Using cURL

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hospitaldemo.in","password":"Admin@123"}'

# Get doctors
curl http://localhost:8000/api/doctors

# Get appointments (with auth)
curl http://localhost:8000/api/appointments \
  -H "Authorization: Bearer <token>"
```

### Using Thunder Client (VS Code Extension)

1. Install Thunder Client extension
2. Create new request
3. Set method and URL
4. Add headers/body as needed
5. Send request

### Using Postman

1. Download Postman
2. Import API collection (if available)
3. Set up environment variables
4. Test endpoints

---

## Performance Tips

1. **Enable Caching**

Configure Redis:
```env
REDIS_URL=redis://localhost:6379
```

2. **Database Optimization**

Use Prisma Studio to analyze queries:
```bash
npx prisma studio
```

3. **Code Splitting**

Next.js automatically code-splits. Check bundle size:
```bash
npm run build && npm run analyze
```

4. **Image Optimization**

Next.js Image component automatically optimizes:
```jsx
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

---

## Troubleshooting Development Issues

### Hot Reload Not Working

Restart development server:
```bash
# Kill process
Ctrl+C

# Restart
npm run start:dev
```

### TypeScript Errors Not Showing

Rebuild TypeScript:
```bash
npx tsc --noEmit
```

### Module Not Found Errors

Clear cache:
```bash
rm -rf node_modules/.cache
npm run build
```

### Build Fails in Docker

Check Docker logs:
```bash
docker-compose logs backend
docker-compose logs frontend
```

---

## Next Steps

1. **Read Documentation**
   - API Endpoints: [API_ENDPOINTS.md](./API_ENDPOINTS.md)
   - Database Schema: [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)
   - Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)

2. **Explore the Code**
   - Backend modules in `backend/src/modules/`
   - Frontend pages in `frontend/src/app/`
   - Admin dashboard in `admin/src/app/`

3. **Start Contributing**
   - Fix issues
   - Add features
   - Improve documentation

4. **Deploy**
   - Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

---

## Support & Help

- **Issues**: Check GitHub Issues
- **Documentation**: See docs/ folder
- **Email**: support@helioshospital.in

---

Happy coding! 🚀
