import { useState } from 'react'
import { Route, Routes } from "react-router-dom";

import './App.css'
import Home from './Pages/Home';
import SignupPage from './components/SignUp/SignUp';
import Instagram from './components/Instagram/instagram';
import Forgot from './components/ForgetPassword/Forgot';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/SignUp" element={<SignupPage/>} />
      <Route path="/instagram" element={<Instagram/>} />
      <Route path="/Forgot" element={<Forgot/>} />
      
    </Routes>
    </>
  )
}

export default App
