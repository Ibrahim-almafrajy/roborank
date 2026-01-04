import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark-secondary border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/assets/logo2.png" alt="RoboRank" className="w-10 h-10 rounded-lg object-contain" />
              <span className="text-xl font-bold text-light">RoboRank</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              The competitive infrastructure for robotics sport. Unified ratings, 
              tournament management, and accessible pathways for talent worldwide.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-light font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/tournaments" className="text-gray-400 hover:text-accent transition-colors">Tournaments</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-accent transition-colors">Leaderboard</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-accent transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-light font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors">Rating System</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent transition-colors">Organizer Guide</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col items-center text-center">
          <p className="text-gray-500 text-sm">
            © 2026 RoboRank. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Project by <span className="text-accent font-medium">Ibrahim Almafraji</span> & <span className="text-accent font-medium">Vibhav Govardhanagiri</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
