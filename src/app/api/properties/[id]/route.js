import { NextResponse } from 'next/server';
import { getPropertyById, updateProperty, deleteProperty } from '@/lib/data';

export async function GET(request, { params }) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  return NextResponse.json(property);
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const updates = await request.json();
    const updatedProperty = updateProperty(id, updates);

    if (!updatedProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    return NextResponse.json(updatedProperty);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deleted = deleteProperty(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
