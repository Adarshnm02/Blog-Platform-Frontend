import axios from "axios";
import { toast } from "react-toastify";

const cloudinaryUpload = async (file) => {
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
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteFromCloudinary = async (imageUrl) => {
  try {
    // Extract public ID from the Cloudinary URL
    const publicId = imageUrl.split("/").pop().split(".")[0];

    // Generate signature
    const timestamp = Math.floor(Date.now() / 1000);
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

    // Create signature string
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;

    // Generate SHA-1 hash
    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest("SHA-1", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Make delete request
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/destroy`,
      {
        public_id: publicId,
        timestamp: timestamp,
        api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
        signature: signature,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error deleting image from Cloudinary:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const handlePostSubmission = async (
  data,
  isEditing = false,
  previousPost = null
) => {
  try {
    let coverImageUrl = data.coverImage;
    let optionalImageUrls = [];

    // Upload new cover image if provided
    if (data.coverImage instanceof File) {
      coverImageUrl = await cloudinaryUpload(data.coverImage);
    }

    // Upload new optional images if provided
    if (data.optionalImages && data.optionalImages.length > 0) {
      optionalImageUrls = await Promise.all(
        Array.from(data.optionalImages).map((file) => cloudinaryUpload(file))
      );
    }

    // If editing, delete old images that were replaced
    if (isEditing && previousPost) {
      if (
        previousPost.coverImage &&
        previousPost.coverImage !== coverImageUrl
      ) {
        await deleteFromCloudinary(previousPost.coverImage);
      }

      const oldOptionalImages = previousPost.optionalImages || [];
      const imagesToDelete = oldOptionalImages.filter(
        (img) => !optionalImageUrls.includes(img)
      );
      await Promise.all(imagesToDelete.map((img) => deleteFromCloudinary(img)));
    }

    const postData = {
      title: data.title,
      description: data.description,
      link: data.link || "",
      coverImage: coverImageUrl,
      optionalImages: optionalImageUrls,
      // [...(previousPost?.optionalImages || []),...optionalImageUrls,],
    };

    return postData;
  } catch (error) {
    console.error("Error in post submission:", error);
    toast.error("Failed to submit post");
    throw error;
  }
};
