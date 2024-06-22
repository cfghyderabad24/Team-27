import React from 'react';
import Check from './Pages/Check';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentAnalysis from "./components/StudentAnalysis";
// import Navbar from "./Navbar";
import LibraryAnalysis from "./components/LibraryAnalysis"
// import Home from "./Home"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/'/>
        <Route element={<Check />} path='/check'/>
      <Route path="/studentanalysis" element={<StudentAnalysis/>}/>
      <Route path="/libraryanalysis" element={<LibraryAnalysis />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
