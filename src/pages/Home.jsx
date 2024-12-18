import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreatePostModal } from "./CreatePostModal";
import { getBlog } from "../Api/UserApi";
import BlogCard from "./BlogCard";
import { useSelector } from "react-redux";

export default function Home() {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const searchQuery = useSelector((state) => state.search.query);

  const getBlogData = async () => {
    try {
      const response = await getBlog();
      setBlogData(response.data.data);
    } catch (error) {
      console.log("FT getBlog:", error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const filteredBlogData = blogData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          Welcome to BlogHub
        </h1>
        {filteredBlogData.length === 0 ? (
          <p className="text-center text-white text-xl">
            {searchQuery
              ? `No results found for "${searchQuery}"`
              : "No blog posts available"}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogData.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
      <div className="fixed bottom-8 right-8">
        <CreatePostModal getBlogData={getBlogData} />
        {/* isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} */}
        <Button
          // onClick={() => setIsModalOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="w-8 h-8" />
          <span className="sr-only">Create new post</span>
        </Button>
      </div>
    </div>
  );
}
