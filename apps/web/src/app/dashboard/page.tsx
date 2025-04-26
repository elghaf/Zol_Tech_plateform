'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    console.log('Dashboard: Logout button clicked');
    
    try {
      // First try the proper logout flow
      await logout();
      
      // If we're still here after 1 second, force a harder logout
      setTimeout(() => {
        console.log('Dashboard: Forcing manual logout redirect');
        // Clear any remaining auth data
        localStorage.clear();
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        // Force a hard navigation
        window.location.replace('/login');
      }, 1000);
    } catch (error) {
      console.error('Dashboard: Logout error:', error);
      setIsLoggingOut(false);
      
      // If logout fails, try a direct approach
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        window.location.replace('/login');
      } catch (e) {
        console.error('Dashboard: Fatal logout error, trying last resort:', e);
        window.location.href = '/login';
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`px-4 py-2 ${isLoggingOut ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white rounded-md transition-colors`}
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}





