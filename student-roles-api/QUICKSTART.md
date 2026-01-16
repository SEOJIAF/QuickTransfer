# Quick Start Guide

Get the Student Roles API running in 5 minutes!

## Step 1: Install Bun (Runtime for Elysia)

```bash
curl -fsSL https://bun.sh/install | bash
```

Restart your terminal or run:
```bash
source ~/.bashrc  # or ~/.zshrc
```

## Step 2: Setup PostgreSQL Database

Choose the easiest option for you:

### Option A: Docker (Recommended for Testing)

```bash
docker run --name postgres-student \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=student_roles_db \
  -p 5432:5432 \
  -d postgres:15
```

### Option B: Use Free Cloud Database

1. Go to [Supabase](https://supabase.com) or [Neon](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string

## Step 3: Install Dependencies

```bash
cd student-roles-api
npm install
```

## Step 4: Configure Database Connection

Edit `.env` file:

```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/student_roles_db?schema=public"
```

Or for cloud database:
```env
DATABASE_URL="postgresql://your-user:your-password@your-host:5432/your-db?schema=public"
```

## Step 5: Setup Database Schema

```bash
npm run db:generate
npm run db:migrate
```

## Step 6: Start the Server

```bash
npm run dev
```

You should see:
```
🦊 Elysia is running at http://localhost:3000
```

## Step 7: Test the API

Create your first student:

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

## That's it! 🎉

Your API is now running with:
- ✅ PostgreSQL database
- ✅ Student management
- ✅ Primary and secondary roles
- ✅ Full CRUD operations

## Next Steps

- Read the [full README.md](README.md) for detailed documentation
- Open Prisma Studio to view your data: `npm run db:studio`
- Test all endpoints with the cURL examples in README.md

## Troubleshooting

**Can't connect to database?**
- Make sure PostgreSQL is running: `docker ps` (if using Docker)
- Check your DATABASE_URL in `.env`
- Try: `psql $DATABASE_URL` to test connection

**Port 3000 in use?**
- Change port in `.env`: `PORT=3001`

**Need help?**
- Check the main README.md
- Ensure all dependencies are installed
- Make sure Bun is in your PATH
