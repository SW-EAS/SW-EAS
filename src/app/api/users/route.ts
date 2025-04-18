// src/app/api/users/route.tsx

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/users` → Fetch all users */
export async function GET(): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const users = await User.find().select('-password');
    const onlineUsersCount = await User.countDocuments({ isOnline: true });

    return NextResponse.json(
      { users, onlineUsers: onlineUsersCount },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return errorResponse('Server error', 500);
  }
}

/** POST `/api/users` → Create a new user */
/** POST `/api/users` → Create a new user */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, password, role } = body;

    console.log('REGISTERING USER:', body); // ✅ Log full incoming payload

    if (!name || !email || !password) {
      return errorResponse('Missing required fields', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse('User already exists', 400);
    }

    const allowedRoles = ['admin', 'specialist', 'user'];
    const sanitizedRole = allowedRoles.includes(role) ? role : 'user';

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: sanitizedRole,
    });

    return NextResponse.json(
      { message: 'User created', user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error); // ✅ Print full error
    return errorResponse(
      error instanceof Error ? error.message : 'Server error',
      500
    );
  }
}
