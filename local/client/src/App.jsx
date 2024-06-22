import React from 'react';
import Check from './Pages/Check';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/'/>
        <Route element={<Check />} path='/check'/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;