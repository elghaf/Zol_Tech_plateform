import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Make sure this points to your backend API
const API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8000/api'

export async function POST(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url)
    console.log('Path requested:', pathname)
    
    // Use NextResponse to redirect to the proper endpoint
    if (pathname.endsWith('/register')) {
      return NextResponse.redirect(new URL(request.url).origin + '/api/auth/register')
    } else if (pathname.endsWith('/login')) {
      return NextResponse.redirect(new URL(request.url).origin + '/api/auth/login')
    }
    
    // If not a specific auth path, return error
    return NextResponse.json(
      { error: 'Invalid auth endpoint requested' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Auth API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
} 