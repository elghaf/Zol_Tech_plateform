import { NextResponse } from 'next/server';

// Use 'backend' instead of 'localhost' as that's the service name in docker-compose
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Sending registration request to:', `${API_URL}/api/register`);
    console.log('Request body:', body);

    const response = await fetch(`${API_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    const data = await response.json();
    console.log('Response:', data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || data.error || 'Registration failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

