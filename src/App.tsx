import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import Login from "./pages/Login";
import Security from "./pages/Security";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/otp" element={<Otp/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/security" element={<Security/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
