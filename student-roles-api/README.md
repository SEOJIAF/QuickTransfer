# Student Management API (Evidencia Spoluziakov)

Backend API for managing students (spoluziaci) and their roles using **Elysia** and **Prisma** with **PostgreSQL**.

## Features

- ✅ Create students with primary and secondary roles
- ✅ Update student information and roles
- ✅ Delete students (with cascade deletion of roles)
- ✅ List all students with their roles
- ✅ Get individual student details
- ✅ **Has One** relationship: Each student has ONE primary role
- ✅ **Has Many** relationship: Each student has MULTIPLE secondary roles

## Database Schema

```
┌─────────────┐
│   Student   │
├─────────────┤
│ id          │ PK
│ name        │
│ email       │ UNIQUE
│ createdAt   │
│ updatedAt   │
└─────────────┘
       │
       │ 1:1
       ▼
┌──────────────┐
│ PrimaryRole  │
├──────────────┤
│ id           │ PK
│ name         │ (Backend, Frontend, Dizajn)
│ studentId    │ FK UNIQUE
│ createdAt    │
└──────────────┘

       │
       │ 1:N
       ▼
┌───────────────┐
│ SecondaryRole │
├───────────────┤
│ id            │ PK
│ name          │ (Backend, Frontend, Dizajn)
│ studentId     │ FK
│ createdAt     │
└───────────────┘
```

### Models

**Student**
- `id` - Integer, Primary Key
- `name` - String
- `email` - String (Unique)
- `primaryRole` - PrimaryRole (One-to-One)
- `secondaryRoles` - SecondaryRole[] (One-to-Many)
- `createdAt` - DateTime
- `updatedAt` - DateTime

**PrimaryRole**
- `id` - Integer, Primary Key
- `name` - String (e.g., "Backend", "Frontend", "Dizajn")
- `studentId` - Integer, Foreign Key (Unique)
- `createdAt` - DateTime

**SecondaryRole**
- `id` - Integer, Primary Key
- `name` - String (e.g., "Backend", "Frontend", "Dizajn")
- `studentId` - Integer, Foreign Key
- `createdAt` - DateTime

## Prerequisites

### 1. Install Bun

Elysia requires [Bun](https://bun.sh) runtime:

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. PostgreSQL Database

You need a PostgreSQL database. Choose one option:

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL
sudo service postgresql start

# Create database
sudo -u postgres createdb student_roles_db
```

#### Option B: Docker PostgreSQL
```bash
docker run --name postgres-student-roles \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=student_roles_db \
  -p 5432:5432 \
  -d postgres:15
```

#### Option C: Cloud PostgreSQL
Use services like:
- [Supabase](https://supabase.com) (Free tier available)
- [Neon](https://neon.tech) (Free tier available)
- [Railway](https://railway.app)
- [Render](https://render.com)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Edit `.env` file and set your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/student_roles_db?schema=public"
```

**Connection string format:**
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
```

**Examples:**

Local database:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/student_roles_db?schema=public"
```

Docker database:
```env
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/student_roles_db?schema=public"
```

Cloud database (Supabase example):
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres?schema=public"
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Run Database Migrations

```bash
npm run db:migrate
```

This will create the tables in your PostgreSQL database.

### 5. Start the Server

```bash
npm run dev
```

The API will be running at `http://localhost:3000`

## API Endpoints

### Root Endpoint
```http
GET /
```

Returns API information and available endpoints.

### 1. Create a New Student

**Endpoint:** `POST /students`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "primaryRole": "Backend",
  "secondaryRoles": ["Frontend", "Dizajn"]
}
```

**Fields:**
- `name` (required) - Student name
- `email` (required) - Student email (must be unique)
- `primaryRole` (optional) - Primary role name
- `secondaryRoles` (optional) - Array of secondary role names

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-16T10:00:00.000Z",
    "updatedAt": "2026-01-16T10:00:00.000Z",
    "primaryRole": {
      "id": 1,
      "name": "Backend",
      "studentId": 1,
      "createdAt": "2026-01-16T10:00:00.000Z"
    },
    "secondaryRoles": [
      {
        "id": 1,
        "name": "Frontend",
        "studentId": 1,
        "createdAt": "2026-01-16T10:00:00.000Z"
      },
      {
        "id": 2,
        "name": "Dizajn",
        "studentId": 1,
        "createdAt": "2026-01-16T10:00:00.000Z"
      }
    ]
  }
}
```

### 2. List All Students

**Endpoint:** `GET /students`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-01-16T10:00:00.000Z",
      "updatedAt": "2026-01-16T10:00:00.000Z",
      "primaryRole": {
        "id": 1,
        "name": "Backend",
        "studentId": 1,
        "createdAt": "2026-01-16T10:00:00.000Z"
      },
      "secondaryRoles": [
        {
          "id": 1,
          "name": "Frontend",
          "studentId": 1,
          "createdAt": "2026-01-16T10:00:00.000Z"
        }
      ]
    }
  ]
}
```

### 3. Get a Single Student

**Endpoint:** `GET /students/:id`

**Example:** `GET /students/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "primaryRole": {
      "id": 1,
      "name": "Backend",
      "studentId": 1
    },
    "secondaryRoles": [
      {
        "id": 1,
        "name": "Frontend",
        "studentId": 1
      }
    ]
  }
}
```

### 4. Update a Student

**Endpoint:** `PUT /students/:id`

**Request Body** (all fields optional):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "primaryRole": "Frontend",
  "secondaryRoles": ["Backend", "Dizajn"]
}
```

**Note:** 
- You can update any combination of fields
- Updating roles will replace existing roles with new ones
- Pass the same values if you want to keep existing data

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "primaryRole": {
      "id": 2,
      "name": "Frontend",
      "studentId": 1
    },
    "secondaryRoles": [
      {
        "id": 3,
        "name": "Backend",
        "studentId": 1
      },
      {
        "id": 4,
        "name": "Dizajn",
        "studentId": 1
      }
    ]
  }
}
```

### 5. Delete a Student

**Endpoint:** `DELETE /students/:id`

**Example:** `DELETE /students/1`

**Response:**
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Note:** When a student is deleted, all associated primary and secondary roles are automatically deleted (CASCADE).

## Testing with cURL

### Create a student
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "primaryRole": "Backend",
    "secondaryRoles": ["Frontend", "Dizajn"]
  }'
```

### List all students
```bash
curl http://localhost:3000/students
```

### Get a specific student
```bash
curl http://localhost:3000/students/1
```

### Update a student
```bash
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "primaryRole": "Frontend",
    "secondaryRoles": ["Backend"]
  }'
```

### Delete a student
```bash
curl -X DELETE http://localhost:3000/students/1
```

## Database Management

### View Database in Prisma Studio

```bash
npm run db:studio
```

This opens a visual database editor at `http://localhost:5555`

### Push Schema Changes (without migration)

```bash
npm run db:push
```

Use this during development to quickly sync your schema without creating migration files.

## Project Structure

```
student-roles-api/
├── src/
│   └── index.ts          # Main API server
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database migrations
├── .env                  # Environment variables (DATABASE_URL)
├── .gitignore
├── package.json
├── prisma.config.ts      # Prisma configuration
└── README.md
```

## Technology Stack

- **[Elysia](https://elysiajs.com/)** - Fast and type-safe web framework for Bun
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful open-source relational database
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime
- **TypeScript** - Type safety

## Common Role Examples

Typical roles you might use:

- **Backend** - Server-side development
- **Frontend** - Client-side development
- **Dizajn** - Design and UX
- **DevOps** - Infrastructure and deployment
- **Testing** - Quality assurance
- **Mobile** - Mobile app development
- **Database** - Database design and management

## Error Handling

All endpoints return responses in this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Environment Variables

Create a `.env` file with:

```env
# Database connection
DATABASE_URL="postgresql://username:password@localhost:5432/student_roles_db?schema=public"

# Optional: Server port (defaults to 3000)
PORT=3000
```

## Troubleshooting

### "Cannot connect to database"
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env` is correct
- Test connection: `psql $DATABASE_URL`

### "Table does not exist"
- Run migrations: `npm run db:migrate`
- Or push schema: `npm run db:push`

### "Port 3000 already in use"
- Change port in `.env`: `PORT=3001`
- Or stop the process using port 3000

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.
