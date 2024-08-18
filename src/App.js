
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import AddCourse from './Components/AddCourse/AddCourse';
import AddInstance from './Components/AddInstance/AddInstance';
import CourseList from './Components/CourseList/CourseList';
import InstanceList from './Components/InstanceList/InstanceList';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/add-instance" element={<AddInstance />} />
        <Route path="/course-list" element={<CourseList />} />
        <Route path="/instance-list" element={<InstanceList />} />
      </Routes>
    </Router>
  );
}

export default App;
