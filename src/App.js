
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Auth from './features/Auth';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="/login" element={<Auth authRoute={"login"} />} />
      <Route path="/register" element={<Auth authRoute={"register"} />} />
      <Route path="/404" element={<NotFound/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
