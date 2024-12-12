import React from 'react'
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus } from 'lucide-react'
import { CreatePostModal } from './CreatePostModal';

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
      <div className="fixed bottom-8 right-8">
        <CreatePostModal/>
          <Button 
          onClick={<CreatePostModal/>}
            size="lg" 
            className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-8 h-8" />
            <span className="sr-only">Create new post</span>
          </Button>
      </div>
    </div>
  )
}

