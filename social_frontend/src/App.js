// App.js
// Import React and necessary components from react-router-dom for routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your page components
import Home from './Home';
import CreatePost from './CreatePost';

// Import the CSS styles for the app
import './App.css';

function App() {
  return (
    // Wrap the app in Router to enable routing functionality
    <Router>
      <div className="app">
        {/* Navigation bar with links to different routes */}
        <nav>
          <ul>
            <li>
              {/* Link to the homepage */}
              <Link to="/">Home</Link>
            </li>
            <li>
              {/* Link to the create post page */}
              <Link to="/create">Create Post</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes and which components to render for each path */}
        <Routes>
          {/* When URL path is /create, render CreatePost component */}
          <Route path="/create" element={<CreatePost />} />

          {/* When URL path is / (root), render Home component */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
