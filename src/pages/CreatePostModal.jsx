import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { BlogPost } from "../Api/UserApi";
import { toast } from "react-toastify";
import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { postCreationSchema } from "../utils/Validations";

export function CreatePostModal({ getBlogData }) {
  const [isOpen, onClose] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [optionalImagesPreview, setOptionalImagesPreview] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // {
  //   resolver: zodResolver(postCreationSchema),
  //   mode: "onTouched",
  // }

  const coverImage = watch("coverImage");
  const optionalImages = watch("optionalImages");

  useEffect(() => {
    if (coverImage?.[0]) {
      setCoverImagePreview(URL.createObjectURL(coverImage[0]));
    }
  }, [coverImage]);

  useEffect(() => {
    if (optionalImages?.length > 0) {
      setOptionalImagesPreview(
        Array.from(optionalImages).map((file) => URL.createObjectURL(file))
      );
    }
  }, [optionalImages]);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await axios.post(
        import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      const imageUploads = [];
      if (data.coverImage?.[0]) {
        imageUploads.push(uploadImageToCloudinary(data.coverImage[0]));
      }

      if (data.optionalImages?.length > 0) {
        const optionalImagesUploads = Array.from(data.optionalImages).map(
          (file) => uploadImageToCloudinary(file)
        );
        imageUploads.push(...optionalImagesUploads);
      }

      const uploadedImageURLs = await Promise.all(imageUploads);
      const [coverImageURL, ...optionalImagesURLs] = uploadedImageURLs;

      const formData = {
        title: data.title,
        description: data.description,
        link: data.link || "",
        coverImage: coverImageURL || null,
        optionalImages: optionalImagesURLs || [],
      };

      const response = await BlogPost(formData);
      if (response.status === 201) {
        toast.success("Blog Posted Successfully");
      }
      reset();
      onClose(false);
      getBlogData();
    } catch (error) {
      console.error("Error submitting from:", error);
      toast.error("Failed to create post");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-8 right-8 rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="w-8 h-8" />
          <span className="sr-only">Create new post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new blog post.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="cover-image">Cover Image</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                {...register("coverImage")}
                className="hidden"
              />
              <Label
                htmlFor="coverImage"
                className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview}
                    alt="Cover"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-700">
                      Upload cover image
                    </span>
                  </div>
                )}
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="optional-images">Optional Images</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Input
                id="optionalImages"
                type="file"
                accept="image/*"
                multiple
                {...register("optionalImages")}
                className="hidden"
              />
              <Label
                htmlFor="optionalImages"
                className="cursor-pointer flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <span className="mt-1 block text-sm font-medium text-gray-700">
                    Upload optional images
                  </span>
                </div>
              </Label>
            </div>
            {optionalImagesPreview.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {optionalImagesPreview.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Optional ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required!" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="link">Link</Label>
            <Input id="link" type="url" {...register("link")} />
          </div>
          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
