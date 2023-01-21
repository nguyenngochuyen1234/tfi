
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Auth from './features/Auth';


function App() {
  const setting = JSON.parse(localStorage.getItem("config")) || {
    nightMode: false,
    assistantMode: false,
    soundMode: false,
    animationMode: false,
  };
  localStorage.setItem("config", JSON.stringify(setting));
  const theme=setting?.nightMode?"dark":"light";

  return (
    <Routes>
      <Route path="/" element={<Navigate to='/login' replace />} />
      <Route path="/home/*" element={<Home theme={theme} />} />
      <Route path="/login" element={<Auth authRoute={"login"} />} />
      <Route path="/register" element={<Auth authRoute={"register"} />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
