# Student Management API

Backend API for managing students (spoluziaci) and their roles using Elysia and Prisma.

## Features

- Create students with primary and secondary roles
- Update student information and roles
- Delete students
- List all students with their roles
- Each student can have ONE primary role (Has One relationship)
- Each student can have MULTIPLE secondary roles (Has Many relationship)

## Database Schema

### Student
- id (Int, Primary Key)
- name (String)
- email (String, Unique)
- primaryRole (PrimaryRole, One-to-One)
- secondaryRoles (SecondaryRole[], One-to-Many)

### PrimaryRole
- id (Int, Primary Key)
- name (String) - e.g., "Backend", "Frontend", "Dizajn"
- studentId (Int, Foreign Key)

### SecondaryRole
- id (Int, Primary Key)
- name (String) - e.g., "Backend", "Frontend", "Dizajn"
- studentId (Int, Foreign Key)

## Setup

### Prerequisites

This project uses [Bun](https://bun.sh) as the runtime for Elysia. Install Bun first:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma Client:
```bash
npm run db:generate
```

3. Run database migrations:
```bash
npm run db:migrate
```

4. Start the development server:
```bash
npm run dev
```

The API will be running at `http://localhost:3000`

## API Endpoints

### 1. Create a new student
**POST** `/students`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "primaryRole": "Backend",
  "secondaryRoles": ["Frontend", "Dizajn"]
}
```

Response:
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
      },
      {
        "id": 2,
        "name": "Dizajn",
        "studentId": 1
      }
    ]
  }
}
```

### 2. List all students
**GET** `/students`

Response:
```json
{
  "success": true,
  "data": [
    {
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
  ]
}
```

### 3. Get a single student
**GET** `/students/:id`

Response:
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

### 4. Update a student
**PUT** `/students/:id`

Request body (all fields optional):
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "primaryRole": "Frontend",
  "secondaryRoles": ["Backend"]
}
```

Response:
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
      }
    ]
  }
}
```

### 5. Delete a student
**DELETE** `/students/:id`

Response:
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

## Testing with cURL

Create a student:
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

List all students:
```bash
curl http://localhost:3000/students
```

Update a student:
```bash
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "primaryRole": "Frontend",
    "secondaryRoles": ["Backend"]
  }'
```

Delete a student:
```bash
curl -X DELETE http://localhost:3000/students/1
```

## Database Management

View the database in Prisma Studio:
```bash
npm run db:studio
```

## Technology Stack

- **Elysia** - Fast and type-safe web framework
- **Prisma** - Next-generation ORM
- **SQLite** - Database
- **TypeScript** - Type safety
