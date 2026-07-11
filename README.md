# 🏠 RentNest Backend API

A complete RESTful backend API for a property rental platform built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Prisma**.

---

## 📦 Submission Info

| Item | Link |
|------|------|
| **Backend Repo** | https://github.com/sumaiyabinterafiq97/rentnest-backend |
| **Live API** | https://rentnest-api-avz8.onrender.com |
| **API Docs (Swagger)** | https://rentnest-api-avz8.onrender.com/api-docs |
| **Admin Email** | admin@rentnest.com |
| **Admin Password** | admin123 |

---

## ✅ Mandatory Requirements Checklist

| Requirement | Status |
|---|---|
| API Documentation (Swagger/OpenAPI) | ✅ Live at `/api-docs` |
| Consistent Error Responses `{ success, message, errorDetails }` | ✅ |
| 20+ Meaningful Backend Commits | ✅ 30+ commits |
| Input Validation (Zod on all endpoints) | ✅ |
| Admin Credentials | ✅ `admin@rentnest.com` / `admin123` |
| Payment Integration (Stripe) | ✅ |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API Framework |
| TypeScript | Type Safety |
| PostgreSQL + Prisma v7 | Database + ORM |
| JWT | Authentication |
| Zod | Input Validation |
| Stripe | Payment Processing |
| Swagger UI | API Documentation |
| Render | Deployment |

---

## 👥 Roles

| Role | Description |
|---|---|
| `TENANT` | Browse properties, submit rental requests, make payments, leave reviews |
| `LANDLORD` | List/manage properties, approve/reject rental requests |
| `ADMIN` | Manage all users (ban/activate), view all properties and rentals |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register as Tenant or Landlord |
| POST | `/api/auth/login` | Public | Login and get JWT token |
| GET | `/api/auth/me` | Auth | Get current user profile |

### Properties
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/properties` | Public | Get all properties (filterable) |
| GET | `/api/properties/:id` | Public | Get property details + reviews |

### Categories
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/categories` | Public | Get all property categories |

### Rentals (Tenant)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/rentals` | Tenant | Submit rental request |
| GET | `/api/rentals` | Tenant | Get my rental requests |
| GET | `/api/rentals/:id` | Tenant | Get rental request by ID |

### Landlord
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/landlord/properties` | Landlord | Create property listing |
| PUT | `/api/landlord/properties/:id` | Landlord | Update property |
| DELETE | `/api/landlord/properties/:id` | Landlord | Delete property |
| GET | `/api/landlord/requests` | Landlord | View rental requests |
| PATCH | `/api/landlord/requests/:id` | Landlord | Approve/Reject request |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/users` | Admin | Get all users |
| PATCH | `/api/admin/users/:id` | Admin | Ban or activate a user |
| GET | `/api/admin/properties` | Admin | Get all properties |
| GET | `/api/admin/rentals` | Admin | Get all rental requests |

### Payments (Stripe)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/payments/create` | Tenant | Create Stripe payment intent |
| POST | `/api/payments/confirm` | Tenant | Confirm payment after Stripe success |
| GET | `/api/payments` | Tenant | Get payment history |

### Reviews
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/reviews` | Tenant | Submit review (after completed rental) |

---

## 🔐 Authentication

All protected routes require a `Authorization` header with a Bearer JWT token:

```
Authorization: Bearer <your_jwt_token>
```

Get the token by calling `POST /api/auth/login`.

---

## ❌ Error Response Format

All errors return a consistent JSON structure:

```json
{
  "success": false,
  "message": "Error description",
  "errorDetails": {}
}
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+
- PostgreSQL running locally

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumaiyabinterafiq97/rentnest-backend.git
   cd rentnest-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables** — create a `.env` file:
   ```env
   PORT=5001
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rentnest"
   JWT_ACCESS_SECRET="super-secret-key-rentnest"
   BCRYPT_SALT_ROUNDS=12
   STRIPE_SECRET_KEY="sk_test_your_stripe_key"
   ```

4. **Push database schema**
   ```bash
   npx prisma db push
   ```

5. **Seed admin user and categories**
   ```bash
   npx ts-node prisma/seed.ts
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **View API docs** at: `http://localhost:5001/api-docs`

---

## 💳 Payment Flow

1. Tenant submits a rental request → status: `PENDING`
2. Landlord approves → status: `APPROVED`
3. Tenant calls `POST /api/payments/create` → gets Stripe `clientSecret`
4. Stripe payment is processed on the client
5. Tenant calls `POST /api/payments/confirm` with `transactionId` → status: `ACTIVE`

---

## 🌱 Database Seed

The seed script creates:
- **Admin user**: `admin@rentnest.com` / `admin123`
- **5 Categories**: Apartment, House, Studio, Villa, Shared Room
