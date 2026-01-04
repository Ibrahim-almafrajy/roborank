import React from 'react'
import { Trophy, TrendingUp, TrendingDown } from 'lucide-react'

const MatchCard = ({ match }) => {
  const isWin = match.result === 'win'

  return (
    <div className={`bg-dark-secondary border rounded-xl p-4 ${
      isWin ? 'border-green-500/30' : 'border-red-500/30'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">{match.tournament}</span>
        <span className="text-xs text-gray-500">{match.date}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
            isWin ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {isWin ? 'W' : 'L'}
          </div>
          <div>
            <p className="text-light font-medium">vs {match.opponent}</p>
            <p className="text-xs text-gray-500">Rating: {match.opponentRating}</p>
          </div>
        </div>

        <div className={`flex items-center space-x-1 px-3 py-1 rounded-lg ${
          isWin ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          {isWin ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`font-bold ${isWin ? 'text-green-400' : 'text-red-400'}`}>
            {isWin ? '+' : ''}{match.ratingChange}
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800">
        <span className="text-xs text-accent">{match.category}</span>
      </div>
    </div>
  )
}

export default MatchCard