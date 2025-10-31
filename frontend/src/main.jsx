
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Issue from './pages/Issue'
import Verify from './pages/Verify'
import MyCertificates from './pages/MyCertificates'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <nav className="nav">
        <Link to='/'>Issue</Link>
        <Link to='/verify'>Verify</Link>
        <Link to='/my'>My Certificates</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Issue/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/my' element={<MyCertificates/>} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
