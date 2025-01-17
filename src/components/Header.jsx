import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { auth } from '@clerk/nextjs/server';
import { User } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

const Header = async() => {
    const {userId}= await auth();
    console.log(userId)
  return (
    <nav className="bg-white border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold text-gray-800">
            MyBrand
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <Link href="#features" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
            Pricing
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
            About
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {
            userId ? (
              <div>
                <UserButton/>
                </div>
            ) : (
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Header