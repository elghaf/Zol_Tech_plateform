import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8000/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = `${API_BASE_URL}/auth/login` // Updated path to match Laravel API route
    
    console.log('Login request received:', body)
    console.log('Sending request to:', backendUrl)

    // Forward the request to your backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest' // Add this for Laravel
      },
      body: JSON.stringify(body),
    })

    // Check if the response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      // If not JSON, get the text and throw an error
      const text = await response.text()
      console.error('Non-JSON response received:', text)
      throw new Error('Backend returned HTML instead of JSON. Check server configuration.')
    }

    const data = await response.json()
    console.log('Backend response:', data)

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Authentication failed' },
        { status: response.status }
      )
    }

    // Create the response with the format expected by the frontend
    const responseData = {
      user: data.data?.user || data.user,
      token: data.data?.token || data.token
    }
    
    const res = NextResponse.json(responseData)

    // Set the auth token cookie if it exists in the response
    if (responseData.token) {
      res.cookies.set({
        name: 'auth-token',
        value: responseData.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }

    return res
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Login failed' },
      { status: 500 }
    )
  }
} 
