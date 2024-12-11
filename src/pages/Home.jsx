import React from 'react'
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Menu } from 'lucide-react'

// This would typically come from your API or database
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
    author: "John Doe",
    date: "2023-05-15",
    readTime: "5 min read",
    category: "Web Development"
  },
  {
    id: 2,
    title: "The Power of React Hooks",
    excerpt: "Discover how React Hooks can simplify your component logic and make your code more reusable.",
    author: "Jane Smith",
    date: "2023-05-10",
    readTime: "7 min read",
    category: "React"
  },
  {
    id: 3,
    title: "CSS-in-JS: Styled Components vs. Emotion",
    excerpt: "Compare two popular CSS-in-JS libraries and learn which one might be best for your next project.",
    author: "Alex Johnson",
    date: "2023-05-05",
    readTime: "6 min read",
    category: "CSS"
  },
  // Add more blog posts as needed
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/home" className="text-2xl font-bold text-purple-600">BlogHub</Link>
          <nav className="hidden md:flex space-x-4">
            <Link href="/home" className="text-gray-600 hover:text-purple-600">Home</Link>
            <Link href="/home" className="text-gray-600 hover:text-purple-600">About</Link>
            <Link href="/home" className="text-gray-600 hover:text-purple-600">Contact</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Button className="md:hidden" variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Welcome to BlogHub
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${post.author}`} alt={post.author} />
                    <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.readTime}</span>
                <Link href={`/post/${post.id}`} passHref>
                  <Button variant="outline">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">&copy; 2023 BlogHub. All rights reserved.</p>
            <nav className="flex space-x-4">
              <Link href="/privacy" className="text-gray-600 hover:text-purple-600">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-purple-600">Terms of Service</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

