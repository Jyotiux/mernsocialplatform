
# MERN Social Media Platform

A full-stack social media web application built using the MERN stack — MongoDB, Express.js, React, and Node.js. This project allows users to create posts, like posts, and comment on posts, with support for multimedia uploads.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Technologies Used](#technologies-used)  
- [Features](#features)  
- [Backend Setup](#backend-setup)  
- [Frontend Setup](#frontend-setup)  
- [Usage](#usage)  
- [Folder Structure](#folder-structure)  

---
<img width="1913" height="966" alt="image" src="https://github.com/user-attachments/assets/6a10d159-2ecc-4068-8fbf-ca67592fa98d" />

<img width="1912" height="950" alt="image" src="https://github.com/user-attachments/assets/1a49d1fb-5bfc-45d5-879b-4b2a6bbec368" />



## Project Overview

This social media platform showcases CRUD operations using Express.js for API routes and React for frontend UI. File uploads are handled with Multer, and Axios connects the frontend to backend endpoints. The project supports adding posts with titles, content, and optional media files, as well as liking and commenting on posts.

---

## Technologies Used

- **MongoDB** — Database  
- **Express.js** — Backend API framework  
- **React.js** — Frontend UI  
- **Node.js** — Runtime environment  
- **Multer** — File upload handling  
- **Axios** — HTTP client for frontend-backend communication  
- **CORS** — Cross-origin resource sharing  
- **UUID** — Unique file naming  

---

## Features

- Create posts with title, content, and optional file upload  
- View all posts with likes and comments  
- Like posts  
- Add comments to posts  
- Serve uploaded media files  

---

## Backend Setup

1. Create and navigate to backend directory:

   ```bash
   mkdir social_backend
   cd social_backend


2. Initialize Node project and install dependencies:

   ```bash
   npm init -y
   npm install express mongoose cors body-parser multer uuid
   ```

3. Create `server.js` and add the backend code to:

   * Setup Express server
   * Connect to MongoDB
   * Define Post schema and model
   * Handle API routes for posts, likes, and comments
   * Manage file uploads with Multer

4. Replace `'Your MongoDB connection string'` with your actual connection string.

5. Run the backend server:

   ```bash
   node server.js
   ```

---

## Frontend Setup

1. Create React app and navigate to it:

   ```bash
   npx create-react-app social_frontend
   cd social_frontend
   ```

2. Install required packages:

   ```bash
   npm install axios react-router-dom
   ```

3. Create necessary components like `CreatePost.js` with form and Axios calls to backend.

4. Run the frontend application:

   ```bash
   npm start
   ```

---

## Usage

* Open frontend in browser (usually at `http://localhost:3000`)
* Create new posts with optional media uploads
* View existing posts
* Like and comment on posts dynamically

---

## Folder Structure

```
SocialMediaPlatform/
├── social_backend/
│   ├── uploads/
│   ├── models/
│   │   └── Post.js
│   ├── server.js
│   ├── package.json
│   └── ...
└── social_frontend/
    ├── src/
    │   ├── components/
    │   │   └── CreatePost.js
    │   ├── App.js
    │   └── ...
    ├── package.json
    └── ...
```


