import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptaiSignUp from './pages/CaptaiSignUp'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptaiSignUp />} />
      </Routes>
    </div>
  )
}

export default App
