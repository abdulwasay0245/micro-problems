'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                M
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-green-800 transition-colors duration-300 hidden sm:block">
                Micro Problems PK
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-green-900 transition-colors duration-200">
              Dashboard
            </Link>
            <Link href="/report" className="text-sm font-medium text-gray-600 hover:text-green-900 transition-colors duration-200">
              Report Issue
            </Link>
            <Link href="/map" className="text-sm font-medium text-gray-600 hover:text-green-900 transition-colors duration-200">
              🗺️ Map
            </Link>
            {session?.user?.role === 'admin' && (
              <Link href="/admin" className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors duration-200">
                🛠️ Admin
              </Link>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Name */}
                <span className="hidden sm:block text-sm font-semibold text-gray-900">
                  {session.user?.name || 'User'}
                </span>

                {/* Avatar */}
                {session.user?.image ? (
                  <div className="relative h-9 w-9 rounded-full overflow-hidden border-2 border-green-100 shadow-sm ring-2 ring-transparent hover:ring-green-300 transition-all cursor-pointer">
                    <Image
                      alt={session.user.name ?? 'Profile'}
                      fill
                      className="object-cover"
                      src={session.user.image}
                    />
                  </div>
                ) : (
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold shadow-sm border-2 border-green-200">
                    {session.user?.name?.charAt(0) || 'U'}
                  </div>
                )}

                {/* Sign Out */}
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-600 hover:text-white px-4 py-2 rounded-full hover:bg-red-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-200 transition-all duration-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:bg-gray-50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign In with Google
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}