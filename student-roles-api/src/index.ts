import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = new Elysia();

// Enable CORS
app.use(cors());

// Create a new student with primary and secondary roles
app.post('/students', async ({ body }) => {
  try {
    const { name, email, primaryRole, secondaryRoles } = body as {
      name: string;
      email: string;
      primaryRole?: string;
      secondaryRoles?: string[];
    };

    const student = await prisma.student.create({
      data: {
        name,
        email,
        primaryRole: primaryRole
          ? {
              create: {
                name: primaryRole,
              },
            }
          : undefined,
        secondaryRoles: secondaryRoles
          ? {
              create: secondaryRoles.map((roleName) => ({
                name: roleName,
              })),
            }
          : undefined,
      },
      include: {
        primaryRole: true,
        secondaryRoles: true,
      },
    });

    return {
      success: true,
      data: student,
    };
  } catch (error: any) {
    console.error('Create student error:', error);
    return {
      success: false,
      error: 'Failed to create student',
    };
  }
});

// Update an existing student
app.put('/students/:id', async ({ params, body }) => {
  try {
    const studentId = parseInt(params.id);
    
    // Validate that ID is a valid number
    if (isNaN(studentId) || studentId <= 0) {
      return {
        success: false,
        error: 'Invalid student ID',
      };
    }
    
    const { name, email, primaryRole, secondaryRoles } = body as {
      name?: string;
      email?: string;
      primaryRole?: string;
      secondaryRoles?: string[];
    };

    // First, delete existing primary role and secondary roles if they need to be updated
    if (primaryRole !== undefined) {
      await prisma.primaryRole.deleteMany({
        where: { studentId },
      });
    }

    if (secondaryRoles !== undefined) {
      await prisma.secondaryRole.deleteMany({
        where: { studentId },
      });
    }

    // Update the student with new data
    const student = await prisma.student.update({
      where: { id: studentId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(primaryRole !== undefined && {
          primaryRole: primaryRole
            ? {
                create: {
                  name: primaryRole,
                },
              }
            : undefined,
        }),
        ...(secondaryRoles !== undefined && {
          secondaryRoles: secondaryRoles
            ? {
                create: secondaryRoles.map((roleName) => ({
                  name: roleName,
                })),
              }
            : undefined,
        }),
      },
      include: {
        primaryRole: true,
        secondaryRoles: true,
      },
    });

    return {
      success: true,
      data: student,
    };
  } catch (error: any) {
    console.error('Update student error:', error);
    return {
      success: false,
      error: 'Failed to update student',
    };
  }
});

// Delete a student
app.delete('/students/:id', async ({ params }) => {
  try {
    const studentId = parseInt(params.id);
    
    // Validate that ID is a valid number
    if (isNaN(studentId) || studentId <= 0) {
      return {
        success: false,
        error: 'Invalid student ID',
      };
    }

    await prisma.student.delete({
      where: { id: studentId },
    });

    return {
      success: true,
      message: 'Student deleted successfully',
    };
  } catch (error: any) {
    console.error('Delete student error:', error);
    return {
      success: false,
      error: 'Failed to delete student',
    };
  }
});

// List all students with their roles
app.get('/students', async () => {
  try {
    const students = await prisma.student.findMany({
      include: {
        primaryRole: true,
        secondaryRoles: true,
      },
    });

    return {
      success: true,
      data: students,
    };
  } catch (error: any) {
    console.error('List students error:', error);
    return {
      success: false,
      error: 'Failed to retrieve students',
    };
  }
});

// Get a single student by ID
app.get('/students/:id', async ({ params }) => {
  try {
    const studentId = parseInt(params.id);
    
    // Validate that ID is a valid number
    if (isNaN(studentId) || studentId <= 0) {
      return {
        success: false,
        error: 'Invalid student ID',
      };
    }

    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        primaryRole: true,
        secondaryRoles: true,
      },
    });

    if (!student) {
      return {
        success: false,
        error: 'Student not found',
      };
    }

    return {
      success: true,
      data: student,
    };
  } catch (error: any) {
    console.error('Get student error:', error);
    return {
      success: false,
      error: 'Failed to retrieve student',
    };
  }
});

// Health check endpoint
app.get('/', () => ({
  message: 'Student Management API is running',
  endpoints: {
    'POST /students': 'Create a new student',
    'GET /students': 'List all students',
    'GET /students/:id': 'Get a student by ID',
    'PUT /students/:id': 'Update a student',
    'DELETE /students/:id': 'Delete a student',
  },
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🦊 Elysia is running at http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
