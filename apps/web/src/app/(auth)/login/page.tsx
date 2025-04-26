'use client';

import LoginForm from '@/components/forms/LoginForm'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Logo or Brand Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
          Your Brand
        </h1>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please sign in to your account
            </p>
          </div>

          {/* Card Body */}
          <div className="px-8 py-6">
            <LoginForm />
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200"
            >
              Create an account
            </Link>
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
            >
              Forgot password?
            </Link>
            <Link
              href="/help"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
            >
              Need help?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}





