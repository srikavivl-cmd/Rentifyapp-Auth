import { NextResponse } from 'next/server';
import { getUsers, getUserByEmail, createUser } from '@/lib/data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (email) {
    const users = getUserByEmail(email);
    return NextResponse.json(users);
  }

  const users = getUsers();
  return NextResponse.json(users);
}

export async function POST(request) {
  try {
    const userData = await request.json();
    const newUser = createUser(userData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
