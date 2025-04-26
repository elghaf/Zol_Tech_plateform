import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const API_BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:8000/api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const backendUrl = `${API_BASE_URL}/auth/register`
    
    console.log('Registration request received:', body)
    console.log('Sending request to:', backendUrl)

    // Forward the request to your backend
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
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
        { error: data.message || 'Registration failed' },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Registration failed' },
      { status: 500 }
    )
  }
} 
