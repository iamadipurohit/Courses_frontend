import React, { useState } from 'react';
import './AddCourse.css'; // Import the CSS file for styling

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: courseTitle,
          courseCode: courseCode,
          description: courseDescription,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add course');
      }
      
      const data = await response.json();
      
      // Handle successful response
      setSuccess('Course added successfully!');
      setError(null); // Clear previous errors if any
      console.log('Course Added:', data);
    } catch (error) {
      // Handle error response
      setError('Failed to add course. Please try again.');
      setSuccess(null); // Clear previous success messages if any
      console.error('Error adding course:', error);
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <div className="form-group">
          <label htmlFor="courseTitle">Course Title:</label>
          <input
            type="text"
            id="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDescription">Course Description:</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Add Course</button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddCourse;
