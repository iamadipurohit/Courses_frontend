import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="links-container">
        <Link className="link-item" to="/add-course">Add Course</Link>
        <Link className="link-item" to="/add-instance">Add Instance</Link>
        <Link className="link-item" to="/course-list">Course List</Link>
        <Link className="link-item" to="/instance-list">Instance List</Link>
      </div>
    </div>
  );
};

export default Home;
