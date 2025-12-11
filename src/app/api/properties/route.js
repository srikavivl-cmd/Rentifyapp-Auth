import { NextResponse } from 'next/server';
import { getProperties, createProperty } from '@/lib/data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const filters = {
    highlight: searchParams.get('highlight'),
    city: searchParams.get('city'),
    ownerId: searchParams.get('ownerId'),
    _sort: searchParams.get('_sort'),
    _order: searchParams.get('_order'),
    _limit: searchParams.get('_limit'),
  };

  const properties = getProperties(filters);

  return NextResponse.json(properties, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

export async function POST(request) {
  try {
    const propertyData = await request.json();
    const newProperty = createProperty(propertyData);
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
