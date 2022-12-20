
import './App.css';
import { Routes, Route } from "react-router-dom";
import Landing from './compoment/Landing';
import Auth from './views/Auth';
function App() {
  return (
    <Routes>
        <Route index element={<Landing />} />
        <Route path="login" element={<Auth authRoute={"login"} />} />
        <Route path="register" element={<Auth authRoute={"register"}/>} />
    </Routes>
  );
}

export default App;
