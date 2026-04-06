import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <h1 className="title">Student Management System</h1>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<StudentForm />} />
          <Route path="/edit/:id" element={<StudentForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
