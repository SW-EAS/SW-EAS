// src/app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { POST as createUser } from '../users/route';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    return await createUser(req);
  } catch (err) {
    console.error('Register route error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
