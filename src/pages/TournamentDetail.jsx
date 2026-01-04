import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Calendar, MapPin, Users, Trophy, Globe, Clock, 
  ChevronLeft, Share2, Star, Award, ExternalLink 
} from 'lucide-react'
import BracketView from '../components/BracketView'
import tournamentsData from '../data/tournaments.json'
import matchesData from '../data/matches.json'
import usersData from '../data/users.json'

const TournamentDetail = () => {
  const { id } = useParams()
  const tournament = tournamentsData.find(t => t.id === parseInt(id)) || tournamentsData[0]
  const bracketData = matchesData.bracketData
  const participants = usersData.slice(0, 16)

  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt())
    return String.fromCodePoint(...codePoints)
  }

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/tournaments" 
          className="inline-flex items-center text-gray-400 hover:text-light mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Tournaments
        </Link>

        {/* Tournament Header */}
        <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  tournament. type === 'online' 
                    ? 'bg-accent/20 text-accent' 
                    : 'bg-orange-500/20 text-orange-400'
                }`}>
                  {tournament.type === 'online' ? (
                    <span className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>Online</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Physical</span>
                    </span>
                  )}
                </span>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                  {tournament.category}
                </span>
                {tournament.status === 'live' && (
                  <span className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>LIVE</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-light mb-4">{tournament.name}</h1>
              
              <p className="text-gray-400 mb-6 max-w-2xl">{tournament.description}</p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center text-gray-400">
                  <Calendar className="w-5 h-5 mr-2 text-accent" />
                  <span>{tournament.date} - {tournament.endDate}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="w-5 h-5 mr-2 text-accent" />
                  <span>{tournament.location}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Users className="w-5 h-5 mr-2 text-accent" />
                  <span>{tournament.participants}/{tournament.maxParticipants} Registered</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end space-y-4">
              <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-6 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-yellow-400">{tournament.prizePool}</p>
                <p className="text-sm text-gray-400">Prize Pool</p>
              </div>

              <div className="flex space-x-3">
                <button className="flex items-center space-x-2 bg-accent hover:bg-accent/90 text-dark font-bold px-6 py-3 rounded-xl transition-colors">
                  <span>Register Now</span>
                </button>
                <button className="p-3 bg-dark border border-gray-700 rounded-xl hover:border-accent transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-1 bg-dark-secondary rounded-xl p-1 mb-8 overflow-x-auto">
          {['Bracket', 'Participants', 'Rules', 'Schedule']. map((tab, index) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                index === 0
                  ? 'bg-accent text-dark'
                  : 'text-gray-400 hover:text-light'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bracket Section */}
        <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-light">Tournament Bracket</h2>
            <span className="text-sm text-gray-400">16-Player Single Elimination</span>
          </div>
          
          <BracketView bracketData={bracketData} />
        </div>

        {/* Participants Section */}
        <div className="bg-dark-secondary border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-light">Participants</h2>
            <span className="text-sm text-gray-400">{participants.length} competitors from 12 countries</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {participants.map((user, index) => (
              <div 
                key={user.id}
                className="bg-dark border border-gray-800 rounded-xl p-4 flex items-center space-x-3 hover:border-accent/50 transition-colors"
              >
                <div className="w-10 h-10 bg-dark-secondary rounded-full flex items-center justify-center text-accent font-bold text-sm border border-gray-700">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-light font-medium truncate">{user.name}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span>{getFlagEmoji(user.countryCode)}</span>
                    <span className={`font-medium ${
                      user. division === 'Masters' ?  'text-purple-400' : 
                      user.division === 'Gold' ? 'text-yellow-400' :
                      user.division === 'Silver' ?  'text-gray-300' :
                      'text-orange-400'
                    }`}>
                      {user.rating}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 text-sm">#{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentDetail