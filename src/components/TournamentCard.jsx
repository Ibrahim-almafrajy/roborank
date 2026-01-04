import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users, Trophy, Globe, Wifi } from 'lucide-react'

const TournamentCard = ({ tournament }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'live': 
        return (
          <span className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full live-pulse"></span>
            <span>LIVE</span>
          </span>
        )
      case 'registration':
        return <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">Open</span>
      case 'full':
        return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium">Full</span>
      case 'invite':
        return <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">Invite Only</span>
      default: 
        return null
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Combat Robots':  return 'text-red-400'
      case 'Autonomous Navigation': return 'text-blue-400'
      case 'Drone Racing': return 'text-green-400'
      case 'Multi-discipline': return 'text-purple-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <Link to={`/tournament/${tournament.id}`}>
      <div className="bg-dark-secondary border border-gray-800 rounded-xl p-5 card-hover cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            {tournament.type === 'online' ?  (
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-accent" />
              </div>
            ) : (
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-orange-400" />
              </div>
            )}
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
              {tournament.type}
            </span>
          </div>
          {getStatusBadge(tournament. status)}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-light mb-2 group-hover:text-accent transition-colors">
          {tournament.name}
        </h3>

        {/* Category */}
        <p className={`text-sm font-medium mb-4 ${getCategoryColor(tournament. category)}`}>
          {tournament.category}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            {tournament.date}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {tournament.location}
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            {tournament.participants}/{tournament.maxParticipants} registered
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
          ></div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center space-x-1">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-light">{tournament.prizePool}</span>
          </div>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
            {tournament.skillLevel}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default TournamentCard