import React from 'react'
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, LogOut } from 'lucide-react'



export default function Nav() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/home" className="text-2xl font-bold text-purple-600">
          BlogHub
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/home" className="text-gray-600 hover:text-purple-600">
            Home
          </Link>
          <Link href="/home" className="text-gray-600 hover:text-purple-600">
            About
          </Link>
          <Link href="/home" className="text-gray-600 hover:text-purple-600">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <Button className="md:hidden" variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
          <Button variant="outline" size="sm" className="hidden md:flex items-center">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
