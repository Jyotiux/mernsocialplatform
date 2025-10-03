import React, { useState, useRef } from "react";
import axios from "axios";

function CreatePost() {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null); // for resetting file input

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    setNewPost((prev) => ({ ...prev, file: event.target.files[0] }));
  };

  const handlePostSubmit = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      setMessage("Title and content are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    if (newPost.file) {
      formData.append("file", newPost.file); // field name must match multer.single('file')
    }

    try {
      setLoading(true);
      setMessage("");

      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          // Axios sets this automatically, so this is optional
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form
      setNewPost({ title: "", content: "", file: null });
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input
      setMessage("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post">
      <h2>Create a Post</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newPost.title}
        onChange={handleInputChange}
        disabled={loading}
      />

      <textarea
        name="content"
        placeholder="Content"
        value={newPost.content}
        onChange={handleInputChange}
        disabled={loading}
      ></textarea>

      <input
        type="file"
        name="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={loading}
        accept="image/*,video/*,application/pdf" // optional: restrict file types
      />

      <button onClick={handlePostSubmit} disabled={loading}>
        {loading ? "Posting..." : "Post"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default CreatePost;
