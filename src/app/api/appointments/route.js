import { NextResponse } from 'next/server';
import { getAppointments, createAppointment } from '@/lib/data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const filters = {
    userId: searchParams.get('userId'),
    ownerId: searchParams.get('ownerId'),
  };

  const appointments = getAppointments(filters);
  return NextResponse.json(appointments);
}

export async function POST(request) {
  try {
    const appointmentData = await request.json();
    const newAppointment = createAppointment(appointmentData);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
