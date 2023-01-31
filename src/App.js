
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
  const check=Boolean(useSelector(state=>state.user.current?.account));
  return (
    
    <Routes>
      <Route path="/" element={check?<Navigate to='/home'  replace/> :<Navigate to='/login' replace />} />
      {check && <Route path="/home/*" element={<Home theme={theme} />} />}
      {!check &&<Route path="/login" element={<Auth authRoute={"login"} />} />}
      {!check &&<Route path="/register" element={<Auth authRoute={"register"} />} />}
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
