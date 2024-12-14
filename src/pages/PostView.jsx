import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ExternalLink, Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPost } from '../Api/UserApi';

export default function PostView() {
  const { id: postId } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState()
  const [getError, setGetError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
        setLoading(true);
        try{
            const postData = await getPost(postId)
            setPost(postData)
        }catch(err){
            setGetError(err.message || "Failed to fetch post")
        }finally{
            setLoading(false)
        }
    }

    fetchPost()
  }, [postId])

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (getError) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center py-10">Post not found</div>;

  const {
    title,
    description,
    coverImage,
    optionalImages,
    link,
    author,
    createdAt,
  } = post;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-10"
    >
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden bg-white dark:bg-gray-800 shadow-2xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {coverImage && (
              <img
                src={coverImage}
                alt={title}
                className="w-full h-[400px] object-cover"
              />
            )}
          </motion.div>
          
          <CardContent className="p-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
            >
              {title}
            </motion.h1>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4 mb-6"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${author?.name || 'Anonymous'}`}
                  alt={author?.name || 'Anonymous'}
                />
                <AvatarFallback>{author?.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{author?.name || 'Anonymous'}</p>
                {createdAt && (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="mr-2 h-4 w-4" />
                    {format(new Date(createdAt), "MMMM d, yyyy")}
                  </div>
                )}
              </div>
            </motion.div>
            
            <Separator className="my-6" />
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {description}
              </p>
              
              {optionalImages && optionalImages.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                  {optionalImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Optional image ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
              
              {link && (
                <div className="mt-6">
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                    onClick={() => window.open(link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit External Link</span>
                  </Button>
                </div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

