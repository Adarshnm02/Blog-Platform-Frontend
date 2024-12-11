import React from 'react'
import { Link } from "react-router-dom"


export default function Footer(){
    return(
        <footer className="bg-white mt-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">&copy; 2024 BlogHub. All rights reserved.</p>
            <nav className="flex space-x-4">
              <Link href="" className="text-gray-600 hover:text-purple-600">Privacy Policy</Link>
              <Link href="" className="text-gray-600 hover:text-purple-600">Terms of Service</Link>
            </nav>
          </div>
        </div>
      </footer>
    )
}