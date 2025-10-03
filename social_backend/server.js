// server.js
// Import required modules
const express = require('express');        // Web framework for Node.js
const mongoose = require('mongoose');      // MongoDB object modeling tool
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const cors = require('cors');               // Middleware to enable Cross-Origin Resource Sharing
const multer = require('multer');           // Middleware for handling multipart/form-data (file uploads)
const path = require('path');               // Utilities for working with file and directory paths
const fs = require('fs');                   // File system module for directory handling

const app = express();                      // Initialize Express app
const PORT = process.env.PORT || 5000;     // Set port, default to 5000

// Create 'uploads' directory if it doesn't exist to store uploaded files
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Enable CORS for cross-origin requests (e.g., frontend calling backend)
app.use(cors());

// Serve static files from the 'uploads' folder under '/uploads' route
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer storage settings for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to 'uploads' directory
    },
    filename: function (req, file, cb) {
        // Rename uploaded files to include field name + timestamp + original extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage }); // Initialize Multer with storage config

// Connect to MongoDB database named 'test' on localhost
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose schema for posts
const postSchema = new mongoose.Schema({
    title: String,             // Post title
    content: String,           // Post content
    file: String,              // Filename of uploaded file (if any)
    likes: { type: Number, default: 0 },  // Number of likes, default to 0
    comments: [{ text: String }],          // Array of comments with text field
});

// Create Post model from schema
const Post = mongoose.model('Post', postSchema);

// Use body-parser middleware to parse JSON bodies in requests
app.use(bodyParser.json());

// Route: GET /api/posts
// Description: Fetch all posts from database
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();  // Retrieve all posts
        res.json(posts);                   // Send posts as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle server error
    }
});

// Route: POST /api/posts
// Description: Create a new post, optionally with a file upload
app.post('/api/posts', upload.single('file'), async (req, res) => {
    try {
        const { title, content } = req.body;
        const file = req.file ? req.file.filename : undefined;  // Get uploaded file name if exists

        // Validate required fields
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required fields' });
        }

        // Create new Post document
        const post = new Post({ title, content, file });
        await post.save();   // Save to database

        res.status(201).json(post);  // Return created post with 201 status
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle server error
    }
});

// Route: POST /api/posts/like/:postId
// Description: Increment likes count for a specific post
app.post('/api/posts/like/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);  // Find post by ID

        if (!post) {
            return res.status(404).json({ error: 'Post not found' }); // If no post found
        }

        post.likes += 1;      // Increase likes by 1
        await post.save();    // Save updated post

        res.json(post);       // Return updated post
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle server error
    }
});

// Route: POST /api/posts/comment/:postId
// Description: Add a comment to a specific post
app.post('/api/posts/comment/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { text } = req.body;         // Comment text from request body
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' }); // If no post found
        }

        post.comments.push({ text });      // Add new comment
        await post.save();                 // Save updated post

        res.json(post);                   // Return updated post with new comment
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Handle server error
    }
});

// Start server and listen on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
