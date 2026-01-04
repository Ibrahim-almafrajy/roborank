import React from 'react'

const BracketView = ({ bracketData }) => {
  const { rounds } = bracketData

  const getPlayerStyle = (match, playerKey) => {
    const isWinner = match.winner === playerKey
    return isWinner 
      ? 'bg-accent/20 border-accent text-light' 
      : 'bg-dark border-gray-700 text-gray-400'
  }

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex space-x-8 min-w-max p-4">
        {rounds. map((round, roundIndex) => (
          <div key={roundIndex} className="flex flex-col">
            {/* Round Header */}
            <div className="text-center mb-6">
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
                {round.name}
              </h3>
              <div className="w-16 h-0.5 bg-accent/30 mx-auto mt-2"></div>
            </div>

            {/* Matches */}
            <div 
              className="flex flex-col justify-around flex-1 space-y-4"
              style={{ 
                paddingTop: `${Math.pow(2, roundIndex) * 20}px`,
                gap: `${Math.pow(2, roundIndex) * 40}px`
              }}
            >
              {round.matches. map((match, matchIndex) => (
                <div key={match.id} className="relative">
                  {/* Match Card */}
                  <div className="w-64 bg-dark-secondary rounded-lg border border-gray-800 overflow-hidden shadow-lg">
                    {/* Player 1 */}
                    <div className={`flex items-center justify-between p-3 border-b border-gray-800 ${getPlayerStyle(match, 'player1')}`}>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-dark rounded-full flex items-center justify-center text-xs font-bold text-accent border border-gray-700">
                          {match.player1.name. split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-[120px]">
                            {match.player1.name}
                          </p>
                          <p className="text-xs text-gray-500">{match.player1.rating}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        match.winner === 'player1' ? 'text-accent' : 'text-gray-500'
                      }`}>
                        {match.player1.score}
                      </div>
                    </div>

                    {/* VS Divider */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 bg-dark-secondary border border-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-500">VS</span>
                      </div>
                    </div>

                    {/* Player 2 */}
                    <div className={`flex items-center justify-between p-3 ${getPlayerStyle(match, 'player2')}`}>
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-dark rounded-full flex items-center justify-center text-xs font-bold text-accent border border-gray-700">
                          {match. player2.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium truncate max-w-[120px]">
                            {match.player2.name}
                          </p>
                          <p className="text-xs text-gray-500">{match.player2.rating}</p>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        match.winner === 'player2' ? 'text-accent' : 'text-gray-500'
                      }`}>
                        {match.player2.score}
                      </div>
                    </div>
                  </div>

                  {/* Connector Lines */}
                  {roundIndex < rounds.length - 1 && (
                    <div className="absolute top-1/2 -right-8 w-8 h-0.5 bg-gray-700"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Champion Display */}
        <div className="flex flex-col justify-center">
          <div className="text-center mb-6">
            <h3 className="text-sm font-semibold text-yellow-400 uppercase tracking-wider">
              Champion
            </h3>
            <div className="w-16 h-0.5 bg-yellow-400/30 mx-auto mt-2"></div>
          </div>
          
          <div className="w-64 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl border-2 border-yellow-500/50 p-6 text-center glow-accent">
            <div className="text-4xl mb-3"><i className="fa-solid fa-trophy text-yellow-400"></i></div>
            <div className="w-16 h-16 bg-dark rounded-full flex items-center justify-center text-lg font-bold text-accent border-2 border-yellow-500 mx-auto mb-3">
              {rounds[rounds.length - 1]?.matches[0]?.winner === 'player1' 
                ? rounds[rounds.length - 1]. matches[0].player1.name. split(' ').map(n => n[0]).join('')
                : rounds[rounds.length - 1]?.matches[0]?. player2.name.split(' ').map(n => n[0]).join('')
              }
            </div>
            <p className="text-lg font-bold text-light">
              {rounds[rounds.length - 1]?.matches[0]?.winner === 'player1'
                ? rounds[rounds.length - 1].matches[0]. player1.name
                : rounds[rounds.length - 1]?.matches[0]?.player2.name
              }
            </p>
            <p className="text-sm text-yellow-400 mt-1">
              Rating: {rounds[rounds.length - 1]?.matches[0]?.winner === 'player1'
                ? rounds[rounds.length - 1].matches[0]. player1.rating
                : rounds[rounds.length - 1]?.matches[0]?.player2.rating
              }
            </p>
            <div className="mt-4 pt-4 border-t border-yellow-500/30">
              <p className="text-xs text-gray-400">Prize:  $5,000</p>
              <p className="text-xs text-green-400">+45 Rating Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BracketView