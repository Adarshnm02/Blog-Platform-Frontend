import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { deletePost } from "../Api/UserApi";
import { deleteFromCloudinary } from "../Api/postSubmission";

const DeletePostModal = ({ postId, postImageUrls, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await Promise.all(
        postImageUrls.map((imageUrl) => deleteFromCloudinary(imageUrl))
      );

      await deletePost(postId);
      onDelete(postId); //to update the UI
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    } finally {
      setIsOpen(false); // Close the modal
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setIsOpen(true)}>
        Delete Post
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeletePostModal;
