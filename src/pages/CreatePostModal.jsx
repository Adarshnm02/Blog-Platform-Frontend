import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Upload } from 'lucide-react'

export function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [coverImage, setCoverImage] = useState(null)
  const [optionalImages, setOptionalImages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cover-image">Cover Image</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Input
                id="cover-image"
                type="file"
                accept="image/*"
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Label htmlFor="cover-image" className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                {coverImage ? (
                  <img src={URL.createObjectURL(coverImage)} alt="Cover" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-700">Upload cover image</span>
                  </div>
                )}
              </Label>
            </div>
          </div>
          <div>
            <Label htmlFor="optional-images">Optional Images</Label>
            <div className="mt-1 flex items-center space-x-2">
              <Input
                id="optional-images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setOptionalImages(Array.from(e.target.files || []))}
                className="hidden"
              />
              <Label htmlFor="optional-images" className="cursor-pointer flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <span className="mt-1 block text-sm font-medium text-gray-700">Upload optional images</span>
                </div>
              </Label>
            </div>
            {optionalImages.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {optionalImages.map((img, index) => (
                  <img key={index} src={URL.createObjectURL(img)} alt={`Optional ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" required />
          </div>
          <div>
            <Label htmlFor="link">Link</Label>
            <Input id="link" type="url" />
          </div>
          <Button type="submit" className="w-full">Create Post</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

