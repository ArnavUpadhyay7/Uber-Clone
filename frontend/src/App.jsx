import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import CaptainLogin from './pages/CaptainLogin'
import CaptaiSignUp from './pages/CaptainSignUp'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptaiSignUp />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App
