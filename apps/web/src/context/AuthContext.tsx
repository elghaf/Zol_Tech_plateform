'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/types/auth'
import { signIn, signUp, signOut } from '@/lib/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true)
        // Check for existing auth token cookie
        const hasAuthToken = document.cookie.includes('auth-token=')
        
        if (hasAuthToken) {
          // Fetch current user data
          const response = await fetch('/api/user/me', {
            credentials: 'include',
          })
          
          if (response.ok) {
            const userData = await response.json()
            setUser(userData)
          } else {
            // Invalid token, clear user state
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error loading user:', error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log('AuthContext: Starting login process')
      const { error, data } = await signIn(email, password)
      
      if (error) {
        console.error('Login error in AuthContext:', error)
        throw new Error(error)
      }
      
      console.log('Login successful:', data)
      setUser(data.user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    setIsLoading(true)
    try {
      console.log('AuthContext: Starting registration process')
      // Fix the parameter order in signUp call
      const { error, data } = await signUp(email, password, name)
      
      if (error) {
        console.error('Registration error in AuthContext:', error)
        throw new Error(error)
      }
      
      console.log('Registration successful:', data)
      setUser(data.user)
      router.push('/dashboard')
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut()
      setUser(null)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthProvider


