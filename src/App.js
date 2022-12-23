
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./compoments/Home";
import Auth from './views/Auth';


function App() {
 
  return (
      <Routes>
          <Route path="/" element={<Navigate to='/login' replace/>} />
          <Route path="/home/*" element={<Home/>} />
          <Route path="/login" element={<Auth authRoute={"login"} />} />
          <Route path="/register" element={<Auth authRoute={"register"}/>} />
      </Routes>
  );
}

export default App;
