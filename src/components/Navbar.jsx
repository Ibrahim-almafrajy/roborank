import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Trophy, User, Globe } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/tournaments', label: 'Tournaments' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/teams', label: 'Teams' },
    { path: '/calculator', label: 'Rating Calculator' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-dark-secondary border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/assets/logo2.png" alt="RoboRank" className="w-10 h-10 rounded-lg object-contain -mt-1" />
            <span className="text-xl font-bold text-light">RoboRank</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-accent font-semibold'
                    : 'text-gray-400 hover:text-light'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-dark px-4 py-2 rounded-lg border border-gray-700">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-sm">
                IA
              </div>
              <div>
                <p className="text-sm font-medium text-light">Ibrahim A.</p>
                <p className="text-xs text-accent">2347 • Masters</p>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-light"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-dark-secondary border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 px-4 rounded-lg transition-colors ${
                  isActive(link. path)
                    ? 'bg-accent/20 text-accent'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-2 px-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-sm">
                  AC
                </div>
                <div>
                  <p className="text-sm font-medium text-light">Alex Chen</p>
                  <p className="text-xs text-accent">1847 • Gold</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar