interface AuthResponse {
  error?: string;
  data?: any;
}

// This base URL is used if we need to call the backend directly
// For most cases, we should use the /api routes which will proxy through Next.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// For debugging
console.log('Using API URL:', API_BASE_URL);

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    console.log('Client: Attempting to login:', { email })
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Important for cookies
    });

    console.log('Client: Response status:', response.status)

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response received:', text)
      throw new Error('Backend returned HTML instead of JSON. Check server configuration.')
    }

    const data = await response.json()
    console.log('Client: Response data:', data)

    if (!response.ok) {
      return { 
        error: data.error || data.message || 'Login failed' 
      }
    }

    return { data }
  } catch (error) {
    console.error('Client: Login error:', error)
    return { 
      error: error instanceof Error ? error.message : 'Network error. Please try again.'
    }
  }
}

export async function signUp(email: string, password: string, name: string): Promise<AuthResponse> {
  try {
    console.log('Client: Attempting to register:', { email, name })
    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        password,
        password_confirmation: password,
        name 
      }),
      credentials: 'include',
    });

    console.log('Client: Response status:', response.status)
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response received:', text)
      throw new Error('Backend returned HTML instead of JSON. Check server configuration.')
    }

    const data = await response.json()
    console.log('Client: Response data:', data)

    if (!response.ok) {
      return {
        error: data.error || data.message || 'Registration failed'
      }
    }

    return { data }
  } catch (error) {
    console.error('Client: Sign up error:', error)
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.'
    }
  }
}

export async function signOut(): Promise<void> {
  try {
    // Clear auth cookie
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
  } catch (error) {
    console.error('Logout error:', error);
  }
}
