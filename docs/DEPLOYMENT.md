# Deployment Guide

## Prerequisites

- Git
- Docker & Docker Compose
- Node.js 20+ (for manual deployment)
- PostgreSQL 15+ (for manual deployment)
- Domain name (for production)
- SSL certificate (for HTTPS)

---

## Option 1: Docker Compose (Recommended for Quick Start)

### Quick Start

```bash
# Clone repository
git clone <repository-url>
cd hospital-platform

# Create environment files
cp docker/.env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
cp admin/.env.local.example admin/.env.local

# Start all services
docker-compose up -d

# Run database migrations and seed
docker-compose exec backend npx prisma db push
docker-compose exec backend npx prisma db seed

# Check status
docker-compose ps
```

### Access Services

- **Frontend**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3001
- **API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/docs

### Stop Services

```bash
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v
```

---

## Option 2: AWS ECS Deployment

### Prerequisites

- AWS Account
- ECR Repository created
- ECS Cluster created
- RDS PostgreSQL instance
- Application Load Balancer

### Steps

1. **Build and Push Docker Images**

```bash
# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build backend image
docker build -f docker/Dockerfile.backend -t <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-backend:latest .
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-backend:latest

# Build frontend image
docker build -f docker/Dockerfile.frontend -t <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-frontend:latest .
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-frontend:latest

# Build admin image
docker build -f docker/Dockerfile.admin -t <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-admin:latest .
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/hospital-admin:latest
```

2. **Create ECS Task Definitions**

Create task definitions for each service with appropriate CPU, memory, environment variables, and port mappings.

3. **Create ECS Services**

Create services in your ECS cluster for each container:
- Backend service (port 8000)
- Frontend service (port 3000)
- Admin service (port 3001)

4. **Configure Application Load Balancer**

- Create target groups for each service
- Configure listener rules for path-based routing
- Add health check configurations

5. **Configure RDS PostgreSQL**

- Create a security group allowing inbound traffic from ECS tasks
- Create the database and update connection strings in environment variables

6. **Run Database Migrations**

```bash
# Use ECS Exec to run migrations
aws ecs execute-command \
  --cluster hospital-cluster \
  --task <backend-task-id> \
  --container hospital_backend \
  --interactive \
  --command "npx prisma db push && npx prisma db seed"
```

---

## Option 3: DigitalOcean App Platform

### Steps

1. **Fork Repository**

Fork the repository to your GitHub account.

2. **Connect to DigitalOcean**

- Log in to DigitalOcean
- Click "Apps" in the sidebar
- Click "Create Apps"
- Select GitHub and authorize DigitalOcean

3. **Configure App Spec**

DigitalOcean will detect the repository. Configure the app spec as follows:

```yaml
name: hospital-platform
services:
  - name: postgres
    engine: POSTGRESQL
    version: "15"
    production: true
    envs:
      - key: POSTGRES_DB
        value: hospital_db
      - key: POSTGRES_USER
        value: hospital
      - key: POSTGRES_PASSWORD
        scope: RUN_AND_BUILD_TIME
        value: ${DB_PASSWORD}

  - name: backend
    github:
      branch: main
      repo: your-username/hospital-platform
    build_command: cd backend && npm install && npm run build
    run_command: cd backend && npx prisma db push && npm start
    envs:
      - key: PORT
        value: "8000"
      - key: DATABASE_URL
        value: ${db.username}://${db.password}@${db.host}:${db.port}/${db.database}
      - key: JWT_SECRET
        scope: RUN_AND_BUILD_TIME
        value: ${JWT_SECRET}
    http_port: 8000

  - name: frontend
    github:
      branch: main
      repo: your-username/hospital-platform
    build_command: cd frontend && npm install && npm run build
    envs:
      - key: NEXT_PUBLIC_API_URL
        value: https://api.yourdomain.com
    http_port: 3000

  - name: admin
    github:
      branch: main
      repo: your-username/hospital-platform
    build_command: cd admin && npm install && npm run build
    envs:
      - key: NEXT_PUBLIC_API_URL
        value: https://api.yourdomain.com
    http_port: 3001
```

4. **Deploy**

- Review the app spec
- Click "Create Resources"
- DigitalOcean will automatically deploy and configure DNS

---

## Option 4: Vercel (Frontend Only)

### Steps

1. **Create Vercel Account**

Go to https://vercel.com and sign up

2. **Deploy Frontend**

```bash
npm i -g vercel
cd frontend
vercel
```

Follow the prompts to connect your GitHub repository.

3. **Deploy Admin Dashboard**

```bash
cd admin
vercel
```

4. **Configure Environment Variables**

In Vercel project settings:

```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

---

## Option 5: Railway

### Steps

1. **Create Railway Account**

Go to https://railway.app

2. **Create New Project**

- Connect your GitHub repository
- Select the hospital-platform repository

3. **Add Services**

- PostgreSQL (managed database)
- Node.js service for backend
- Node.js service for frontend
- Node.js service for admin

4. **Configure Environment Variables**

In Railway project settings, configure:

```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=https://your-backend-url
```

5. **Deploy**

Railway automatically deploys on every push to main branch.

---

## Option 6: Manual Deployment (VPS)

### Prerequisites

- VPS with Ubuntu 20.04+
- SSH access
- Domain name with DNS configured

### Steps

1. **Setup Server**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2

# Install SSL (Let's Encrypt)
sudo apt install -y certbot python3-certbot-nginx
```

2. **Clone Repository**

```bash
cd /var/www
sudo git clone <repository-url> hospital-platform
cd hospital-platform
sudo chown -R $USER:$USER .
```

3. **Setup PostgreSQL**

```bash
sudo -u postgres psql

CREATE DATABASE hospital_db;
CREATE USER hospital WITH PASSWORD 'your-password';
ALTER ROLE hospital SET client_encoding TO 'utf8';
ALTER ROLE hospital SET default_transaction_isolation TO 'read committed';
ALTER ROLE hospital SET default_transaction_deferrable TO on;
ALTER ROLE hospital SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE hospital_db TO hospital;
\q
```

4. **Deploy Backend**

```bash
cd backend
npm install
npm run build
npx prisma db push
npx prisma db seed

# Start with PM2
pm2 start dist/main.js --name hospital-backend
pm2 save
pm2 startup
```

5. **Deploy Frontend**

```bash
cd ../frontend
npm install
npm run build

# Start with PM2
pm2 start npm --name hospital-frontend -- start
pm2 save
```

6. **Deploy Admin**

```bash
cd ../admin
npm install
npm run build

# Start with PM2
pm2 start npm --name hospital-admin -- start
pm2 save
```

7. **Configure Nginx**

Create `/etc/nginx/sites-available/hospital`:

```nginx
upstream backend {
    server localhost:8000;
}

upstream frontend {
    server localhost:3000;
}

upstream admin {
    server localhost:3001;
}

server {
    listen 80;
    server_name helioshospital.in www.helioshospital.in;

    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name admin.helioshospital.in;

    location / {
        proxy_pass http://admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.helioshospital.in;

    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/hospital /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Enable HTTPS**

```bash
sudo certbot --nginx -d helioshospital.in -d www.helioshospital.in -d admin.helioshospital.in -d api.helioshospital.in
```

---

## Monitoring and Maintenance

### Health Checks

```bash
# Check service status
curl http://localhost:8000/health
curl http://localhost:3000
curl http://localhost:3001
```

### View Logs

```bash
# Docker Compose
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f admin

# PM2
pm2 logs hospital-backend
pm2 logs hospital-frontend
pm2 logs hospital-admin
```

### Database Backups

```bash
# Backup PostgreSQL
pg_dump hospital_db > backup-$(date +%s).sql

# Restore from backup
psql hospital_db < backup-timestamp.sql
```

### Update Application

```bash
# Docker Compose
git pull
docker-compose build
docker-compose up -d

# Manual
git pull
cd backend && npm install && npm run build && npm start
cd ../frontend && npm install && npm run build
cd ../admin && npm install && npm run build
```

---

## Troubleshooting

### Database Connection Issues

Check environment variables and port accessibility:
```bash
psql -h localhost -U hospital -d hospital_db -c "SELECT 1;"
```

### API Not Responding

Check backend service status and logs:
```bash
docker-compose logs backend
# or
pm2 logs hospital-backend
```

### Frontend Not Building

Clear node_modules and rebuild:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use

```bash
# Find process using port
lsof -i :3000
# Kill process
kill -9 <PID>
```

---

## Production Checklist

- [ ] Use strong JWT_SECRET (minimum 32 characters)
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Set appropriate rate limits
- [ ] Enable database backups
- [ ] Monitor application logs
- [ ] Setup error tracking (Sentry, etc.)
- [ ] Configure CDN for static assets
- [ ] Enable Redis caching  
- [ ] Setup monitoring and alerts
- [ ] Configure health checks
- [ ] Test disaster recovery

---

## Performance Optimization

1. **Enable Caching**

Configure Redis for caching:
```
REDIS_URL=redis://localhost:6379
```

2. **Database Optimization**

- Add indexes on frequently queried columns
- Use query profiling to identify slow queries
- Configure connection pooling

3. **CDN Setup**

- Use CloudFlare or AWS CloudFront
- Configure cache headers for static assets
- Enable compression

4. **Monitoring**

- Setup Application Performance Monitoring (APM)
- Monitor database query performance
- Track API response times

---

## Security Checklist

- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Use HTTPS everywhere
- [ ] Implement rate limiting
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Enable CORS protection
- [ ] Implement CSRF protection
- [ ] Secure password hashing
- [ ] Implement intrusion detection

---

## Support

For deployment issues, contact:
- **Email**: devops@helioshospital.in
- **Documentation**: See SETUP_GUIDE.md
- **Issues**: GitHub Issues page
