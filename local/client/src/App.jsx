import React, {useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentAnalysis from "./components/StudentAnalysis";
// import Navbar from "./Navbar";
// import LibraryAnalysis from "./components/LibraryAnalysis"
// import Home from "./Home"
function App() {

  return (
    <Router>
    <Routes>
        <Route path="/" element={<StudentAnalysis/>}/>
        {/* <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage />}/> */}
        <Route path="/studentanalysis" element={<StudentAnalysis/>}/>
        {/* <Route path="/libraryanalysis" element={<LibraryAnalysis />}/> */}
          </Routes>
</Router>
  );
}

export default App;
