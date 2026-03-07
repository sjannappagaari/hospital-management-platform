# Database Schema Documentation

## Overview

The Hospital Management Platform uses PostgreSQL 15 with Prisma ORM as the object-relational mapper. The database schema is designed for optimal performance with proper indexing, relationships, and constraints.

## Database URL Format

```
postgresql://username:password@host:port/database_name
```

## Core Entities

### Users & Authentication

#### User
Represents all users in the system (admins, doctors, patients, staff).

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Unique identifier (CUID) |
| email | String | UNIQUE | User email address |
| password | String | | Hashed password (bcrypt) |
| firstName | String | | User first name |
| lastName | String | | User last name |
| phone | String | OPTIONAL | Phone number |
| avatar | String | OPTIONAL | Avatar/profile image URL |
| role | UserRole | DEFAULT: PATIENT | User role (SUPER_ADMIN, ADMIN, DOCTOR, PATIENT, STAFF) |
| isActive | Boolean | DEFAULT: true | Account active status |
| createdAt | DateTime | DEFAULT: now() | Created timestamp |
| updatedAt | DateTime | | Last updated timestamp |

**Indexes**: email, role

---

## Hospital Structure

### Department
Medical departments in the hospital.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Department ID (CUID) |
| name | String | | Department name |
| slug | String | UNIQUE | URL-friendly name |
| description | String | OPTIONAL | Department description |
| icon | String | OPTIONAL | Icon name/URL |
| image | String | OPTIONAL | Department banner image |
| isActive | Boolean | DEFAULT: true | Active status |
| displayOrder | Int | DEFAULT: 0 | Display order |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- Doctors (1:N) - Department has many Doctors
- Appointments (1:N) - Department has many Appointments
- Testimonials (1:N) - Department has many Testimonials

**Indexes**: slug

---

### Doctor
Medical professionals.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Doctor ID (CUID) |
| userId | String | FK, UNIQUE | Reference to User |
| departmentId | String | FK | Reference to Department |
| specialization | String | | Doctor specialization |
| qualifications | String[] | | Array of qualifications |
| experience | Int | | Years of experience |
| bio | String | OPTIONAL | Doctor biography |
| image | String | OPTIONAL | Doctor photo URL |
| registrationNo | String | OPTIONAL | Medical registration number |
| consultationFee | Int | | Fee in paisa (₹ × 100) |
| isAvailable | Boolean | DEFAULT: true | Availability status |
| displayOrder | Int | DEFAULT: 0 | Display order |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- User (1:1) - Doctor belongs to one User
- Department (N:1) - Many Doctors in one Department
- DoctorAvailability (1:N) - Doctor has many availability slots
- Appointments (1:N) - Doctor has many Appointments

**Indexes**: departmentId

---

### DoctorAvailability
Doctor working hours and availability.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Availability ID (CUID) |
| doctorId | String | FK | Reference to Doctor |
| dayOfWeek | DayOfWeek | | Day of week (MONDAY-SUNDAY) |
| startTime | String | | Start time (HH:MM) |
| endTime | String | | End time (HH:MM) |
| slotDuration | Int | DEFAULT: 30 | Slot duration in minutes |
| isActive | Boolean | DEFAULT: true | Active status |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Unique Constraint**: (doctorId, dayOfWeek)

**Indexes**: doctorId

---

## Appointments & Patients

### Patient
Patient/visitor information.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Patient ID (CUID) |
| userId | String | FK, UNIQUE | Reference to User |
| dateOfBirth | DateTime | OPTIONAL | Date of birth |
| gender | String | OPTIONAL | Gender |
| bloodGroup | String | OPTIONAL | Blood group |
| allergies | String | OPTIONAL | Allergies information |
| medicalHistory | String | OPTIONAL | Medical history |
| emergencyContact | String | OPTIONAL | Emergency contact name |
| emergencyPhone | String | OPTIONAL | Emergency contact phone |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- User (1:1) - Patient belongs to one User
- Appointments (1:N) - Patient has many Appointments

---

### Appointment
Patient appointments with doctors.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Appointment ID (CUID) |
| patientId | String | FK | Reference to Patient |
| doctorId | String | FK | Reference to Doctor |
| departmentId | String | FK | Reference to Department |
| userId | String | FK | Reference to User (for tracking) |
| appointmentDate | DateTime | | Appointment date |
| appointmentTime | String | | Appointment time (HH:MM) |
| status | AppointmentStatus | DEFAULT: PENDING | Status (PENDING, APPROVED, REJECTED, COMPLETED, CANCELLED) |
| reason | String | OPTIONAL | Reason for visit |
| notes | String | OPTIONAL | Doctor notes |
| reminderSent | Boolean | DEFAULT: false | Reminder sent status |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- Patient (N:1) - Many Appointments for one Patient
- Doctor (N:1) - Many Appointments for one Doctor
- Department (N:1) - Many Appointments for one Department
- User (N:1) - Many Appointments by one User

**Indexes**: patientId, doctorId, departmentId, appointmentDate, status

---

## Content Management

### HealthPackage
Diagnostic and health packages.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Package ID (CUID) |
| name | String | | Package name |
| slug | String | UNIQUE | URL-friendly name |
| description | String | | Package description |
| price | Int | | Price in paisa |
| duration | String | OPTIONAL | Package duration |
| tests | String[] | | Array of test names |
| benefits | String[] | | Array of benefits |
| image | String | OPTIONAL | Package image URL |
| isActive | Boolean | DEFAULT: true | Active status |
| displayOrder | Int | DEFAULT: 0 | Display order |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Indexes**: slug

---

### BlogPost
Health articles and news.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Post ID (CUID) |
| title | String | | Blog title |
| slug | String | UNIQUE | URL-friendly slug |
| excerpt | String | | Short excerpt |
| content | String | | Full content (HTML) |
| image | String | OPTIONAL | Featured image URL |
| authorId | String | FK | Reference to User (author) |
| status | BlogPostStatus | DEFAULT: DRAFT | Status (DRAFT, PUBLISHED, ARCHIVED) |
| publishedAt | DateTime | OPTIONAL | Publication date |
| views | Int | DEFAULT: 0 | View count |
| isActive | Boolean | DEFAULT: true | Active status |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- User (N:1) - Many Posts by one User (author)

**Indexes**: slug, status, authorId, publishedAt

---

### Testimonial
Patient reviews and feedback.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Testimonial ID (CUID) |
| title | String | OPTIONAL | Testimonial title |
| content | String | | Testimonial content |
| rating | Int | | Rating (1-5 stars) |
| userId | String | FK | Reference to User |
| doctorId | String | FK, OPTIONAL | Reference to Doctor (optional) |
| departmentId | String | FK, OPTIONAL | Reference to Department (optional) |
| isApproved | Boolean | DEFAULT: false | Approval status |
| isActive | Boolean | DEFAULT: true | Active status |
| displayOrder | Int | DEFAULT: 0 | Display order |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- User (N:1) - Many Testimonials by one User
- Doctor (N:1) - Many Testimonials for one Doctor (optional)
- Department (N:1) - Many Testimonials for one Department (optional)

**Indexes**: userId, isApproved

---

### InsurancePartner
Insurance company partnerships.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Partner ID (CUID) |
| name | String | | Insurance company name |
| slug | String | UNIQUE | URL-friendly name |
| description | String | OPTIONAL | Description |
| logo | String | OPTIONAL | Logo URL |
| website | String | OPTIONAL | Website URL |
| phone | String | OPTIONAL | Contact phone |
| isActive | Boolean | DEFAULT: true | Active status |
| displayOrder | Int | DEFAULT: 0 | Display order |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Indexes**: slug

---

## Careers

### CareerOpening
Job openings.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Opening ID (CUID) |
| title | String | | Job title |
| slug | String | UNIQUE | URL-friendly name |
| department | String | | Department/team |
| description | String | | Job description |
| requirements | String[] | | Array of requirements |
| responsibilities | String[] | | Array of responsibilities |
| salary | String | OPTIONAL | Salary ranges |
| experience | String | OPTIONAL | Experience required |
| location | String | | Job location |
| jobType | String | | Job type (FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP) |
| isActive | Boolean | DEFAULT: true | Active status |
| isOpen | Boolean | DEFAULT: true | Open for applications |
| displayOrder | Int | DEFAULT: 0 | Display order |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- CareerApplication (1:N) - Career has many Applications

**Indexes**: slug, isOpen

---

### CareerApplication
Job applications.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Application ID (CUID) |
| careerId | String | FK | Reference to CareerOpening |
| userId | String | FK | Reference to User |
| resume | String | | Resume file URL |
| coverLetter | String | OPTIONAL | Cover letter |
| status | String | DEFAULT: "applied" | Application status |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Relationships**:
- CareerOpening (N:1)
- User (N:1)

**Indexes**: careerId, userId, status

---

## Site Configuration

### SiteSettings
Key-value configuration storage.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Setting ID (CUID) |
| key | String | UNIQUE | Setting key |
| value | String | | Setting value (stored as JSON) |
| description | String | OPTIONAL | Description |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Indexes**: key

---

### HospitalInfo
Hospital information and metadata.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Info ID (CUID) |
| name | String | DEFAULT: "New Hospital" | Hospital name |
| description | String | OPTIONAL | Description |
| logo | String | OPTIONAL | Logo URL |
| banner | String | OPTIONAL | Banner image URL |
| phone | String | OPTIONAL | Contact phone |
| email | String | OPTIONAL | Contact email |
| address | String | OPTIONAL | Street address |
| city | String | OPTIONAL | City |
| state | String | OPTIONAL | State |
| zipCode | String | OPTIONAL | Zip code |
| country | String | OPTIONAL | Country |
| latitude | Float | OPTIONAL | Latitude for maps |
| longitude | Float | OPTIONAL | Longitude for maps |
| website | String | OPTIONAL | Website URL |
| facebook | String | OPTIONAL | Facebook URL |
| instagram | String | OPTIONAL | Instagram URL |
| twitter | String | OPTIONAL | Twitter URL |
| linkedin | String | OPTIONAL | LinkedIn URL |
| established | DateTime | OPTIONAL | Establishment date |
| bedCount | Int | OPTIONAL | Number of beds |
| department_count | Int | OPTIONAL | Number of departments |
| doctor_count | Int | OPTIONAL | Number of doctors |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

---

### FeatureToggle
Feature flags for enabling/disabling features.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | String | PK | Toggle ID (CUID) |
| key | String | UNIQUE | Feature key |
| enabled | Boolean | DEFAULT: true | Enabled status |
| description | String | OPTIONAL | Description |
| createdAt | DateTime | DEFAULT: now() | Created at |
| updatedAt | DateTime | | Updated at |

**Indexes**: key, enabled

---

## Enums

### UserRole
```
SUPER_ADMIN  - System administrator
ADMIN        - Hospital administrator
DOCTOR       - Medical professional
PATIENT      - Patient
STAFF        - Hospital staff
```

### AppointmentStatus
```
PENDING      - Waiting for approval
APPROVED     - Approved by admin
REJECTED     - Rejected
COMPLETED    - Appointment completed
CANCELLED    - Cancelled
```

### DayOfWeek
```
MONDAY       - Monday
TUESDAY      - Tuesday
WEDNESDAY    - Wednesday
THURSDAY     - Thursday
FRIDAY       - Friday
SATURDAY     - Saturday
SUNDAY       - Sunday
```

### BlogPostStatus
```
DRAFT        - Draft
PUBLISHED    - Published
ARCHIVED     - Archived
```

---

## Relationships Diagram

```
User (1) ──────── (1) Doctor
User (1) ──────── (1) Patient
User (1) ──────┬──(N) BlogPost
User (1) ──────┬──(N) Testimonial
User (1) ──────┬──(N) Appointment
User (1) ──────┬──(N) CareerApplication

Doctor (1) ────┬──(N) DoctorAvailability
Doctor (1) ────┬──(N) Appointment
Doctor (1) ────┬──(N) Testimonial

Department (1) ─┬──(N) Doctor
Department (1) ─┬──(N) Appointment
Department (1) ─┬──(N) Testimonial

Patient (1) ────────(N) Appointment

CareerOpening (1) ──(N) CareerApplication
```

---

## Indexing Strategy

**Indexes are created on**:
- **Foreign Keys**: For faster joins and relationships
- **Search Fields**: High-cardinality fields (email, slug)
- **Filter Fields**: Commonly filtered columns (status, date ranges)
- **Sort Fields**: Display order and creation/update dates
- **Composite Indexes**: Common query patterns (doctorId, appointmentDate)

---

## Database Best Practices

1. **Connection Pooling**: Use connection pooling in production
2. **Backups**: Regular automated backups to secure storage
3. **Monitoring**: Monitor query performance and slow queries
4. **Optimization**: Analyze and optimize slow queries
5. **Scaling**: Use read replicas for read-heavy operations
6. **Replication**: Setup primary-replica replication for high availability

---

## Migrations

Create migrations when modifying schema:

```bash
# Generate migration after schema change
npx prisma migrate dev --name descriptive_name

# View migration files
ls -la database/prisma/migrations/

# Apply migrations to production
npx prisma migrate deploy

# Reset database (DANGEROUS!)
npx prisma migrate reset
```

---

## Data Integrity

- **Referential Integrity**: Foreign keys with cascading deletes
- **Constraints**: Unique constraints on natural keys
- **Type Safety**: Strong typing with TypeScript and Prisma
- **Validation**: Server-side validation on all inputs
- **Transactions**: Multi-step operations use transactions

---

## Growth Considerations

The schema is designed to scale to:
- Millions of appointments
- Hundreds of thousands of patients
- Thousands of doctors across multiple departments
- Millions of blog views

**Partitioning Strategy**:
- Consider partitioning `Appointment` table by date for very large systems
- Use read replicas for heavy read operations (blog, doctor listings)

---

## Backup & Recovery

```bash
# Backup
pg_dump -U hospital hospital_db > backup-$(date +%s).sql

# Restore
psql -U hospital hospital_db < backup-timestamp.sql

# Automated backups (use external tools or managed database service)
```

---

For more details, see the Prisma schema file: `database/prisma/schema.prisma`
