// import React from 'react';
import Check from './Pages/Check';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import StudentAnalysis from "./components/StudentAnalysis";
// import Navbar from "./Navbar";
import LibraryAnalysis from "./components/LibraryAnalysis"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/'/>
        <Route element={<Check />} path='/check'/>
        <Route path="/studentanalysis" element={<StudentAnalysis/>}/>
        <Route path="/libraryanalysis" element={<LibraryAnalysis />}/>
        <Route path="/login" element={<Check />}/>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
