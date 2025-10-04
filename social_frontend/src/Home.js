// Home.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  // State to store all posts fetched from backend
  const [posts, setPosts] = useState([]);

  // Shared comment input across all posts (note: could be improved with per-post state)
  const [commentInput, setCommentInput] = useState("");

  // Fetch all posts on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  // Handle like button click
  const handleLike = (postId) => {
    axios
      .post(`http://localhost:5000/api/posts/like/${postId}`)
      .then((response) => {
        // Update only the liked post in the posts array
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error liking post:", error));
  };

  // Handle adding a comment
  const handleAddComment = (postId, commentText) => {
    axios
      .post(`http://localhost:5000/api/posts/comment/${postId}`, {
        text: commentText,
      })
      .then((response) => {
        // Update the post that received a new comment
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  return (
    <div className="home">
      <h2>Recent Posts</h2>

      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* If post has a file, display it based on type */}
          {post.file && (
            <div>
              {post.file.includes(".mp4") ? (
                // Video preview
                <video width="320" height="240" controls>
                  <source
                    src={`http://localhost:5000/uploads/${post.file}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                // Image preview
                <img
                  src={`http://localhost:5000/uploads/${post.file}`}
                  alt="Post Media"
                />
              )}
            </div>
          )}

          {/* Like section */}
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post._id)}>Like</button>

          {/* Comments section */}
          <p>Comments: {post.comments.length}</p>
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>

          {/* Comment input and submit */}
          <input
            type="text"
            placeholder="Add a comment"
            className="comment-input"
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            onClick={() => handleAddComment(post._id, commentInput)}
            className="comment-button"
          >
            Add Comment
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
