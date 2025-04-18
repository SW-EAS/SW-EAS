//src/app/api/auth/user/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

// Centralized error response function
function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

/** GET `/api/auth/user` → Retrieve user role and set online status */
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.id) return errorResponse('Unauthorized', 401);

    await connectToDatabase();

    const user = await User.findById(token.id).select('role');
    if (!user) return errorResponse('User not found', 404);

    // Mark user as online
    await User.findByIdAndUpdate(token.id, { isOnline: true });

    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving user role:', error);
    return errorResponse('Internal server error', 500);
  }
}
