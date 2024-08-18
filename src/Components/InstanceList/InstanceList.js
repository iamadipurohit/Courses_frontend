import React, { useState, useEffect } from 'react';
// Importing the CSS file for styling
import './InstanceList.css';
const ListInstances = () => {
  const [courses, setCourses] = useState([]);
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (year && semester) {
      fetchCourses();
    }
  }, [year, semester]);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const url = `http://localhost:8080/api/instances/${year}/${semester}`;
      const response = await fetch(url);
      const coursesData = await response.json();

      setCourses(coursesData);
    } catch (error) {
      setError('Error fetching courses.');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (courseId) => {
    setLoading(true);
    setError('');
    try {
      const url = `http://localhost:8080/api/courses/${courseId}`;
      const response = await fetch(url);
      const data = await response.json();
      setSelectedCourse(data);
    } catch (error) {
      setError('Error fetching course details.');
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    setLoading(true);
    setError('');
    try {
      await fetch(`http://localhost:8080/api/instances/${year}/${semester}/${courseId}`, {
        method: 'DELETE',
      });
      // Remove the deleted course from the list
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      setError('Error deleting course instance.');
      console.error('Error deleting course instance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchCourses = () => {
    if (!year || !semester) {
      setError('Year and Semester are required.');
    } else {
      fetchCourses();
    }
  };

  return (
    <div className="list-instances-container">
      <h2>List Courses</h2>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />
        <button onClick={handleFetchCourses}>Fetch Courses</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Year-Sem</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{`${year}-${semester}`}</td>
              <td>{course.courseCode}</td>
              <td>
                <button onClick={() => handleViewDetails(course.id)}>🔍</button>
                <button onClick={() => handleDelete(course.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCourse && (
        <div className="course-detail">
          <h3>Course Detail</h3>
          <p><strong>Course Title:</strong> {selectedCourse.title}</p>
          <p><strong>Course Code:</strong> {selectedCourse.courseCode}</p>
          <p><strong>Description:</strong> {selectedCourse.description}</p>
        </div>
      )}
    </div>
  );
};

export default ListInstances;
