import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:8000';

export async function POST(request: Request) {
  try {
    console.log('Processing logout request');
    
    const token = cookies().get('auth-token')?.value;
    console.log('Auth token present:', !!token);
    
    if (!token) {
      console.log('No token found, user is already logged out');
      // Even if no token is found, clear any cookies
      const res = NextResponse.json({ message: 'Already logged out' });
      res.cookies.set({
        name: 'auth-token',
        value: '',
        expires: new Date(0),
        path: '/',
      });
      return res;
    }
    
    try {
      // Call the backend logout endpoint
      console.log('Calling backend logout endpoint');
      const response = await fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      console.log('Backend logout response status:', response.status);
    } catch (backendError) {
      // Log but continue even if backend call fails
      console.error('Backend logout error:', backendError);
    }
    
    // Always create success response and clear cookies
    console.log('Creating response and clearing cookies');
    const res = NextResponse.json({ 
      message: 'Logged out successfully',
      success: true
    });
    
    // Clear the auth cookie
    res.cookies.set({
      name: 'auth-token',
      value: '',
      expires: new Date(0),
      path: '/',
      sameSite: 'strict',
      httpOnly: true,
    });
    
    console.log('Logout complete');
    return res;
  } catch (error) {
    console.error('Logout error:', error);
    // Even on error, try to clear the cookie
    const res = NextResponse.json(
      { error: 'Logout failed', success: false },
      { status: 500 }
    );
    res.cookies.set({
      name: 'auth-token',
      value: '',
      expires: new Date(0),
      path: '/',
    });
    return res;
  }
} 