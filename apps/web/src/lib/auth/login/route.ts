import { NextResponse } from 'next/server';

// Use 'backend' instead of 'localhost' as that's the service name in docker-compose
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('Sending login request to:', `${API_URL}/api/login`);
    console.log('Request body:', body);

    const response = await fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });

    const data = await response.json();
    console.log('Login response:', data);

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    const res = NextResponse.json(data);
    
    if (data.token) {
      res.cookies.set({
        name: 'auth-token',
        value: data.token,
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'lax',
      });
    }

    return res;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

