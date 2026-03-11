# Hospital Platform - Backend Content Editing Guide

## 📋 Overview
This guide shows you how to edit content in the backend and have those changes reflected in the frontend application.

### Current Architecture:
- **Backend**: NestJS API server with in-memory mock data (PostgreSQL database available)
- **Frontend**: Next.js static pages with some hardcoded data
- **Data Flow**: Frontend fetches data from Backend API endpoints

---

## 🎯 Step-by-Step Guide to Edit Backend Content

### ✅ **Step 1: Understand the Data Structure**

The backend has two ways to manage data:

#### Option A: Using Mock Data (In-Memory)
- **File**: `backend/src/mock-data.ts`
- **Use Case**: Quick testing, no database required
- **Data Types**: Hospital info, departments, doctors, users, blogs, testimonials, etc.

#### Option B: Using PostgreSQL Database
- **Files**: `backend/prisma/schema.prisma` (schema) and `backend/prisma/seed.ts` (mock data)
- **Use Case**: Production-ready persistence
- **Current Status**: Already set up and seeded with test data

---

### ✅ **Step 2: Edit Backend Content (Choose One Method)**

#### **METHOD A: Edit Mock Data (Fast - No Database Needed)**

##### 2A.1 Edit Hospital Information
```bash
# File: backend/src/mock-data.ts
# Search for: hospitalInfo object

EDIT THESE FIELDS:
- name: 'Apollo Hospital' → Your hospital name
- address: '123 Medical Complex, New Delhi' → Your address
- phone: '+91-11-4141-2000' → Your phone
- email: 'info@apollohospital.com' → Your email
- description: '...' → Your hospital description
- foundedYear: 2010 → Your founding year
- totalBeds: 500 → Your bed count
- totalDoctors: 200 → Your doctor count
- totalStaff: 1000 → Your staff count
```

##### 2A.2 Edit Departments
```bash
# File: backend/src/mock-data.ts
# Search for: departments array

Example - Add new department:
{
  id: 'dept-6',
  name: 'Dermatology',
  slug: 'dermatology',
  description: 'Skin care and treatment',
  doctorCount: 8,
  phone: '+91-11-4141-2600',
}

Or Edit existing:
- Change name, description, doctorCount, phone
```

##### 2A.3 Edit Doctors
```bash
# File: backend/src/mock-data.ts
# Search for: doctors array

EDIT THESE FIELDS FOR EACH DOCTOR:
- name: 'Dr. Rajesh Kumar' → Doctor name
- specialization: 'Cardiology' → Specialty
- qualifications: ['MBBS', 'MD Cardiology'] → Credentials
- experience: 15 → Years of experience
- consultationFee: 50000 → Fee in paisa (50000 = ₹500)
- bio: '...' → Doctor biography
- imageUrl: '...' → Doctor image URL
```

##### 2A.4 Edit Blog Posts
```bash
# File: backend/src/mock-data.ts
# Search for: blogPosts array

EDIT THESE FIELDS:
- title: 'Understanding Heart Disease' → Article title
- slug: 'understanding-heart-disease' → URL slug
- content: '...' → Full article content
- category: 'Health' → Category
- author: 'Dr. Rajesh Kumar' → Author name
- description: '...' → Short description
- tags: [...] → Article tags
```

##### 2A.5 Edit Testimonials
```bash
# File: backend/src/mock-data.ts
# Search for: testimonials array

EDIT THESE FIELDS:
- name: 'Arjun Singh' → Patient name
- feedback: '...' → Patient feedback
- rating: 5 → Rating (1-5)
- departmentId: 'dept-1' → Associated department
```

##### 2A.6 Edit Insurance Partners
```bash
# File: backend/src/mock-data.ts
# Search for: insurancePartners array

EDIT THESE FIELDS:
- name: 'ICICI Lombard' → Insurance company name
- logo: '...' → Company logo URL
- website: '...' → Company website
```

---

#### **METHOD B: Edit Database Data (Persistent - Recommended)**

##### 2B.1 Update via Database Seed File
```bash
# File: backend/prisma/seed.ts

1. Locate the data you want to edit
2. Modify values in the seed function
3. Run: cd backend && npx prisma db push
4. Run: cd backend && npx ts-node prisma/seed.ts
```

##### 2B.2 Edit Directly in Database
```bash
# Use PostgreSQL client
psql postgresql://hospital:password@localhost:5432/hospital_db

# Example queries:
UPDATE "HospitalInfo" SET name = 'Your Hospital Name' WHERE id = '...';
UPDATE "Doctor" SET consultationFee = 60000 WHERE id = 'doc-1';
UPDATE "BlogPost" SET title = 'New Title' WHERE id = 'blog-1';
```

---

### ✅ **Step 3: Rebuild and Restart Backend**

After editing mock data or database:

```bash
cd backend

# Option 1: Quick restart (changes in mock-data.ts)
npm run start:dev        # Auto-reload with changes

# Option 2: Production restart (after database changes)
npm run build
npm run start:prod
```

The backend will automatically detect changes and restart.

---

### ✅ **Step 4: Update Frontend to Fetch from Backend**

**Current Issue**: Some frontend pages have hardcoded data instead of fetching from API.

#### **Option 1: Update Hardcoded Data (Quick)**

Edit frontend pages directly:

```bash
# File: frontend/src/app/doctors/page.tsx

Replace the hardcoded doctors array with fetched data:

'use client';

import { useEffect, useState } from 'react';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* ... rest of component ... */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          /* Map doctor data */
        ))}
      </div>
    </div>
  );
}
```

#### **Option 2: Create API Client Utility (Recommended)**

Create a reusable API client:

```bash
# File: frontend/src/lib/api.ts (NEW FILE)

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const fetchHospital = () =>
  fetch(`${API_URL}/api/hospital`).then(r => r.json());

export const fetchDoctors = () =>
  fetch(`${API_URL}/api/doctors`).then(r => r.json());

export const fetchDepartments = () =>
  fetch(`${API_URL}/api/departments`).then(r => r.json());

export const fetchBlogPosts = () =>
  fetch(`${API_URL}/api/blog`).then(r => r.json());

export const fetchTestimonials = () =>
  fetch(`${API_URL}/api/testimonials`).then(r => r.json());

export const fetchPackages = () =>
  fetch(`${API_URL}/api/health-packages`).then(r => r.json());

export const fetchInsurance = () =>
  fetch(`${API_URL}/api/insurance`).then(r => r.json());
```

Then use in components:

```bash
# File: frontend/src/app/doctors/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { fetchDoctors } from '@/lib/api';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors().then(data => {
      setDoctors(Array.isArray(data) ? data : []);
    });
  }, []);

  return (
    // ... render doctors ...
  );
}
```

---

### ✅ **Step 5: Verify Changes in Frontend**

After making backend changes:

```bash
# 1. Ensure backend is running
curl http://localhost:8000/api/doctors

# 2. Frontend automatically fetches updated data
# Navigate to: http://localhost:3000/doctors

# 3. You should see the updated content
```

---

## 📊 Quick Edit Workflow

### **Scenario 1: Change Hospital Name**
```
1. Edit: backend/src/mock-data.ts
2. Find: hospitalInfo.name
3. Change: 'Apollo Hospital' → 'Your Hospital'
4. Save file
5. Backend auto-reloads (if running with npm run start:dev)
6. Frontend page refresh shows new name
```

### **Scenario 2: Add a New Doctor**
```
1. Edit: backend/src/mock-data.ts
2. Find: doctors array
3. Add: New doctor object with all required fields
4. Save file
5. API endpoint: GET /api/doctors returns new doctor
6. Frontend fetches and displays new doctor
```

### **Scenario 3: Edit Department Description**
```
1. Edit: backend/src/mock-data.ts
2. Find: departments array
3. Find: Department by id
4. Change: description field
5. Save file
6. API endpoint: GET /api/departments returns updated data
7. Frontend page refresh shows new description
```

---

## 🔄 Data Flow Architecture

```
┌──────────────────────────────────┐
│  Backend (NestJS)                │
│  ├─ Mock Data (In-Memory)        │
│  │  └─ mock-data.ts              │
│  ├─ OR Database (PostgreSQL)     │
│  │  └─ seed.ts                   │
│  └─ API Endpoints /api/*         │
└──────────────────────────────────┘
              ↓ (HTTP fetch)
┌──────────────────────────────────┐
│  Frontend (Next.js)              │
│  ├─ pages (fetch from backend)   │
│  ├─ components (render data)     │
│  └─ displayed to users           │
└──────────────────────────────────┘
```

---

## 📝 Available API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/hospital` | GET | Hospital information |
| `/api/departments` | GET | List all departments |
| `/api/doctors` | GET | List all doctors |
| `/api/blog` | GET | List blog posts |
| `/api/testimonials` | GET | List patient testimonials |
| `/api/insurance` | GET | List insurance partners |
| `/api/health-packages` | GET | List health packages |
| `/api/auth/login` | POST | Admin login |
| `/api/auth/register` | POST | User registration |

---

## ✨ Best Practices

### ✅ DO:
- Edit mock-data.ts for quick testing
- Keep consistent data formats (IDs, dates, etc.)
- Use meaningful descriptions
- Test API responses with curl before changing frontend
- Keep frontend and backend in sync

### ❌ DON'T:
- Manually edit database files without using migrations
- Change API response structure without updating frontend
- Use hardcoded data in frontend components
- Leave incomplete or inconsistent data

---

## 🚀 Next Steps

1. **Identify what content to edit**: Hospital info, doctors, departments, blog, testimonials, packages
2. **Choose editing method**: Mock data (fast) or Database (persistent)
3. **Make edits** using the detailed steps above
4. **Verify changes** by calling API endpoints
5. **Update frontend** to fetch from backend APIs if not already done
6. **Test** by refreshing frontend pages

---

## 📞 Need Help?

- **Backend running?** Check: `curl http://localhost:8000/health`
- **Can't see changes?** Restart backend: `npm run start:dev` in `backend/`
- **Frontend not updating?** Clear cache: `Ctrl+Shift+R` or hard refresh browser
- **API 404 error?** Check endpoint path matches controller route prefix

