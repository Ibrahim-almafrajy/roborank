import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const LeaderboardRow = ({ user, rank, activeCategory = 'overall' }) => {
  // Get rating based on active category
  const getRating = () => {
    if (user.ratings && user.ratings[activeCategory]) {
      return user.ratings[activeCategory]
    }
    return user.rating || 0
  }

  const getDivisionBadge = (division) => {
    const badges = {
      'Masters': { bg: 'bg-purple-500/20', text: 'text-purple-400', icon: 'fa-crown' },
      'Gold': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: 'fa-medal' },
      'Silver': { bg: 'bg-gray-400/20', text: 'text-gray-300', icon: 'fa-medal' },
      'Bronze': { bg: 'bg-orange-500/20', text: 'text-orange-400', icon: 'fa-medal' },
    }
    return badges[division] || badges['Bronze']
  }

  const badge = getDivisionBadge(user.division)
  const isTopThree = rank <= 3

  const getFlagEmoji = (countryCode) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt())
    return String.fromCodePoint(...codePoints)
  }

  return (
    <div className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-light/5 transition-colors ${
      isTopThree ? 'bg-accent/5' : ''
    }`}>
      {/* Rank */}
      <div className="col-span-1">
        <span className={`font-bold ${
          rank === 1 ? 'text-yellow-400 text-xl' : 
          rank === 2 ? 'text-gray-300 text-lg' :
          rank === 3 ? 'text-orange-400 text-lg' :
          'text-gray-500'
        }`}>
          #{rank}
        </span>
      </div>

      {/* Player */}
      <div className="col-span-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-dark-secondary rounded-full flex items-center justify-center text-accent font-bold text-sm border border-gray-700">
            {user.avatar}
          </div>
          <div>
            <p className="text-light font-medium">{user.name}</p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span className="text-base">{getFlagEmoji(user.countryCode)}</span>
              <span>{user.country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="col-span-2">
        <span className="text-xl font-bold text-light">{getRating()}</span>
      </div>

      {/* Division */}
      <div className="col-span-2">
        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
          <i className={`fa-solid ${badge.icon}`}></i>
          <span>{user.division}</span>
        </span>
      </div>

      {/* Podiums */}
      <div className="col-span-2">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/20" title="Gold">
            <i className="fa-solid fa-trophy text-yellow-400 text-xs"></i>
            <span className="text-yellow-400 font-bold text-sm">{user.podiums?.gold || 0}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-gray-500/20" title="Silver">
            <i className="fa-solid fa-trophy text-gray-300 text-xs"></i>
            <span className="text-gray-300 font-bold text-sm">{user.podiums?.silver || 0}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-orange-500/20" title="Bronze">
            <i className="fa-solid fa-trophy text-orange-400 text-xs"></i>
            <span className="text-orange-400 font-bold text-sm">{user.podiums?.bronze || 0}</span>
          </div>
        </div>
      </div>

      {/* Trend */}
      <div className="col-span-1">
        <div className={`flex items-center space-x-1 ${
          parseInt(user.trend) > 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {parseInt(user.trend) > 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">{user.trend}</span>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardRow