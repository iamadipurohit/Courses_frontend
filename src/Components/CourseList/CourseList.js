import React, { useState, useEffect } from 'react';

import './CourseList.css';
const ListCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleDelete = async (courseId) => {
    try {
      await fetch(`http://localhost:8080/api/courses/${courseId}`, {
        method: 'DELETE',
      });
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="list-courses-container">
      <h2>List Courses</h2>
      
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>{course.courseCode}</td>
              <td>
                <button onClick={() => handleViewDetails(course)}>🔍</button>
                <button onClick={() => handleDelete(course.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCourse && (
        <div className="course-detail">
          <h3>Course Detail</h3>
          <p><strong>Title:</strong> {selectedCourse.title}</p>
          <p><strong>Code:</strong> {selectedCourse.courseCode}</p>
          <p><strong>Description:</strong> {selectedCourse.description}</p>
        </div>
      )}
    </div>
  );
};

export default ListCourses;
