import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Link } from "react-router-dom";

function BlogCard({ post }) {
  const {
    _id,
    title,
    description,
    coverImage,
    author,
    createdAt,
    readTime,
    category,
  } = post;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        {coverImage && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={coverImage}
              alt={title ?? "Blog post"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {category && (
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                {category}
              </Badge>
            )}
          </div>
        )}
        <CardHeader>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-primary transition-colors duration-200">
            {title ?? "Untitled Post"}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {description ?? "No description available"}
          </p>
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={`https://api.dicebear.com/6.x/initials/svg?seed=${
                  author?.name ?? "Anonymous"
                }`}
                alt={author?.name ?? "Anonymous"}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {(author?.name ?? "AN")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {author?.name ?? "Anonymous"}
              </p>
              {createdAt && (
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {format(new Date(createdAt), "MMM d, yyyy")}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-gray-50 dark:bg-gray-700/50 px-6 py-4">
          {readTime && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="mr-1 h-4 w-4" />
              {readTime}
            </div>
          )}
          <Link to={`/post/${_id}`} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto" variant="default">
              Read More
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default BlogCard;
