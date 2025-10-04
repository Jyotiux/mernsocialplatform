import React, { useState, useRef } from "react";
import axios from "axios";

function CreatePost() {
  // State to hold form input values
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    file: null, // File object (image, video, etc.)
  });

  // Loading and message states for feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Ref to manually reset the file input field
  const fileInputRef = useRef(null);

  // Handle text input change (title, content)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setNewPost((prev) => ({ ...prev, file: event.target.files[0] }));
  };

  // Submit post data to backend
  const handlePostSubmit = async () => {
    // Basic validation
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setMessage("Title and content are required.");
      return;
    }

    // Prepare form data for multipart upload
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    if (newPost.file) {
      formData.append("file", newPost.file); // Field name must match multer's `.single('file')`
    }

    try {
      setLoading(true);      // Show loading state
      setMessage("");        // Clear previous messages

      // Send POST request to backend
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // optional: axios sets this automatically
        },
      });

      // Reset form after successful post
      setNewPost({ title: "", content: "", file: null });
      if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
      setMessage("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post. Please try again.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="create-post">
      <h2>Create a Post</h2>

      {/* Title input */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newPost.title}
        onChange={handleInputChange}
        disabled={loading}
      />

      {/* Content input */}
      <textarea
        name="content"
        placeholder="Content"
        value={newPost.content}
        onChange={handleInputChange}
        disabled={loading}
      ></textarea>

      {/* File input */}
      <input
        type="file"
        name="file"
        ref={fileInputRef} // For manual reset
        onChange={handleFileChange}
        disabled={loading}
        accept="image/*,video/*,application/pdf" // Accept only certain file types
      />

      {/* Submit button */}
      <button onClick={handlePostSubmit} disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>

      {/* Display message if any */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreatePost;
