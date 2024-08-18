import React, { useState, useEffect } from 'react';
import './AddInstance.css'; // Import the CSS file for styling
import axios from 'axios';

const AddInstance = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddInstance = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/instances', {
        courseId: selectedCourseId,
        year,
        semester
      });
      alert('Instance added successfully');
    } catch (error) {
      console.error('Error adding instance:', error);
    }
  };

  return (
    <div className="add-instance-container">
      <h2>Add Instance</h2>
      <form onSubmit={handleAddInstance} className="add-instance-form">
        <div className="form-group">
          <label htmlFor="courseSelect">Select Course:</label>
          <select
            id="courseSelect"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <input
            type="text"
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">Add Instance</button>
          <button type="button" className="refresh-button" onClick={fetchCourses}>Refresh</button>
        </div>
      </form>
    </div>
  );
};

export default AddInstance;
