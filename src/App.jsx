import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import TournamentDiscovery from './pages/TournamentDiscovery'
import TournamentDetail from './pages/TournamentDetail'
import Leaderboard from './pages/Leaderboard'
import Teams from './pages/Teams'
import RatingCalculator from './pages/RatingCalculator'
import { Monitor } from 'lucide-react'

// Mobile detection component
const MobileNotSupported = () => (
  <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-8 text-center">
    <Monitor className="w-20 h-20 text-primary mb-6" />
    <h1 className="text-2xl font-bold text-light mb-4">Desktop Only</h1>
    <p className="text-light/60 max-w-md">
      This site is optimized for desktop viewing. Please access RoboRank from a laptop or desktop computer for the best experience.
    </p>
  </div>
)

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return <MobileNotSupported />
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark text-light flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tournaments" element={<TournamentDiscovery />} />
            <Route path="/tournament/:id" element={<TournamentDetail />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/calculator" element={<RatingCalculator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App