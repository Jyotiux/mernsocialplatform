// models/Post.js

const mongoose = require('mongoose');

// Define the schema for a Post document in MongoDB
const postSchema = new mongoose.Schema({
    title: String, // Title of the post, stored as a simple string
    content: String, // Content/body of the post, also a string
    likes: { type: Number, default: 0 }, // Number of likes, defaults to 0 when a post is created
    comments: [{ text: String }], // Array of comments; each comment is an object with a 'text' field
});

// Create the Post model from the schema
// This model will be used to interact with the 'posts' c
