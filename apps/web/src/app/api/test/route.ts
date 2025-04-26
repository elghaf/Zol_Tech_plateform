import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const API_BASE_URL = process.env.BACKEND_API_URL

export async function GET(request: NextRequest) {
  try {
    console.log('Backend URL:', API_BASE_URL)
    
    // Just return environment info for debugging
    return NextResponse.json({
      backendUrl: API_BASE_URL,
      env: process.env.NODE_ENV,
      message: 'Test endpoint working'
    })
  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
} 