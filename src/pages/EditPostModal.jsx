import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Image, LinkIcon, X, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { handlePostSubmission } from "../Api/postSubmission";
import { updatePost } from "../Api/UserApi";

const EditPostModal = ({ post, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState(
    post?.coverImage || null
  );
  const [optionalImagesPreview, setOptionalImagesPreview] = useState(
    post?.optionalImages || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      link: post?.link || "",
      coverImage: "",
      optionalImages: [],
    },
  });

  const watchCoverImage = watch("coverImage");
  const watchOptionalImages = watch("optionalImages");

  useEffect(() => {
    if (post && isOpen) {
      setValue("title", post.title);
      setValue("description", post.description);
      setValue("link", post.link || "");
      setCoverImagePreview(post.coverImage);
      setOptionalImagesPreview(post.optionalImages || []);
    }
  }, [post, isOpen, setValue]);

  useEffect(() => {
    if (watchCoverImage instanceof FileList && watchCoverImage.length > 0) {
      const file = watchCoverImage[0];
      setCoverImagePreview(URL.createObjectURL(file));
    }
  }, [watchCoverImage]);

  useEffect(() => {
    if (
      watchOptionalImages instanceof FileList &&
      watchOptionalImages.length > 0
    ) {
      const newPreviews = Array.from(watchOptionalImages).map((file) =>
        URL.createObjectURL(file)
      );
      setOptionalImagesPreview((prev) => [...prev, ...newPreviews]);
    }
  }, [watchOptionalImages]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const updatedPost = await handlePostSubmission(data, true, post);
      const response = await updatePost(post._id, updatedPost);
      if (response.status === 200) {
        await onSave(response.data);
        toast.success("Post updated successfully");
        reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeOptionalImage = (index) => {
    const updatedPreviews = [...optionalImagesPreview];
    updatedPreviews.splice(index, 1);
    setOptionalImagesPreview(updatedPreviews);

    const currentOptionalImages = watch("optionalImages");
    const dataTransfer = new DataTransfer();

    if (currentOptionalImages instanceof FileList) {
      Array.from(currentOptionalImages).forEach((file, i) => {
        if (i !== index) dataTransfer.items.add(file);
      });
      setValue("optionalImages", dataTransfer.files);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="hover:bg-purple-100 dark:hover:bg-purple-900"
      >
        <Edit2 className="h-4 w-4 text-purple-600" />
      </Button>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Edit Post
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title" className="text-base">
                Title
              </Label>
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage" className="text-base">
              Cover Image
            </Label>
            <div className="relative group">
              <div className="relative h-48 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 transition-colors">
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                  <Label
                    htmlFor="cover-image-upload"
                    className="hidden group-hover:block cursor-pointer text-white font-medium"
                  >
                    Change Image
                  </Label>
                </div>
              </div>
              <Input
                id="cover-image-upload"
                type="file"
                accept="image/*"
                {...register("coverImage")}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="optionalImages" className="text-base">
              Optional Images
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {optionalImagesPreview.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Optional ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeOptionalImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <Label
                htmlFor="optional-images-upload"
                className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 transition-colors cursor-pointer"
              >
                <Plus className="h-8 w-8 text-gray-400" />
              </Label>
            </div>
            <Input
              id="optional-images-upload"
              type="file"
              accept="image/*"
              multiple
              {...register("optionalImages")}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description" className="text-base">
                Description
              </Label>
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <Textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="min-h-[120px] text-base"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-4 w-4 text-gray-500" />
              <Label htmlFor="link" className="text-base">
                Link (optional)
              </Label>
            </div>
            <Input
              id="link"
              type="url"
              {...register("link")}
              className="text-base"
              placeholder="https://"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostModal;
