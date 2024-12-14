// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


// const fetchPost = async (id) => {

//   return {
//     id,
//     title: "Sample Post Title",
//     content: "This is a sample post content.",
//     category: "Web Development"
//   };
// };


// const savePost = async (postData) => {
  
//   console.log("Saving post:", postData);
//   return { success: true, id: postData.id || Date.now() };
// };

// export default function CreateEditPost() {
//   const { id } = useParams(); // Get post ID from URL if editing
//   const navigate = useNavigate();
//   const [post, setPost] = useState({ title: '', content: '', category: '' });
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (id) {
//       // Fetch existing post data if editing
//       setIsLoading(true);
//       fetchPost(id).then(data => {
//         setPost(data);
//         setIsLoading(false);
//       });
//     }
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPost(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCategoryChange = (value) => {
//     setPost(prev => ({ ...prev, category: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const result = await savePost(post);
//       if (result.success) {
//         navigate(`/post/${result.id}`);
//       }
//     } catch (error) {
//       console.error("Error saving post:", error);
//       // Handle error (e.g., show error message to user)
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
//       <Card className="max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">
//             {id ? 'Edit Blog Post' : 'Create New Blog Post'}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="title">Title</Label>
//                 <Input
//                   id="title"
//                   name="title"
//                   value={post.title}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <Select onValueChange={handleCategoryChange} value={post.category}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Web Development">Web Development</SelectItem>
//                     <SelectItem value="Programming">Programming</SelectItem>
//                     <SelectItem value="Design">Design</SelectItem>
//                     <SelectItem value="Technology">Technology</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label htmlFor="content">Content</Label>
//                 <Textarea
//                   id="content"
//                   name="content"
//                   value={post.content}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full min-h-[200px]"
//                 />
//               </div>
//             </div>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-end space-x-4">
//           <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
//           <Button onClick={handleSubmit} disabled={isLoading}>
//             {isLoading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }